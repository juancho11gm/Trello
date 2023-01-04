import { DraggableLocation } from 'react-beautiful-dnd';

export enum ACTION_TYPES {
  ADD_COLUMN = 'ADD_COLUMN',
  MOVE_COLUMN = 'MOVE_COLUMN',
  REMOVE_COLUMN = 'REMOVE_COLUMN',
  ADD_TASK = 'ADD_TASK',
  MOVE_TASK = 'MOVE_TASK',
  REMOVE_TASK = 'REMOVE_TASK',
  UPDATE_DRAG = 'UPDATE_DRAG'
}

export enum DROPPABLE_TYPES {
  COLUMN = 'COLUMN',
  TASK = 'TASK'
}

export type Action =
  {
    type: ACTION_TYPES.UPDATE_DRAG;
    payload: number
  }
  | {
    type: ACTION_TYPES.ADD_COLUMN;
    payload: string;
  }
  | {
    type: ACTION_TYPES.ADD_TASK;
    payload: { text: string; columnId: string };
  }
  | {
    type: ACTION_TYPES.MOVE_COLUMN;
    payload: {
      source: DraggableLocation;
      destination: DraggableLocation | undefined;
    };
  }
  | {
    type: ACTION_TYPES.MOVE_TASK;
    payload: {
      source: DraggableLocation;
      destination: DraggableLocation | undefined;
    };
  }
  | {
    type: ACTION_TYPES.REMOVE_TASK;
    payload: string;
  }
  | {
    type: ACTION_TYPES.REMOVE_COLUMN;
    payload: string;
  };

export interface TaskI {
  id: string;
  text: string;
}

export interface ColumnI {
  id: string;
  title: string;
  taskIds: string[];
}

export interface TrelloState {
  homeIndex: number;
  tasks: { [key: string]: TaskI };
  columns: { [key: string]: ColumnI };
  columnOrder: string[]
}

export interface TrelloStateContextProps {
  state: TrelloState;
  dispatch: React.Dispatch<Action>;
}
