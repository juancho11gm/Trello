import React, { ReactElement } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { AppContainer, AppTitle, ColumnList } from '@styles/styles';
import { AddNewItem } from '@components/AddNewItem';
import { Column } from '@components/Column';
import { useTrelloContext } from '@hooks/context';
import { ACTION_TYPES, ColumnI, DROPPABLE_TYPES, TaskI } from '@interfaces/interfaces';

interface InnerlistProps {
  column: ColumnI;
  taskMap: { [key: string]: TaskI };
  index: number;
  homeIndex: number;
}

const InnerList = React.memo(({ column, taskMap, index, homeIndex }: InnerlistProps) => {
  const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
  const isDropDisabled = index < homeIndex;
  return (
    <Column
      key={column.id}
      column={column}
      tasks={tasks}
      index={index}
      isDropDisabled={isDropDisabled}
    />
  );
});

InnerList.displayName = 'InnerList';

const App = (): ReactElement => {
  const { state, dispatch } = useTrelloContext();
  return (
    <>
      <AppTitle>Trello Clone</AppTitle>

      <AppContainer>
        <DragDropContext
          onDragStart={(start) => {
            const homeIndex = state.columnOrder.indexOf(start.source.droppableId);
            dispatch({
              type: ACTION_TYPES.UPDATE_DRAG,
              payload: homeIndex,
            });
          }}
          onDragEnd={(result) => {
            const { destination, source, type } = result;

            dispatch({
              type: ACTION_TYPES.UPDATE_DRAG,
              payload: -1,
            });

            if (type === DROPPABLE_TYPES.TASK) {
              dispatch({
                type: ACTION_TYPES.MOVE_TASK,
                payload: {
                  source,
                  destination,
                },
              });
            }

            if (type === DROPPABLE_TYPES.COLUMN) {
              dispatch({
                type: ACTION_TYPES.MOVE_COLUMN,
                payload: {
                  source,
                  destination,
                },
              });
            }
          }}
        >
          <Droppable droppableId='all-columns' direction='horizontal' type={DROPPABLE_TYPES.COLUMN}>
            {(droppableProvided) => (
              <ColumnList {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                {state.columnOrder.map((columnId, index) => {
                  const column = state.columns[columnId];
                  return (
                    <InnerList
                      key={column.id}
                      column={column}
                      taskMap={state.tasks}
                      homeIndex={state.homeIndex}
                      index={index}
                    />
                  );
                })}
                {droppableProvided.placeholder}
              </ColumnList>
            )}
          </Droppable>
          <AddNewItem
            toggleButtonText='+ Add another Column'
            onAdd={(text) => dispatch({ type: ACTION_TYPES.ADD_COLUMN, payload: text })}
          />
        </DragDropContext>
      </AppContainer>
    </>
  );
};

export { App };
