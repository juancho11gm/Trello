import { ReactElement, useState } from 'react';
import { NewItemForm } from '@components/NewItemForm';
import { AddItemButton } from '@styles/styles';

interface AddNewTaskProps {
  onAdd: (text: string) => void;
  toggleButtonText: string;
  dark?: boolean;
}

const AddNewItem = (props: AddNewTaskProps): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  const { onAdd, toggleButtonText, dark } = props;

  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text);
          setShowForm(false);
        }}
      />
    );
  }

  return (
    <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </AddItemButton>
  );
};

export { AddNewItem };
