import { DraggableLocation } from 'react-beautiful-dnd';

export enum ACTION_TYPES {
  ADD_LIST = 'ADD_LIST',
  MOVE_COLUMN = 'MOVE_COLUMN',
  ADD_TASK = 'ADD_TASK',
  MOVE_TASK = 'MOVE_TASK',
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
    type: ACTION_TYPES.ADD_LIST;
    payload: string;
  }
  | {
    type: ACTION_TYPES.ADD_TASK;
    payload: { text: string; taskId: string };
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
