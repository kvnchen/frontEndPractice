'use client';
import { useContext } from 'react';
import { StyleContext } from './context.js';

export function ThemedComponent({ name, type = 'button', width = '50px', height = '20px', value, text }) {
  const style = useContext(StyleContext);
  style.width = width;
  style.height = height;
  
  return (
    <button 
      name={name} 
      type={type} 
      value={value} 
      style={style}
    >
      {text}
    </button>
  )
}
