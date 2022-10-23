import styled from 'styled-components'

export const AppContainer = styled.div`
    background-color: #3179ba;
    display: flex;
    flex-direction: row;
    height: 100%;
    padding: 20px;
    width: 100%;
`

export const ColumnsContainer = styled.ul`
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
`

export const ColumnContainer = styled.li`
    background-color: #ebecf0;
    min-height: 40px;
    margin-right: 20px;
    border-radius: 3px;
    padding: 8px 8px;
    width: 100%;
`

export const ColumnTitle = styled.div`
    padding: 6px 16px 12px;
    font-weight: bold;
`

export const CardsContainer = styled.ul`
    margin: 0;
    padding: 0;
    padding: 10px 12px;
    list-style-type: none;
`

export const CardContainer = styled.li`
    background-color: #fff;
    cursor: pointer;
    margin: 0;
    margin-bottom: 0.5rem;
    padding: 10px 0;
    max-width: 300px;
    border-radius: 3px;
    box-shadow: #091e4240 0px 1px 0px 0px;
`

export const AddItemButton = styled.button<AddItemButtonProps>`
    background-color: #ffffff3d;
    border-radius: 3px;
    border: none;
    color: ${props => ((props.dark ?? false) ? '#000' : '#fff')};
    cursor: pointer;
    max-width: 300px;
    text-align: left;
    transition: background 85ms ease-in;
    width: 100%;
    &:hover {
        background-color: #ffffff52;
    }
`
export const NewItemFormContainer = styled.div`
    max-width: 300px;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    padding: 0 12px;
`

export const NewItemButton = styled.button`
    background-color: #5aac44;
    border-radius: 3px;
    border: none;
    box-shadow: none;
    color: #fff;
    padding: 6px 12px;
    text-align: center;
`
export const NewItemInput = styled.input`
    border-radius: 3px;
    border: none;
    box-shadow: #091e4240 0px 1px 0px 0px;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    width: 100%;
`
interface AddItemButtonProps {
  dark?: boolean
}
