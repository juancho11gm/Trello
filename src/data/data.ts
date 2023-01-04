import { TrelloState } from '@interfaces/interfaces';

export const initialState: TrelloState = {
  homeIndex: -1,
  tasks: {
    'task-1': { id: 'task-1', text: 'Learn Python (Blocked)' },
    'task-2': { id: 'task-2', text: 'Learn TypeScript' },
    'task-3': { id: 'task-3', text: 'Learn NextJS' },
    'task-4': { id: 'task-4', text: 'Learn Playwright' },
    'task-5': { id: 'task-5', text: 'Learn React' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2']
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-3', 'task-4']
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-5']
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3']
};