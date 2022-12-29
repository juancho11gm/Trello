import React, { ReactElement } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useAppState } from '../AppStateContext';
import { AppContainer, AppTitle, ColumnsContainer } from '../../Utils/Styles';
import { AddNewItem } from '../AddNewItem';
import { Column } from '../Column';

const App = (): ReactElement => {
  const { state, dispatch } = useAppState();
  return (
    <>
      <DragDropContext
        onDragEnd={(result) =>
          dispatch({
            type: 'MOVE_LIST',
            payload: {
              source: { ...result.source },
              destination: {
                index: result.destination?.index,
                droppableId: result.destination?.droppableId,
              },
            },
          })
        }
      >
        <AppTitle>Trello Clone</AppTitle>
        <AppContainer>
          <Droppable droppableId='columns' direction='horizontal'>
            {(droppableProvided) => (
              <ColumnsContainer
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                {state.list.map((list, i) => (
                  <Draggable key={list.id} draggableId={list.id} index={i}>
                    {(draggableProvided) => (
                      <Column
                        key={list.id}
                        index={i}
                        id={list.id}
                        text={list.text}
                        innerRef={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      />
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </ColumnsContainer>
            )}
          </Droppable>
          <AddNewItem
            toggleButtonText='+ Add another list'
            onAdd={(text) => dispatch({ type: 'ADD_LIST', payload: text })}
          />
        </AppContainer>
      </DragDropContext>
    </>
  );
};

export { App };
