type Callback = (value: string) => void;

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export const handleInput = (cb: Callback) => (e: InputEvent) => {
  cb(e.target.value);
};
