import React from 'react';
import { Column } from '../Column';
import { AppContainer } from '../../Utils/Styles';
import { AddNewItem } from '../AddNewItem';
import { useAppState } from '../AppStateContext';

// 81
const App = () => {
  const { state, dispatch } = useAppState();
  return (
    <AppContainer>
      {state.list.map((list, i) => (
        <Column id={list.id} text={list.text} key={list.id} index={i}/>
      ))}

      <AddNewItem 
        toggleButtonText="+ Add another list" 
        onAdd={text => dispatch({ type: 'ADD_LIST', payload: text})}
      />
    </AppContainer>
  )
};

export { App };
