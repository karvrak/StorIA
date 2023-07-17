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
    
   var prompt = `repond bonjour `;
   
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


    
