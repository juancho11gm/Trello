import { ReactElement } from 'react';
import { TaskContainer } from '@styles/styles';
import { Draggable } from 'react-beautiful-dnd';

interface TaskProps {
  id: string;
  text: string;
  index: number;
}

export const Task = ({ id, text, index }: TaskProps): ReactElement => {
  const isDragDisabled = text.includes('Blocked');
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <TaskContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
          aria-roledescription='Press space bar to lift the task'
        >
          {text}
        </TaskContainer>
      )}
    </Draggable>
  );
};
