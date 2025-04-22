'use client';
import { StyleContext } from './context.js';

export function Parent({ style, children }) {
  return (
    <div>
      <StyleContext value={style}>
        {children}
      </StyleContext>
    </div>
  )
}
