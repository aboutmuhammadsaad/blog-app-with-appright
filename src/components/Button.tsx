import React from 'react'

function Button({text, type='button', className='',...props}:
    {text:any,type:string, className:string} ) {
  return (
    <button className={`px-4 py-2 rounded-lg ${className}`} 
    {...props}
    >
      {text}
    </button>
  )
}

export default Button
