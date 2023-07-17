"use client"

import React, { useState } from 'react';

function FormAdult(props) {
  const [storyData, setStoryData] = useState({
    CharacterName: ``,
    StorySetting: ``,
    CharacterRace: ``,
    ApiKey: ``,
    Request: `adult`
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onStoryCreation(storyData);
  }
  const handleChange = (event) => {
    console.log('event: ', event.target.name);
    console.log('storyData: ', storyData);
    setStoryData({
      ...storyData,
      [event.target.name]: event.target.value
    });
  }
  const handleReset = () => {
    setStoryData({
      CharacterName: ``,
      StorySetting: ``,
      CharacterRace: ``,
      ApiKey: ``
    });
  };



return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-8">
      <div className="mb-5">              
        <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"> API Key:</label>
        <input type="text" name="ApiKey" value={storyData.ApiKey}  onChange={handleChange} required 
        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:outline-none dark:focus:ring-dark:focus:ring-gray-900 dark:focus:border-gray-500" />
      </div>
      <div className="mb-5">
        <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          Character Namewertewrte:
        </label>
        <input type="text"  name="CharacterName" value={storyData.CharacterName} onChange={handleChange} placeholder="Antoine" required 
        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:outline-none dark:focus:ring-dark:focus:ring-gray-900 dark:focus:border-gray-500" />
      </div>

      <div className="mb-5">
        <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          Character personalite:
        </label>
        <input type="text"  name="CharacterRace" value={storyData.CharacterRace} onChange={handleChange}  placeholder="un garcon vaillant venant d'un petit village dans une prairie combattant un dragon pour sauver la princesse du royaume" required 
               className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:outline-none dark:focus:ring-dark:focus:ring-gray-900 dark:focus:border-gray-500" />
      </div>
      <div className="mb-5">
        <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          synopsis histoire:
        </label>
        <input type="text" name="StorySetting" value={storyData.StorySetting} onChange={handleChange} placeholder="Dans un univers heroic fantasy" required 
               className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:outline-none dark:focus:ring-dark:focus:ring-gray-900 dark:focus:border-gray-500" />
      </div>
        <div className="flex justify-end space-x-4 mb-8">
        <button type="button" onClick={handleReset} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none">Cancel</button>
        <button type="submit" className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none">Send</button>
      </div>
    </form> 

  );
}

export default FormAdult;