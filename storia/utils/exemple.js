import { Configuration, OpenAIApi } from "openai"
import axios from 'axios'
import  fs from'fs'
import  path from'path'
import readline from 'readline';

import dotenv from 'dotenv';
dotenv.config();
var modelUse ='gpt-3.5-turbo'

var typeLivre = 'romain medieval fantastique'
var ton = 'enquete '
var lieux = 'Dans le hameau de Rico'
var personnage = 'Karl'
var personnageType ='un humain '
var objectif = 'qui essaye de comprendre  quelle est la malédiction qui c\'est abbatut sur le village et comment la dissiper'
var page = 0;

let page1 ;
let story;
let parts;
let text ;
let option1;
let option2 ;
/*
var typeLivre; 
var ton;
var lieux; 
var personnage;
var personnageType;
var objectif;
*/
const configuration = new Configuration ({
    organization: "org-k0ei4gcG3YuH3f43NRw5Y8Ct",
    apiKey : "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",
})

const openai = new OpenAIApi(configuration);


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  
  
async function firstPage(){

    return await openai.createChatCompletion({
        model: modelUse,
        messages : [
            {role: "user", content:`Tu es un auteur de ${typeLivre}. Tu t'appraite a écrire une histoire a choix multiple .
            Lhistoire ce déroule ${lieux}. Le personnage principal est ${personnageType} nommé ${personnage}  ${objectif}. 
            Le ton de l'histoire doit être ${ton} . 
            Commence l'histoire en introduisant le lieux et les personnages. À la fin de cette première page, 
            propose deux options différentes pour la prochaine page de l'histoire`}
        ]
    })
}
async function helpUser(){

}

async function nextPage(page, text, option1, option2){
    return await openai.createChatCompletion({
        model: modelUse,
        messages : [
            {role: "user", content:`Tu es un auteur de de roman de science fiction. Tu t'appraite a écrire une histoire.
            Lhistoire ce déroule a lisbonne. Les personnages principaux sont un groupe daminommé ${personnage}  ${objectif}. 
            Le ton de l'histoire doit être ${ton} . 
            Commence l'histoire en introduisant le lieux et les personnages. À la fin de cette première page, 
            propose deux options différentes pour la prochaine page de l'histoire`},
            {role:"assistant", content: `${text}\n ${option1}\n${option2}`
            },
            {role:"user",content: `je choisi l'option ${page}`}
            
        ]
    })
}
async function imagePrompt(story){

    return await openai.createChatCompletion({
        model: modelUse,
        messages : [
            {role: "user", content:`en utilisant le texte suivant , ecrit un prompt de 10 a 15 mot qui liste les point important de l'histoire pour généré une image :
            "${story}" .`  }
        ]
    })
}
async function downloadImage(url, filename) {
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
    });

    // Replace './' with your desired directory.
    const writer = fs.createWriteStream(path.resolve('./', filename));

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

async function generateImage(prompt) {
    const response = await axios({
        method: 'post',
        url: 'https://api.openai.com/v1/images/generations',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
        },
        data: {
            "prompt": prompt,
            "n": 1,
            "size":"1024x1024"
        },
    });

    // Save the image to a file
    //console.log(response.data.data[0].url)

    downloadImage(response.data.data[0].url,'test.png')

}







/*
console.log('--------------/PRIX\\---------------------');
console.log('prompt token ->',page1.data.usage.prompt_tokens);
console.log('completion token ->',page1.data.usage.completion_tokens);
console.log('total token ->',page1.data.usage.total_tokens);

console.log(page1.data.choices[0].message);


*/


async function main() {
    /*
    typeLivre = await question("Quel est le type de livre? ");
    ton = await question("Quel est le ton de l'histoire? ");
    lieux = await question("Où se déroule l'histoire? ");
    personnage = await question("Quel est le nom du personnage principal? ");
    personnageType = await question("Quel est le type du personnage principal? ");
    objectif = await question("Quel est l'objectif du personnage principal? ");
  */
    console.log('----------histoire\n ')
    page1 = await firstPage()
    story = page1.data.choices[0].message.content
    parts = story.split("\nOption ");
    text = parts[0];
    option1 = "Option " + parts[1];
    option2 = "Option " + parts[2];
    console.log('text: ', text);
    console.log('option1: ', option1);
    console.log('option2: ', option2);
    
    console.log('----------image\n ')
    
    let img = await imagePrompt(text)

   
    generateImage(img.data.choices[0].message.content)
    /*
    do{
        page = await question("Quel option choisit tu? ");
        page1 = await nextPage(page, text, option1, option2)
        story = page1.data.choices[0].message.content
        parts = story.split("\nOption ");
        text = parts[0];
        option1 = "Option " + parts[1];
        option2 = "Option " + parts[2];
        console.log('text: ', text);
        console.log('option1: ', option1);
        console.log('option2: ', option2);
    }while(page != 0)
    */
    rl.close();
    
  }
  
  function question(query) {
    return new Promise((resolve) => {
      rl.question(query, (answer) => {
        resolve(answer);
      })
    })
  }

  main();

