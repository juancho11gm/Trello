import { initialState } from '@data/data';
import { TrelloContext } from '@hooks/context';
import { ACTION_TYPES } from '@interfaces/interfaces';
import { fireEvent, render } from '@testing-library/react';
import { describe, vi } from 'vitest';
import * as reducerModule from '../../hooks/reducer';
import { Task } from './Task';

vi.mock('react-beautiful-dnd', () => {
  const mContext = {
    DragDropContext: vi.fn(({ children }: { children: React.ReactElement }) => children),
    Droppable: vi.fn(
      ({ children }: { children: (provided: any, snapshot: any) => React.ReactElement }) =>
        children({}, {}),
    ),
    Draggable: vi.fn(
      ({ children }: { children: (provided: any, snapshot: any) => React.ReactElement }) =>
        children({}, {}),
    ),
  };
  return mContext;
});

describe('<Task/>', () => {
  test('Remove a Task', () => {
    const TrelloStateProviderSpy = vi.spyOn(reducerModule, 'TrelloStateProvider');
    const trelloContextSpy = {
      state: initialState,
      dispatch: vi.fn(),
    };

    TrelloStateProviderSpy.mockImplementationOnce(({ children }: React.PropsWithChildren<{}>) => (
      <TrelloContext.Provider value={trelloContextSpy}>{children}</TrelloContext.Provider>
    ));

    const { getByRole } = render(
      <reducerModule.TrelloStateProvider>
        <Task id='1' index={0} text='Do homework' />
      </reducerModule.TrelloStateProvider>,
    );
    const removeButton = getByRole('button');
    fireEvent(
      removeButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(trelloContextSpy.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: ACTION_TYPES.REMOVE_TASK,
        payload: '1',
      }),
    );
  });
});
