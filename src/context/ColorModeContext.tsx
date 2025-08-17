import { createContext } from 'react';

export interface ColorModeContextType {
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextType>({ 
  toggleColorMode: () => {},
});
