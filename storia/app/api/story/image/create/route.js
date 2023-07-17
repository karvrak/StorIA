import { Configuration, OpenAIApi } from "openai"
import { NextResponse } from 'next/server';

const textModel ='gpt-3.5-turbo';
var openai;

const conexion = (apiKey) =>{

    openai = new OpenAIApi(new Configuration ({
        organization: "org-k0ei4gcG3YuH3f43NRw5Y8Ct",
        apiKey : apiKey,
    }));
   
}

const buildImageDesc = async (story) => {
    var prompt =`en utilisant le texte suivant , ecrit un prompt de 10 a 15 mot qui liste les point important de l'histoire pour généré une image :
    "${story?story:' a red car'}" .`;
    console.log(`---------------------CREATE IMAGE DESC---------------------\n`)
    console.log(prompt)
    console.log(`start...`)
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
        console.log('end request')
        return openaiRes;
    }catch (error){
        console.log(`Error: ${error}`); // this will print the error details to the console
        return new NextResponse({message: `ERROR :${error.message}`}, { status: 500 });
    }

}

const generateImage = async (prompt) => {
    
    try{
        
        image = await openai.createImage({
            prompt: prompt,
            n: 1,
            size:"1024x1024",
        })
        console.log('end request')
        return image.data.data[0].url;
    }catch (error){
        console.log(`Error: ${error}`); // this will print the error details to the console
        return new NextResponse({message: `ERROR :${error.message}`}, { status: 500 }); 
    }
}
export const POST = async (req) => {

    const {apiKey, story} = await req.json();

    console.log(`---------VAR------------\n`);
    console.log(`apiKey ${apiKey}`);
    console.log(`story ${story?story:' a red car'}`);

    conexion(apiKey);
    console.log(`Connected !`)


    try{
        console.log('--------------FIRST REQUEST------------------\n')

        var imageDesc = await buildImageDesc (story);



        console.log('--------------SECONDE REQUEST------------------\n')

        imageDesc = imageDesc.data.choices[0].message.content;
        
        var image = await generateImage (imageDesc);

        console.log(`--------------RESPONSE------------------\n`)
        console.log(image)
        console.log(`----------------------------------------\n`)


        console.log('--------------RETURN------------------\n')

        return new NextResponse( JSON.stringify({text : image}) , { status: 201 });

    }catch(error){
        return new NextResponse({message: `ERROR :${error}`}, { status: 500 });
    }
}


    
