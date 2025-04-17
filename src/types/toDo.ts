export type ToDo = {
  id: number;
  title: string;
  isDone: boolean;
};

export type ToDoFull = {
  isDeleted: boolean;
} & ToDo;