import { Configuration, OpenAIApi } from "openai"
import { NextResponse } from 'next/server';


export const POST = async (req) => {
    var textModel ='gpt-3.5-turbo'

    const {apiKey, CharacterName, CharacterRace, StorySetting, StoryGenre, StoryTon, StoryDescription} = await req.json();

  
     console.log(`apiKey ${apiKey}`)
     console.log(`modelUse ${textModel}`)

    const openai = new OpenAIApi(new Configuration ({
        organization: "org-k0ei4gcG3YuH3f43NRw5Y8Ct",
        apiKey : apiKey,
    }));
    try{
        console.log('start')
        console.log('first request')
/*
        const openaiStoryHelp = await openai.createChatCompletion({
            model: textModel,
            message:[
                {role:"user", content:`tu doit aider un utilisateur a ce faire comprendre opres dun auteur pour quil lui ecrive lhistoire qui lui corespond.Voici la demande utilisateur :
                ${StoryDescription}` }
            ]
        });*/
        console.log('second request')

        var StoryHelp = openaiStoryHelp.data.choices[0].message.content;
        const openaiRes = await openai.createChatCompletion({
            model: textModel,
            messages : [
                {role: "user", content:`Tu es un auteur de ${StoryGenre}. Tu t'appraite a écrire une histoire a choix multiple .
                Lhistoire ce déroule ${StorySetting}. Le personnage principal est ${CharacterRace} nommé ${CharacterName}  ${objectif}. 
                Le ton de l'histoire doit être ${StoryTon} . 
                Decoupe tes pages en mettant |x| x etant le numero de la page.
                Voici des element pour taider a generer limage : ${StoryHelp}}`}
            ]
        })
        console.log('end request')

        console.log(openaiRes.data.choices[0].message.content)
        return new NextResponse( JSON.stringify({text : openaiRes.data.choices[0].message.content}) , { status: 201 });
 


    }catch(error){
        return new NextResponse({message: error}, { status: 500 });
        }
}


    
