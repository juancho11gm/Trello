import { ReactElement, useState } from 'react';
import { NewItemSubmitButton, NewItemFormContainer, NewItemInput } from '@styles/styles';
import { useFocus } from '@hooks/useFocus';

interface NewItemFormProps {
  onAdd: (text: string) => void;
  setShowForm: (showForm: boolean) => void;
}

const NewItemForm = (props: NewItemFormProps): ReactElement => {
  const { onAdd, setShowForm } = props;
  const [text, setText] = useState('');
  const inputRef = useFocus();

  return (
    <NewItemFormContainer>
      <NewItemInput
        placeholder='Add new element'
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => setShowForm(false)}
      />
      <NewItemSubmitButton name='create' onClick={() => onAdd(text)}>
        Create
      </NewItemSubmitButton>
    </NewItemFormContainer>
  );
};

export { NewItemForm };
