import { Configuration, OpenAIApi } from "openai"
import { NextResponse } from 'next/server';

const textModel ='gpt-3.5-turbo';
var openai;

const parseStoryToPages = (story) => {
    const pages = story.split('|').filter(page => page.trim().length > 0); // split by '|' and filter out any empty strings
    const parsedPages = pages.map((page, index) => {
        return { "page": index + 1, "content": page.trim() };
    });
    return parsedPages;
};
const conexion = (apiKey) =>{
   
    openai =  new OpenAIApi(new Configuration ({
        organization: "org-k0ei4gcG3YuH3f43NRw5Y8Ct",
        apiKey : apiKey,
    }));
}
const storyTram = async (CharacterName, CharacterRace, StorySetting, StoryDescription) => {
   
   var prompt = `cree moi une trame narative en te basant sur les info suivante :
   CharacterName: ${CharacterName}
   CharacterRace: ${CharacterRace}
   StorySetting: ${StorySetting}
   StoryDescription: ${StoryDescription}
   `;
   /*
    console.log(`---------------------CREATE TRAM---------------------\n`);
    console.log(prompt);
    console.log(`start...`);
*/
    try{
        var openaiRes = await openai.createChatCompletion({
            model: textModel,
            messages : [
                {
                    role: "user", 
                    content: prompt
                }
            ]
        });
        //console.log('end request');
        return openaiRes;
    }catch (error){
        console.log(`Error: ${error}`); // this will print the error details to the console
        return new NextResponse({message: `ERROR :${error.message}`}, { status: 500 });
    }

}

const storyBuild = async (CharacterName, CharacterRace, StorySetting, StoryHelp) => {

    var prompt =`Tu es un auteur de roman. Tu t'appraite a écrire une histoire.
    Ecrit 3 pages en te basant sur la tram narative suivante et separe chaque pages par "|": 
    "${StoryHelp}"`;
    /*
    console.log(`---------------------CREATE STORY---------------------\n`);
    console.log(prompt);
    console.log(`start...`);
*/
    try{
        var openaiRes = await openai.createChatCompletion({
            model: textModel,
            messages : [
                {
                    role: "user", 
                    content: prompt
                }
            ]
        })
        //console.log('end request');
        return openaiRes;
    }catch (error){
        console.log(`Error: ${error}`); // this will print the error details to the console
        return new NextResponse({message: `ERROR :${error.message}`}, { status: 500 });
    }

}

export const POST = async (req) => {

    const {apiKey, CharacterName, CharacterRace, StorySetting, StoryGenre, StoryTon, StoryDescription} = await req.json();
/*
    console.log(`---------VAR------------\n`);
    console.log(`apiKey ${apiKey}`);
    console.log(`CharacterName ${CharacterName}`);
    console.log(`CharacterRace ${CharacterRace}`);
    console.log(`StorySetting ${StorySetting}`);
    // console.log(`StoryGenre ${StoryGenre}`);
    // console.log(`StoryTon ${StoryTon}`);
    console.log(`StoryDescription ${StoryDescription}`);
    console.log(`modelUse ${textModel}`);

    console.log(`Connected !`);
*/
conexion(apiKey);

    try{
        //console.log('--------------FIRST REQUEST------------------\n');

        var openaiRes = await storyTram (CharacterName, CharacterRace, StorySetting, StoryDescription);
/*
        console.log(`--------------RESPONSE------------------\n`);     
        console.log(openaiRes.data.choices[0].message.content);
        console.log(`----------------------------------------\n`);
        console.log('--------------SECONDE REQUEST------------------\n');
*/
        var StoryHelp = openaiRes.data.choices[0].message.content;
      
        openaiRes = await storyBuild(CharacterName,CharacterRace,StorySetting,StoryHelp)

/*
        console.log(`--------------RESPONSE------------------\n`);
        console.log(openaiRes.data.choices[0].message.content);
        console.log(`----------------------------------------\n`);
*/
        var test = parseStoryToPages(openaiRes.data.choices[0].message.content);
    
       // console.log('--------------RETURN------------------\n');
        console.log(test);
        //openaiRes
        return new NextResponse( JSON.stringify(test) , { status: 201 });
 
    }catch(error){
        return new NextResponse({message: `ERROR :${error}`}, { status: 500 });
    }
}


    
