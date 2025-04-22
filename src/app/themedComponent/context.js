import { createContext } from 'react';

// the default value of the context, used if the context is not provided
export const StyleContext = createContext({
  backgroundColor: 'gray'
});
