import React, { ReactElement } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { TaskList, ColumnContainer, ColumnTitle } from '@styles/styles';
import { ACTION_TYPES, ColumnI, DROPPABLE_TYPES, TaskI } from '@interfaces/interfaces';
import { AddNewItem } from '@components/AddNewItem';
import { Task } from '@components/Task';

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

export const Column = ({
  column,
  tasks,
  isDropDisabled,
  index,
}: React.PropsWithChildren<ColumnProps>): ReactElement => {
  const { title, id } = column;
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <ColumnContainer {...provided.draggableProps} ref={provided.innerRef} className='column'>
          <ColumnTitle {...provided.dragHandleProps} className='column-title'>
            {title}
          </ColumnTitle>
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
            toggleButtonText='+ Add another task'
            onAdd={
              (text) => console.log('Add task')
              // dispatch({ type: ACTION_TYPES.ADD_TASK, payload: { text, taskId: id } })
            }
            dark
          />
        </ColumnContainer>
      )}
    </Draggable>
  );
};
