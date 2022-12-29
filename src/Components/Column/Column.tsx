import React, { ReactElement } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { AddNewItem } from '../AddNewItem';
import { CardsContainer, ColumnContainer, ColumnTitle } from '../../Utils/Styles';
import { useAppState } from '../AppStateContext';
import { Card } from '../Card';

interface ColumnProps {
  text: string;
  index: number;
  id: string;
  innerRef: (element?: HTMLElement | null) => any;
}

export const Column = ({
  text,
  index,
  id,
  innerRef,
  ...dragProps
}: React.PropsWithChildren<ColumnProps>): ReactElement => {
  const { state, dispatch } = useAppState();

  return (
    <DragDropContext
      onDragEnd={(result) =>
        dispatch({
          type: 'MOVE_TASK',
          payload: {
            columnId: id,
            source: { ...result.source },
            destination: {
              index: result.destination?.index,
              droppableId: result.destination?.droppableId,
            },
          },
        })
      }
    >
      <ColumnContainer ref={innerRef} {...dragProps}>
        <ColumnTitle>{text}</ColumnTitle>
        <Droppable droppableId='cards'>
          {(droppableProvided) => (
            <CardsContainer {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
              {state.list[index].tasks.map((task, i) => (
                <Draggable key={task.id} draggableId={task.id} index={i}>
                  {(draggableProvided) => (
                    <Card
                      text={task.text}
                      innerRef={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </CardsContainer>
          )}
        </Droppable>
        <AddNewItem
          toggleButtonText='+ Add another task'
          onAdd={(text) => dispatch({ type: 'ADD_TASK', payload: { text, taskId: id } })}
          dark
        />
      </ColumnContainer>
    </DragDropContext>
  );
};
