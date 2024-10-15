import React, { ReactNode, createContext, useState } from 'react';

interface GlobalState {
    avatar: string;
    setAvatar: (avatar: string) => void;
    isAuthenticated :boolean,
    setIsAuthenticated : (isAuthenticated:boolean) =>void;
  }
  interface GlobalStateProviderProps {
    children: ReactNode;
}

export const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider: React.FC<GlobalStateProviderProps>  = ({ children }) => {
  const [avatar, setAvatar] = useState('Initial Global State');
  const [isAuthenticated , setIsAuthenticated] =useState(false)

  return (
    <GlobalStateContext.Provider value={{ avatar, setAvatar,isAuthenticated,setIsAuthenticated }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
