import React, { createContext, useReducer, useContext, ReactElement } from 'react';
import { v1 as uuid } from 'uuid';
import { findItemIndexById } from '../../Utils/FindItemIndexById';
import { reorderArray } from '../../Utils/reorderArray';

type Action =
  | {
      type: 'ADD_LIST';
      payload: string;
    }
  | {
      type: 'ADD_TASK';
      payload: { text: string; taskId: string };
    }
  | {
      type: 'MOVE_LIST';
      payload: { source: SourceDroppableData; destination: DestinationDroppableData };
    }
  | {
      type: 'MOVE_TASK';
      payload: {
        columnId: string;
        source: SourceDroppableData;
        destination: DestinationDroppableData;
      };
    };

interface SourceDroppableData {
  index: number;
  droppableId: string;
}

interface DestinationDroppableData {
  index: number | undefined;
  droppableId: string | undefined;
}

interface Task {
  id: string;
  text: string;
}

interface List {
  id: string;
  text: string;
  tasks: Task[];
}

export interface AppState {
  list: List[];
}

export interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const appData: AppState = {
  list: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }],
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{ id: 'c2', text: 'Learn Typescript' }],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c3', text: 'Begin to use static typing' }],
    },
  ],
};

export const useAppState = (): AppStateContextProps | null => {
  return useContext(AppStateContext);
};

const AppStateContext = createContext<AppStateContextProps | null>(null);

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>): ReactElement => {
  const [state, dispatch] = useReducer(appStateReducer, appData);
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>
  );
};

const appStateReducer = (state: AppState, action: Action): AppState => {
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
