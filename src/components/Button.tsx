import React from 'react'

function Button({text, type='button', className='',...props}:
    {text:any,type?: 'button' | 'submit' | 'reset', className?:string} ) {
  return (
    <button
    type={type} 
    className={`px-4 py-2 rounded-lg ${className}`} 
    {...props}
    >
      {text}
    </button>
  )
}

export default Button
