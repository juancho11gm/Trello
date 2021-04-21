import React from 'react';
import { AddNewItem } from '../AddNewItem';
import { ColumnContainer, ColumnTitle } from '../../Utils/Styles';
import { useAppState } from '../AppStateContext';
import { Card } from '../Card';

interface ColumnProps {
    text: string,
    index: number,
    id: string
}

export const Column = ({ text, index, id }: React.PropsWithChildren<ColumnProps>) => {
    const { state, dispatch } = useAppState();
    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            {
                state.list[index].tasks.map(task => (
                    <Card text={task.text} key={task.id}/>
                ))
            }
            <AddNewItem
                toggleButtonText="+ Add another task"
                onAdd={text => dispatch({ type: 'ADD_TASK', payload: { text, taskId: id}})}
                dark
            />
        </ColumnContainer>
    )
};