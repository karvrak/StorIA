import React from 'react'

const layout = ({children}) => {
  return (
    <div>
      <h1 className='head_text text-center'>Build your own story</h1>
      {children}
    </div>
  )
}

export default layout