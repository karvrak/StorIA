"use client"

import React, { useState } from 'react';

function StoryForm() {
  const [apiKey, setApiKey] = useState('');
  const [text, setText] = useState('');
  const [running, setRunning] = useState('');
  const [result, setResult] = useState('');

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRunning(true);
    try{
      const response = await fetch('/api/story/new',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          caractereName :0, //get value from id="characterName"
          apiKey: apiKey
        })
      })
      if(response.ok){
        const data = await response.json();

        setResult(data.text);
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
        <input type="text" id="characterName"  required 
               className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:outline-none dark:focus:ring-dark:focus:ring-gray-900 dark:focus:border-gray-500" />
      </div>

      <div className="mb-5">
        <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          Character Race:
        </label>
        <input type="text" id="characterRace"  required 
               className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:outline-none dark:focus:ring-dark:focus:ring-gray-900 dark:focus:border-gray-500" />
      </div>

      <div className="mb-5">
        <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          Story Setting:
        </label>
        <input type="text" id="storySetting"  required 
               className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:outline-none dark:focus:ring-dark:focus:ring-gray-900 dark:focus:border-gray-500" />
      </div>

      <div className="mb-5">
        <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          Story Genre:
        </label>
        <select id="storyGenre"  required className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:outline-none dark:focus:ring-dark:focus:ring-gray-900 dark:focus:border-gray-500">
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
        <select id="storyTone"  required className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:outline-none dark:focus:ring-dark:focus:ring-gray-900 dark:focus:border-gray-500">
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
        <textarea id="storyDescription" required 
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:outline-none dark:focus:ring-dark:focus:ring-gray-900 dark:focus:border-gray-500" 
                  placeholder="e.g., A thrilling adventure set in the dystopian future where the protagonist, a young robot mechanic, uncovers a conspiracy that could change the world forever."/>
      </div>

      <p className="mb-5 text-indigo-500">{running ? "Running..." : "nothing"}</p>
      
      <div className="flex justify-end space-x-4 mb-8">
        <button type="button" onClick={handleReset} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none">Cancel</button>
        <button type="submit" className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none">Send</button>
      </div>

      <label>Result:</label>
      <p className="text-lg text-gray-700">{result}</p>
</form>

  );
}

export default StoryForm;