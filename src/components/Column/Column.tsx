import React, { ReactElement } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { ACTION_TYPES, ColumnI, DROPPABLE_TYPES, TaskI } from '@interfaces/interfaces';
import { TaskList, ColumnContainer, ColumnTitle, RemoveButton, GrabbingDots } from '@styles/styles';
import { useTrelloContext } from '@hooks/context';
import { AddNewItem } from '@components/AddNewItem';
import { Task } from '@components/Task';
import { Drag } from '@icons/Drag/Drag';

const InnerList = React.memo(({ tasks }: { tasks: TaskI[] }) => {
  return (
    <>
      {tasks?.map((task, i) => (
        <Task key={task.id} id={task.id} text={task.text} index={i} />
      ))}
    </>
  );
});

InnerList.displayName = 'InnerList';

interface ColumnProps {
  column: ColumnI;
  tasks: TaskI[];
  isDropDisabled: boolean;
  index: number;
}

// TODO: add Edit button
export const Column = ({
  column,
  tasks,
  isDropDisabled,
  index,
}: React.PropsWithChildren<ColumnProps>): ReactElement => {
  const { dispatch } = useTrelloContext();
  const { title, id } = column;
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <ColumnContainer {...provided.draggableProps} ref={provided.innerRef} className='column'>
          <GrabbingDots {...provided.dragHandleProps}>
            <ColumnTitle className='column-title'>{title}</ColumnTitle>
            <Drag />
          </GrabbingDots>
          <Droppable droppableId={id} isDropDisabled={isDropDisabled} type={DROPPABLE_TYPES.TASK}>
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList tasks={tasks} /> {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
          <AddNewItem
            toggleButtonText='+ Add another Task'
            onAdd={(text) =>
              dispatch({ type: ACTION_TYPES.ADD_TASK, payload: { text, columnId: id } })
            }
            dark
          />
          <RemoveButton
            alignment='bottom'
            aria-label='remove column'
            onClick={() =>
              dispatch({
                type: ACTION_TYPES.REMOVE_COLUMN,
                payload: id,
              })
            }
          >
            ❌
          </RemoveButton>
        </ColumnContainer>
      )}
    </Draggable>
  );
};
