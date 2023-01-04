import { ReactElement } from 'react';
import { TaskContainer, RemoveButton } from '@styles/styles';
import { Draggable } from 'react-beautiful-dnd';
import { useTrelloContext } from '@hooks/context';
import { ACTION_TYPES } from '@interfaces/interfaces';

interface TaskProps {
  id: string;
  text: string;
  index: number;
}

// TODO: add Edit button
export const Task = ({ id, text, index }: TaskProps): ReactElement => {
  const isDragDisabled = text.includes('Blocked');
  const { dispatch } = useTrelloContext();
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
          className='task'
        >
          {text}
          <RemoveButton
            alignment='centered'
            aria-label='remove task'
            onClick={() =>
              dispatch({
                type: ACTION_TYPES.REMOVE_TASK,
                payload: id,
              })
            }
          >
            🗑
          </RemoveButton>
        </TaskContainer>
      )}
    </Draggable>
  );
};
