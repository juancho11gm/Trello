import React, { createContext, useReducer, useContext } from 'react';
import { v1 as uuid} from 'uuid';
import { findItemIndexById } from '../../Utils/FindItemIndexById';

type Action = {
  type: 'ADD_LIST',
  payload: string
} | {
  type: 'ADD_TASK',
  payload: { text: string, taskId: string}
}

interface Task {
    id: string,
    text: string
}

interface List {
    id: string,
    text: string,
    tasks: Task[]
}

export interface AppState {
    list: List[]
}

interface AppStateContextProps {
    state: AppState,
    dispatch: React.Dispatch<Action>
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

export const useAppState = () => {
  return useContext(AppStateContext)
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

export const AppStateProvider = ({ children }: React.PropsWithChildren <{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData);
    return (
        <AppStateContext.Provider value = {{ state, dispatch }}>
            {children}
        </AppStateContext.Provider>
    );
}

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch(action.type) {
    case 'ADD_LIST': {
      return {
        ...state,
        list: [
          ...state.list,
          { id: uuid(), text: action.payload, tasks: []}
        ]
      }
    }

    case 'ADD_TASK': {
      const targetLaneIndex = findItemIndexById(state.list, action.payload.taskId);
      state.list[targetLaneIndex].tasks.push({
        id: uuid(),
        text: action.payload.text
      })
      return {
        ...state
      }
    }

    default: {
      return state;
    }
  }
}