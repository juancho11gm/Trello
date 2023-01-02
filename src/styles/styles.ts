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
  padding: 20px;
  width: 100%;
  overflow: scroll;
`;

export const ColumnsContainer = styled.ul`
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
  padding: 8px 8px;
  width: 100%;
`;

export const ColumnTitle = styled.div`
  font-weight: bold;
  text-align: left;
  margin: 0.1rem 0;
  padding: 10px;
`;

export const CardsContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export const CardContainer = styled.li`
  background-color: #fff;
  cursor: pointer;
  margin: 0;
  margin-bottom: 0.5rem;
  padding: 10px;
  border-radius: 3px;
  box-shadow: #091e4240 0px 1px 0px 0px;
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
  &:hover {
    background-color: #ffffff52;
  }
  flex-shrink: 4;
  padding: 1rem;
`;

export const NewItemFormContainer = styled.form`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

export const NewItemButton = styled.button`
  background-color: #5aac44;
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 6px 12px;
  text-align: center;
  cursor: pointer;
`;

export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e4240 0px 1px 0px 0px;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  width: 100%;
`;

interface AddItemButtonProps {
  dark?: boolean;
}