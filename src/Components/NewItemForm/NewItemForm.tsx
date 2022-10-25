import React, { ReactElement, useState } from 'react';
import { NewItemButton, NewItemFormContainer, NewItemInput } from '../../Utils/Styles';
import { useFocus } from '../../Utils/UseFocus';

interface NewItemFormProps {
  onAdd: (text: string) => void;
}

const NewItemForm = (props: NewItemFormProps): ReactElement => {
  const { onAdd } = props;
  const [text, setText] = useState('');
  const inputRef = useFocus();

  return (
    <NewItemFormContainer>
      <NewItemInput ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  );
};

export { NewItemForm };
