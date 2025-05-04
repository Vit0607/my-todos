import { ToDo } from '../types/toDo';

type Callback = (updater: (prev: ToDo[]) => ToDo[]) => void;

export const addItem = (
  cbData: Callback,
  cbMemoryData: Callback,
  value: string
) => {
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
};
