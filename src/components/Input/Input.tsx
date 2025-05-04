import { forwardRef } from 'react';

type InputEvent = React.ChangeEvent<HTMLInputElement>;
type RefType = React.Ref<HTMLInputElement>;

const Input = forwardRef(function input(
  {
    type,
    placeholder,
    // value,
    func,
    ...props
  }: {
    type: string;
    placeholder: string;
    // value: string;
    func: (e: InputEvent) => void;
  },
  ref: RefType
) {
  return (
    <input
      {...props}
      type={type}
      placeholder={placeholder}
      // value={value}
      onChange={func}
      ref={ref}
    />
  );
});

export default Input;
