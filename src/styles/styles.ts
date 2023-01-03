import styled from 'styled-components';

export const AppTitle = styled.h1`
  text-align: center;
`;

export const AppContainer = styled.div`
  background-color: #3179ba;
  display: flex;
  gap: 20px;
  flex-direction: row;
  height: 100%;
  padding: 1rem;
  width: 100%;
  overflow: scroll;
`;

export const ColumnList = styled.ul`
  display: flex;
  gap: 20px;
  flex-direction: row;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const ColumnContainer = styled.li`
  background-color: #ebecf0;
  min-height: 40px;
  border-radius: 3px;
  width: 100%;
  padding: 1rem;
`;

export const ColumnTitle = styled.div`
  font-weight: bold;
  text-align: left;
  margin-bottom: 0.5rem;
`;

interface TaskListProps {
  isDraggingOver: boolean;
}

export const TaskList = styled.ul<TaskListProps>`
  display: flex;
  border-radius: 3px;
  flex-direction: column;
  gap: 0.5rem;
  background-color: ${props => props.isDraggingOver ? 'skyblue' : '#ebecf0'};
  margin: 0;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  list-style-type: none;
  min-height: 100px;
  transition: background-color 0.5s;
`;

interface TaskContainerProps {
  isDragging: boolean;
  isDragDisabled: boolean;
}

export const TaskContainer = styled.li<TaskContainerProps>`
  background-color: ${props => props.isDragDisabled ? 'lightgray' : props.isDragging ? 'lightgreen' : '#fff'};
  cursor: pointer;
  margin: 0;
  padding: 0.5rem;
  border-radius: 3px;
  box-shadow: #091e4240 0px 1px 0px 0px;
  transition: background-color 0.5s;
`;

export const AddItemButton = styled.button<AddItemButtonProps>`
  background-color: #ffffff3d;
  border-radius: 3px;
  border: 1px solid #ffffff3d;
  color: ${(props) => (props.dark ?? false ? '#000' : '#fff')};
  cursor: pointer;
  text-align: left;
  transition: background 85ms ease-in;
  width: 100%;
  padding: 0.5rem;
  &:hover {
    background-color: #ffffff52;
  }
  flex-shrink: 4;
`;

export const NewItemFormContainer = styled.form`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e4240 0px 1px 0px 0px;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  width: 100%;
`;

export const NewItemSubmitButton = styled.button`
  background-color: #5aac44;
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
`;

interface AddItemButtonProps {
  dark?: boolean;
}
