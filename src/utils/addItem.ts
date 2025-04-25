import { ToDo } from '../types/toDo';

type Callback = (updater: (prev: ToDo[]) => ToDo[]) => void;
type RefType = React.RefObject<HTMLInputElement | null>;

export const addItem = (
  cbData: Callback,
  cbMemoryData: Callback,
  ref: RefType
) => {
  if (ref?.current && ref.current.value) {
    const value = ref.current.value;
    const createNewItem = (prev: ToDo[]) => {
      return [
        ...prev,
        {
          id: prev.length > 0 ? Math.max(...prev.map(el => el.id)) + 1 : 1,
          title: value,
          isDone: false
        }
      ];
    };
    cbData(createNewItem);
    cbMemoryData(createNewItem);
  }
};
