export type Action =
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

export interface SourceDroppableData {
  index: number;
  droppableId: string;
}

export interface DestinationDroppableData {
  index: number | undefined;
  droppableId: string | undefined;
}

export interface Task {
  id: string;
  text: string;
}

export interface List {
  id: string;
  text: string;
  tasks: Task[];
}

export interface TrelloState {
  list: List[];
}

export interface TrelloStateContextProps {
  state: TrelloState;
  dispatch: React.Dispatch<Action>;
}
