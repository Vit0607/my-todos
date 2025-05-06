import { Todo, TodosUpdater } from '../types/todo';

export const addItem = (
  cbData: TodosUpdater,
  cbMemoryData: TodosUpdater,
  value: string
) => {
  const createNewItem = (prev: Todo[]) => {
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
