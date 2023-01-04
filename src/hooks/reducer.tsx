import React, { ReactElement, useReducer } from 'react';
import { v1 as uuid } from 'uuid';
import { Action, TrelloState, ACTION_TYPES, ColumnI, TaskI } from '@interfaces/interfaces';
import { reorderArray } from '@utils/reorderArray';
import { TrelloContext } from '@hooks/context';
import { initialState } from '@data/data';

const trelloStateReducer = (state: TrelloState, action: Action): TrelloState => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_DRAG: {
      return {
        ...state,
        homeIndex: action.payload,
      };
    }

    case ACTION_TYPES.ADD_COLUMN: {
      const newColumn: ColumnI = {
        id: uuid(),
        title: action.payload,
        taskIds: [],
      };

      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.push(newColumn.id);

      return {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
        columnOrder: newColumnOrder,
      };
    }

    case ACTION_TYPES.ADD_TASK: {
      const { text, columnId } = action.payload;

      const newTaskId = uuid();
      const newTask: TaskI = {
        id: newTaskId,
        text,
      };

      const column = state.columns[columnId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.push(newTaskId);

      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [newTaskId]: newTask,
        },
        columns: {
          ...state.columns,
          [column.id]: newColumn,
        },
      };
    }

    case ACTION_TYPES.MOVE_COLUMN: {
      const { source, destination } = action.payload;
      // Out of the columns context
      if (destination == null) return { ...state };
      // Same position
      if (source.index === destination?.index && source.droppableId === destination.droppableId) {
        return { ...state };
      }
      const newColumnOrder = Array.from(state.columnOrder);
      const newColumns = reorderArray<string>(newColumnOrder, source.index, destination.index);
      return { ...state, columnOrder: newColumns };
    }

    case ACTION_TYPES.MOVE_TASK: {
      const { source, destination } = action.payload;

      // Out of the columns context
      if (destination == null) return { ...state };
      // Same position
      if (source.index === destination?.index && source.droppableId === destination.droppableId) {
        return { ...state };
      }

      // Find Source Column
      const sourceColumn = state.columns[source.droppableId];
      const destinationColumn = state.columns[destination.droppableId];

      // Reorder tasks in the same column
      if (sourceColumn === destinationColumn) {
        const newSourceTaskIds = Array.from(sourceColumn.taskIds);
        const newTasks = reorderArray<string>(newSourceTaskIds, source.index, destination?.index);

        const newColumn: ColumnI = {
          ...sourceColumn,
          taskIds: newTasks,
        };

        return {
          ...state,
          columns: {
            ...state.columns,
            [newColumn.id]: newColumn,
          },
        };
      } else {
        // Move task from one column to another
        const newSourceTaskIds = Array.from(sourceColumn.taskIds);
        const [task] = newSourceTaskIds.splice(source.index, 1);
        const newSourceColumn: ColumnI = {
          ...sourceColumn,
          taskIds: newSourceTaskIds,
        };

        const newDestinationTaskIds = [...destinationColumn.taskIds];
        newDestinationTaskIds.splice(destination.index, 0, task);

        const newDestinationColumn: ColumnI = {
          ...destinationColumn,
          taskIds: newDestinationTaskIds,
        };

        return {
          ...state,
          columns: {
            ...state.columns,
            [newSourceColumn.id]: newSourceColumn,
            [newDestinationColumn.id]: newDestinationColumn,
          },
        };
      }
    }

    case ACTION_TYPES.REMOVE_TASK: {
      const id = action.payload;

      const newTasks = Object.assign({}, state.tasks);
      const newColumns = Object.assign({}, state.columns);

      let newColumn: ColumnI = {
        id: '',
        title: '',
        taskIds: [],
      };

      // remove task within the column
      for (const [, value] of Object.entries(newColumns)) {
        const index = value.taskIds.indexOf(id);
        if (index >= 0) {
          const newColumnTasks = Array.from(value.taskIds);
          newColumnTasks.splice(index, 1);
          newColumn = {
            ...value,
            taskIds: newColumnTasks,
          };
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete newTasks[id];

      return {
        ...state,
        tasks: newTasks,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
    }

    case ACTION_TYPES.REMOVE_COLUMN: {
      const id = action.payload;
      const newColumnOrder = state.columnOrder.filter((c) => c !== id);

      // TODO: remove column from columns.
      return {
        ...state,
        columnOrder: newColumnOrder,
      };
    }

    default: {
      return state;
    }
  }
};

export const TrelloStateProvider = ({ children }: React.PropsWithChildren<{}>): ReactElement => {
  const [state, dispatch] = useReducer(trelloStateReducer, initialState);
  return <TrelloContext.Provider value={{ state, dispatch }}>{children}</TrelloContext.Provider>;
};
