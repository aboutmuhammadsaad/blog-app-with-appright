import React, { useId } from "react"
type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input =React.forwardRef(function Input({
    label,type="text", placeholder ,className="",...props
}:InputProps,ref:any) {
    const id=useId();
  return (
    <div className="w-full">
        {label && <label className="inline-block mb-1 pl-1" htmlFor={id}>{label}</label>}
        <input 
        type={type} 
        placeholder={placeholder}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} 
        ref={ref}
        {...props}
        id={id}
        /> 

    </div>
  )
})

export default Input