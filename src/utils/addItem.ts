import { Todo, TodosUpdater } from '../types/todo';
import { delay } from '../utils/delay';

export const addItem = async (
  cbData: TodosUpdater,
  cbMemoryData: TodosUpdater,
  cbIsAddLoading: (value: boolean) => void,
  value: string
) => {
  const handleIsAddLoading = (value: boolean) => {
    cbIsAddLoading(value);
  };
  handleIsAddLoading(true);
  console.log('Загрузка newItem началась...');

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
  const newItem = await delay(createNewItem, 1000);

  cbData(newItem);
  cbMemoryData(newItem);

  handleIsAddLoading(false);
  console.log('Загрузка newItem закончилась!');
};
