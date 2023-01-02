import { ReactElement, useState } from 'react';
import { NewItemButton, NewItemFormContainer, NewItemInput } from '@styles/styles';
import { useFocus } from '@hooks/useFocus';

interface NewItemFormProps {
  onAdd: (text: string) => void;
}

const NewItemForm = (props: NewItemFormProps): ReactElement => {
  const { onAdd } = props;
  const [text, setText] = useState('');
  const inputRef = useFocus();

  return (
    <NewItemFormContainer>
      <NewItemInput
        placeholder='Add new element'
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <NewItemButton name='create' onClick={() => onAdd(text)}>
        Create
      </NewItemButton>
    </NewItemFormContainer>
  );
};

export { NewItemForm };
