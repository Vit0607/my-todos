import { ToDo } from '../types/toDo';

export const delay = (arr: ToDo[], ms: number): Promise<ToDo[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(arr);
    }, ms);
  });
};
