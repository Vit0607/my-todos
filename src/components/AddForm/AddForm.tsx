import Button from '../Button/Button';

const AddForm = ({ onSubmit }: { onSubmit: (obj: object) => void }) => {
  type FormEvent = React.FormEvent<HTMLFormElement>;

  const addTask = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData);
    onSubmit(formProps);
    console.log('formProps: ', formProps);
  };

  return (
    <form onSubmit={addTask}>
      <input type="text" name="title" placeholder="new todo" />
      <Button>Add</Button>
    </form>
  );
};

export default AddForm;
