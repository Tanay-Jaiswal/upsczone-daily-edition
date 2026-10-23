import { createContext, useContext } from 'react';

// Shared UI state: current language, translator and the coming-soon modal opener.
export const UIContext = createContext(null);

export function useUI() {
  return useContext(UIContext);
}
