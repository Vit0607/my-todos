export type Todo = {
  id: number;
  title: string;
  isDone: boolean;
};

export type TodosUpdater = (updater: (prev: Todo[]) => Todo[]) => void;
