import { createContext, useContext } from 'react';
import { TrelloStateContextProps } from '@interfaces/interfaces';

export const TrelloContext = createContext<TrelloStateContextProps | null>(null);

export const useTrelloContext = (): TrelloStateContextProps => {
  const contextValue = useContext(TrelloContext);
  if (contextValue === null) {
    throw Error('Context has not been Provided!');
  }
  return contextValue;
};
