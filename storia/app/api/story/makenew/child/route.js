import { Configuration, OpenAIApi } from "openai"
import { NextResponse } from 'next/server';

const textModel ='gpt-3.5-turbo';
var openai;

const parseStoryToPages = (story) => {
    const pages = story.split('|').filter(page => page.trim().length > 0); // split by '|' and filter out any empty strings
    const parsedPages = pages.map((page, index) => {
        return {"content": page.trim() };
    });
    return JSON.stringify(parsedPages);
};


const conexion = (apiKey) =>{
    openai =  new OpenAIApi(new Configuration ({
        organization: "org-k0ei4gcG3YuH3f43NRw5Y8Ct",
        apiKey : apiKey,
    }));
}
const storyTram = async (CharacterName, CharacterRace, StorySetting) => {
    
   var prompt = `Tu es un auteur de conte pour enfant de renom du 21 ieme siecle, tu as déja redigé de très beaux contes marquant les esprits.
   Tu es reconnu pour les lecons de vie présente dans tes histoire. Les enfants adore tes histoires.
   Tu vas rediger un conte de 1000 mots avec le contexte suivant : l'histoire mettras en scene les aventures de ${CharacterName}, ${CharacterRace}.
   ${StorySetting}. Utilise un langage adapté aux enfants de 6 à 10 ans, à diviser l'histoire en chapitres et à éviter les répétitions.
   Tu peux utiliser des synonymes ou des descriptions indirectes pour présenter tes personnages tout au long de l'histoire, intégre ces traits de caractère dans l'histoire de façon subtile.
   L'objectif est de rendre l'histoire détaillée et immersive, tout en permettant aux jeunes lecteurs de découvrir les traits de caractère des personnages au fil de leur lecture. `;
   
    console.log(prompt);
    console.log(`start...`);

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
        return openaiRes;
    }catch (error){
        console.log(`Error: ${error}`); // this will print the error details to the console
        return new NextResponse({message: `ERROR :${error.message}`}, { status: 500 });
    }

}
/*
const storyBuild = async (CharacterName, CharacterRace, StorySetting, StoryHelp) => {

    var prompt =`Tu es un auteur de roman. Tu t'appraite a écrire une histoire.
    Ecrit 3 pages en te basant sur la tram narative suivante et separe chaque pages par "|": 
    "${StoryHelp}"`;
    
    console.log(`---------------------CREATE STORY---------------------\n`);
    console.log(prompt);
    console.log(`start...`);

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

}*/

export const POST = async (req) => {
    console.log(`---------------------CREATE STORY---------------------\n`);

    const {apiKey, CharacterName, CharacterRace, StorySetting} = await req.json();

    conexion(apiKey);
    console.log(`Connected !`)
    try{

        var openaiRes = await storyTram (CharacterName, CharacterRace, StorySetting);

        var parseStory = parseStoryToPages(openaiRes.data.choices[0].message.content);
    
        console.log(`parseStory =>\n${openaiRes.data.choices[0].message.content}`);
    
        return new NextResponse( JSON.stringify(parseStory) , { status: 201 });
 
    }catch(error){
        return new NextResponse({message: `ERROR :${error}`}, { status: 500 });
    }
}


    
