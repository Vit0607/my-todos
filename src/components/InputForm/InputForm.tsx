import Button from '../Button/Button';

const InputForm = ({
  onSubmit,
  placeholderText,
  typeText,
  buttonText
}: {
  onSubmit: (item: object) => void;
  placeholderText: string;
  typeText: string;
  buttonText: string;
}) => {
  type FormEvent = React.FormEvent<HTMLFormElement>;

  const handleInput = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData);
    onSubmit(formProps);
  };

  return (
    <form onSubmit={handleInput}>
      <input placeholder={placeholderText} type={typeText} name="name" />
      <Button>{buttonText}</Button>
    </form>
  );
};

export default InputForm;
