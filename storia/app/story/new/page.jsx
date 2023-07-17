"use client"

import FormChild from '@components/FormChild'
import FormAdult from '@components/FormAdult'

import Story from '@components/Story'

import React, { useState } from 'react'

const StoryMain = () => {
  const [story, setStory] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState('FormChild');
  const [isStory, setIsStory]= useState(false)
  const handleStoryCreation = (newStory) => {
    setStory(newStory);
    setIsStory(!isStory)
  }

  const handleComponentChange = (event) => {
    setSelectedComponent(event.target.value);
  }
const handleResetStory = () => {

  setIsStory(false)
  setStory(null)
}
  return (
    <section>

       

    {
      isStory ? 
      <section className="flex flex-col justify-center items-center">
        <Story story={story} />
        <button onClick={handleResetStory} className='px-4 py-2  bottom: 0px text-white bg-lime-600 rounded-md hover:bg-lime-700 focus:outline-none'>Nouvelle histoire</button> 
      </section>
      :
      <section className="flex flex-col justify-center items-center">
        <select onChange={handleComponentChange} className="self-center">
          <option value='FormChild'>FormChild</option>
          <option value='FormAdult'>FormAdult</option>
        </select>
        {
          selectedComponent === 'FormChild' ? 
          <FormChild onStoryCreation={handleStoryCreation} /> 
          : 
          <FormAdult onStoryCreation={handleStoryCreation} />
        }
      </section>
    }
       
         

    </section>
  )
}

export default StoryMain


