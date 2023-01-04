import styled, { css } from 'styled-components';

export const AppTitle = styled.h1`
  text-align: center;
  margin: 0;
  padding: 2rem;
`;

export const AppContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
  height: 100vh;
  padding: 1rem;
  width: 100%;
  overflow: scroll;
  align-items: flex-start;
`;

export const ColumnList = styled.ul`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const ColumnContainer = styled.li`
  background-color: #ebecf0;
  min-height: 40px;
  min-width: 350px;
  border-radius: 3px;
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  position: relative;
`;

export const ColumnTitle = styled.div`
  font-weight: bold;
  text-align: left;
  margin-bottom: 0.5rem;
  padding: 0 0.5rem;
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
  position: relative;
`;

const RemoveButtonSizes = {
  top: css`
    top: 8px;
  `,
  centered: css`
    top: 50%;
    transform: translateY(-50%);
  `,
};

interface RemoveButtonProps {
  alignment: 'top' | 'centered';
}

export const RemoveButton = styled.button<RemoveButtonProps>`
  position: absolute;
  background: none;
  cursor: pointer;
  border: none;
  right: 8px;
  font-size: 12px;
  padding: 0;
  ${(props) => RemoveButtonSizes[props.alignment]}
`;

export const AddItemButton = styled.button<AddItemButtonProps>`
  background-color: #ffffff3d;
  border-radius: 3px;
  border: 1px solid #ffffff3d;
  color: ${(props) => (props.dark ?? false ? '#000' : '#fff')};
  cursor: pointer;
  text-align: left;
  transition: background 85ms ease-in;
  padding: 0.5rem;
  margin-left: 0.5rem;
  min-width: 100px;
  &:hover {
    background-color: ${(props) => (props.dark ?? false ? 'lightgray' : '#ffffff52')};
  }
`;

export const NewItemFormContainer = styled.form`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 0.5rem;
`;

export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e4240 0px 1px 0px 0px;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
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
