import React from 'react'
type ButtonProps = {
  text:any,
  type?: 'button' | 'submit' | 'reset', 
  className?:string
  bgColor?:string,
}& React.ButtonHTMLAttributes<HTMLButtonElement>

function Button({text, type='button', className='',bgColor,...props}:ButtonProps ) {
  const buttonClass = `${className} ${bgColor ? `bg-${bgColor}` : ''}`
  return (
    <button
    type={type} 
    className={`px-4 py-2 rounded-lg ${buttonClass}`} 
    {...props}
    >
      {text}
    </button>
  )
}

export default Button
