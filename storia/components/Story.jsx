"use client"

import React, { useState, useEffect } from 'react'

function Story(props) {

    const [result, setResult] = useState('');
    const [pageId, setPageId] = useState(0);
    const [build, setBuild] = useState(true);
    
  
    const decrementPageId = () => {
        pageId > 0 ? setPageId(pageId-1) : ''
    }
    const incrementPageId = () => {
        setPageId(pageId+1) 
    }
    const newStory = () => {
        setResult('')
        getStory() 
    }
    async function getStory(){
        setBuild(false)
        setPageId(0)
        try{
            console.log('send fetch')
            const response = await fetch(`/api/story/makenew/${props.story.Request}`,{
              method:'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                apiKey: `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`,
                CharacterName: props.story.CharacterName,
                CharacterRace:props.story.CharacterRace,
                StorySetting:props.story.StorySetting,
              })
            })
            if(response.ok){
              const data = await response.json();
              console.log(`-------DATA-------\n${data}`)
      
              var chaptersDetails = []
              var res = JSON.parse(data);
      
              // Récupère le texte de l'histoire
              var story = res[0].content;
              console.log(story)
      
              // Pour chaque chapitre...
              let pages = story.split("Chapitre");
              console.log('page :\n'+pages)
              // On supprime le premier élément qui est vide à cause du découpage
              pages = pages.slice(1);

              // Pour chaque page
              for (let i = 0; i < pages.length; i++) {
                  // Découpage en titre et contenu
                  let titreEtContenu = pages[i].split("\n\n", 2);
                  console.log('titreEtContenu :\n'+titreEtContenu)

                  // On supprime les espaces inutiles autour du titre et on enlève le ":" à la fin
                  let titre = titreEtContenu[0].trim().replace(":", "");

                  // Le contenu est ce qui suit après le titre
                  let contenu = titreEtContenu[1].trim();

                  console.log(`Page ${i + 1}:`);
                  console.log(`Titre: ${titre}`);
                  console.log(`Contenu: ${contenu}`);
                  console.log("\n");
                  chaptersDetails.push({ title: titre, page: contenu });

              }

                // ...ajoute un objet avec le titre et le contenu à la liste des détails des chapitres
            

              console.log(chaptersDetails);  // Affiche les détails des chapitres
      
              // Pour accéder aux données
              //console.log(chaptersDetails[0].title);  // Affiche le titre du premier chapitre
              //console.log(chaptersDetails[0].page); 
      
              
              setResult(chaptersDetails);
              /*    IMAGE PART
              
              if(generateImages) {
                console.log(`result: ${result}`)
      
                let resultObject = result; // transform JSON string to JavaScript object
                console.log(`resultObject: ${resultObject}`)
      
                let pageObject = resultObject//.find(page => page.page === pageId); // find the specific page
                console.log(`pageObject: ${pageObject}`)
      
                if(pageObject) {
                  let pageContent = pageObject.content; // get the content of the page
                  console.log(`pageContent: ${pageContent}`)
                  
                } else {
                  console.log(`Page with id ${pageId} not found`);
                }
                const imageResponse = await fetch('/api/story/image/create', {
                  method:'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
      
                  body: JSON.stringify({
                    apiKey: apiKey,
                    text: pageContent
                  })
                });
      
                if(imageResponse.ok){
                  const data = await response.json();
      
                  setImageUrl(data)          
                }
              }*/
            }
          }catch(error){
            console.log(error)
          }
        };


    // Vérifiez que props.story n'est pas null avant d'essayer d'accéder à ses propriétés
    if (!props.story) {
      return <div></div>;
    } else {
        console.log(build)
        build ? newStory() : console.log ('deja une histoire');

        return (
            <>
                <div></div>
                {result[0]?(
                    <section className='my-8 flex flex-col justify-center items-center'>         
                        <label className='my-8 text-justify'>{result[pageId]? 'Chapitre ' + result[pageId].title : "fin de l'histoire" }</label>
                        <p className="">{result[pageId]? result[pageId].page : "fin de l'histoire"}</p>
                        <div className="flex justify-end space-x-4 mb-8">
                            <button type="button" onClick={decrementPageId} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none">Previous Page</button>
                            <button type="button" onClick={incrementPageId} className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none">Next Page</button>
                        </div>
                    </section>
                ):(<div></div>)
                
                }
            </>
        )
    }
}
  

/*
    const handleSubmit = async (e) => {
        e.preventDefault();
        setRunning(true);
        try{
          const response = await fetch('/api/story/makenew',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              apiKey: apiKey,
              CharacterName: CharacterName,
              CharacterRace:CharacterRace,
              StorySetting:StorySetting,
              StoryGenre:StoryGenre,
              StoryTon:StoryTon,
              StoryDescription:StoryDescription,
    
            })
          })
          if(response.ok){
            const data = await response.json();
            console.log(`-------DATA-------\n${data}`)
    
            
            var res = JSON.parse(data);
    
            // Récupère le texte de l'histoire
            var story = res[0].content;
    
            // Découpe l'histoire en chapitres en utilisant 'Chapitre' comme délimiteur
            var chapters = story.split('Chapitre ').slice(1);
    
            // Crée un tableau pour stocker les détails de chaque chapitre
            var chaptersDetails = [];
    
            // Pour chaque chapitre...
            chapters.forEach(function(chapter) {
              // ...découpe le chapitre en titre et contenu en utilisant ':' comme délimiteur
              var parts = chapter.split('\\n\\n');
              
              // ...ajoute 'Chapitre' devant le titre du chapitre pour le rétablir
              var title = 'Chapitre ' + parts.shift().trim();
              
              // ...rejoint les parties restantes pour obtenir le contenu du chapitre
              var page = parts.join('\\n\\n').trim();
              
              // ...ajoute un objet avec le titre et le contenu à la liste des détails des chapitres
              chaptersDetails.push({ title: title, page: page });
            });
    
            console.log(chaptersDetails);  // Affiche les détails des chapitres
    
            // Pour accéder aux données
            console.log(chaptersDetails[0].title);  // Affiche le titre du premier chapitre
            console.log(chaptersDetails[0].page); 
    
            
            setResult(chaptersDetails);
            if(generateImages) {
              console.log(`result: ${result}`)
    
              let resultObject = result; // transform JSON string to JavaScript object
              console.log(`resultObject: ${resultObject}`)
    
              let pageObject = resultObject//.find(page => page.page === pageId); // find the specific page
              console.log(`pageObject: ${pageObject}`)
    
              if(pageObject) {
                let pageContent = pageObject.content; // get the content of the page
                console.log(`pageContent: ${pageContent}`)
                
              } else {
                console.log(`Page with id ${pageId} not found`);
              }
              const imageResponse = await fetch('/api/story/image/create', {
                method:'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
    
                body: JSON.stringify({
                  apiKey: apiKey,
                  text: pageContent
                })
              });
    
              if(imageResponse.ok){
                const data = await response.json();
    
                setImageUrl(data)          
              }
            }
          }
        }catch(error){
          console.log(error)
        }finally{
          setRunning(false)
        }
      };
    */

   


export default Story