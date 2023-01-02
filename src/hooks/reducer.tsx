import React, { ReactElement, useReducer } from 'react';
import { v1 as uuid } from 'uuid';
import { Action, TrelloState, List, Task } from '@interfaces/interfaces';
import { findItemIndexById } from '@utils/findItemIndexById';
import { reorderArray } from '@utils/reorderArray';
import { TrelloContext } from '@hooks/context';
import { initialState } from '@data/data';

const trelloStateReducer = (state: TrelloState, action: Action): TrelloState => {
  switch (action.type) {
    case 'ADD_LIST': {
      return {
        ...state,
        list: [...state.list, { id: uuid(), text: action.payload, tasks: [] }],
      };
    }

    case 'ADD_TASK': {
      const targetLaneIndex = findItemIndexById(state.list, action.payload.taskId);
      state.list[targetLaneIndex].tasks.push({
        id: uuid(),
        text: action.payload.text,
      });
      return {
        ...state,
      };
    }

    case 'MOVE_LIST': {
      const { source, destination } = action.payload;

      if (destination === null) return { ...state };
      if (source.index === destination.index && source.droppableId === destination.droppableId) {
        return { ...state };
      }

      const newList = reorderArray<List>(state.list, source.index, destination.index);

      return { ...state, list: newList };
    }

    case 'MOVE_TASK': {
      const { columnId, source, destination } = action.payload;

      if (destination === null) return { ...state };
      if (source.index === destination.index && source.droppableId === destination.droppableId) {
        return { ...state };
      }

      const columnIndex = state.list.findIndex((column) => column.id === columnId);
      const column = { ...state.list[columnIndex] };

      const tasks = [...column.tasks];
      const newList = reorderArray<Task>(tasks, source.index, destination.index);

      state.list[columnIndex].tasks = [...newList];

      return { ...state };
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
