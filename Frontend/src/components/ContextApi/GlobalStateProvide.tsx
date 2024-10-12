import React, { ReactNode, createContext, useState } from 'react';

interface GlobalState {
    avatar: string;
    setAvatar: (avatar: string) => void;
  }
  interface GlobalStateProviderProps {
    children: ReactNode;
}

export const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider: React.FC<GlobalStateProviderProps>  = ({ children }) => {
  const [avatar, setAvatar] = useState('Initial Global State');

  return (
    <GlobalStateContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
