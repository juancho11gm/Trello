import React, { ReactElement, useReducer } from 'react';
import { Action, TrelloState, ACTION_TYPES, ColumnI } from '@interfaces/interfaces';
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

    case ACTION_TYPES.ADD_LIST: {
      // return {
      //   ...state,
      //   list: [...state.list, { id: uuid(), text: action.payload, tasks: [] }],
      // };
      return { ...state };
    }

    case ACTION_TYPES.ADD_TASK: {
      // const targetLaneIndex = findItemIndexById(state.list, action.payload.taskId);
      // state.list[targetLaneIndex].tasks.push({
      //   id: uuid(),
      //   text: action.payload.text,
      // });
      // return {
      //   ...state,
      // };
      return { ...state };
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

    default: {
      return state;
    }
  }
};

export const TrelloStateProvider = ({ children }: React.PropsWithChildren<{}>): ReactElement => {
  const [state, dispatch] = useReducer(trelloStateReducer, initialState);
  return <TrelloContext.Provider value={{ state, dispatch }}>{children}</TrelloContext.Provider>;
};
