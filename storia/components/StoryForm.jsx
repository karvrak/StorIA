"use client"

import React, { useState } from 'react';

function StoryForm() {
  const [apiKey, setApiKey] = useState('');
  const [running, setRunning] = useState('');
  const [CharacterName, setCharacterName] = useState('');
  const [CharacterRace, setCharacterRace] = useState('');
  const [StorySetting, setStorySetting] = useState('');
  const [StoryGenre, setStoryGenre] = useState('');
  const [StoryTon, setStoryTon] = useState('');
  const [StoryDescription, setStoryDescription] = useState('');
  const [result, setResult] = useState('');
  const [generateImages, setGenerateImages] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const [pageId, setPageId] = useState(1); // initialize pageId to 1

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };
  
  const handleGenerateImagesChange = (e) => {
    setGenerateImages(e.target.checked);
  };
  
  const handleCharacterNameChange = (e) => {
    setCharacterName(e.target.value);
  };
  
  const handleCharacterRaceChange = (e) => {
    setCharacterRace(e.target.value);
  };
  
  const handleStorySettingChange = (e) => {
    setStorySetting(e.target.value);
  };
  
  const handleStoryGenreChange = (e) => {
    setStoryGenre(e.target.value);
  };
  
  const handleStoryTonChange = (e) => {
    setStoryTon(e.target.value);
  };
  
  const handleStoryDescriptionChange = (e) => {
    setStoryDescription(e.target.value);
  };
  
  const incrementPageId = () => {
    setPageId(prevPageId => prevPageId + 1);
  };

  const decrementPageId = () => {
    if (pageId > 1) {
      setPageId(prevPageId => prevPageId - 1);
    }
  };

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

        setResult(data);
        if(generateImages) {
          const imageResponse = await fetch('/api/story/image/create', {
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              apiKey: apiKey,
              text: result.find(page => page.page === pageId)

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

  const handleReset = () => {
    setApiKey('');
    setText('');
  };


  const currentPageContent = result?result.find(page => page.page === pageId)?.content || '' : "";

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-8">
      <div className="mb-5">
        <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          API Key:
        </label>
        <input type="text" id="apiKey" value={apiKey} onChange={handleApiKeyChange} required 
               className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:outline-none dark:focus:ring-dark:focus:ring-gray-900 dark:focus:border-gray-500" />
      </div>

      <div className="mb-5">
        <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          Character Name:
        </label>
        <input type="text" id="characterName" value={CharacterName} onChange={handleCharacterNameChange} required 
               className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:outline-none dark:focus:ring-dark:focus:ring-gray-900 dark:focus:border-gray-500" />
      </div>

      <div className="mb-5">
        <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          Character Race:
        </label>
        <input type="text" id="characterRace" value={CharacterRace} onChange={handleCharacterRaceChange} required 
               className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:outline-none dark:focus:ring-dark:focus:ring-gray-900 dark:focus:border-gray-500" />
      </div>

      <div className="mb-5">
        <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          Story Setting:
        </label>
        <input type="text" id="storySetting" value={StorySetting} onChange={handleStorySettingChange} required 
               className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:outline-none dark:focus:ring-dark:focus:ring-gray-900 dark:focus:border-gray-500" />
      </div>

      <div className="mb-5">
        <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          Story Genre:
        </label>
        <select id="storyGenre" value={StoryGenre} onChange={handleStoryGenreChange} required className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:outline-none dark:focus:ring-dark:focus:ring-gray-900 dark:focus:border-gray-500">
          <option>Fantasy</option>
          <option>Sci-Fi</option>
          <option>Thriller</option>
          <option>Romance</option>
        </select>
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          Story Tone:
        </label>
        <select id="storyTone" value={StoryTon} onChange={handleStoryTonChange} required className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:outline-none dark:focus:ring-dark:focus:ring-gray-900 dark:focus:border-gray-500">
          <option>Light</option>
          <option>Dark</option>
          <option>Serious</option>
          <option>Humorous</option>
        </select>
      </div>

      <div className="mb-5">
        <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          Describe your story:
        </label>
        <textarea id="storyDescription" value={StoryDescription} onChange={handleStoryDescriptionChange} required 
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:outline-none dark:focus:ring-dark:focus:ring-gray-900 dark:focus:border-gray-500" 
                  placeholder="e.g., A thrilling adventure set in the dystopian future where the protagonist, a young robot mechanic, uncovers a conspiracy that could change the world forever."/>
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          <input type="checkbox" id="generateImages" checked={generateImages} onChange={handleGenerateImagesChange} className="mr-2"/>
          Generate Images
        </label>
      </div>
      <p className="mb-5 text-indigo-500">{running ? "Running..." : "nothing"}</p>
      
     
      <div className="flex justify-end space-x-4 mb-8">
        <button type="button" onClick={handleReset} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none">Cancel</button>
        <button type="submit" className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none">Send</button>
      </div>
       {result?(
          <section>
            {generateImages?
            <>
              <label>(Image {pageId}):</label>
              <p className="text-lg text-gray-700">{imageUrl}</p>
            </>:''
            }
            <label>(Page {pageId}):</label>
            <p className="text-lg text-gray-700">{currentPageContent}</p>



            <div className="flex justify-end space-x-4 mb-8">
            <button type="button" onClick={decrementPageId} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none">Previous Page</button>
            <button type="button" onClick={incrementPageId} className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none">Next Page</button>
            </div>
          </section>
          ):(
          <section/>
          )
        }
</form>

  );
}

export default StoryForm;