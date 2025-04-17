import { ToDoFull } from '../../types/toDo';
import SingleToDo from '../SingleToDo/SingleToDo';
import styles from './ToDosList.module.scss';

const ToDosList = ({
  toDosArr,
  toggleIsDone,
  deleteToDo
}: {
  toDosArr: ToDoFull[];
  toggleIsDone: (id: number) => void;
  deleteToDo: (id: number) => void;
}) => {
  return (
    <ul className={styles.toDoList}>
      {toDosArr?.map((toDo: ToDoFull) => {
        return (
          <SingleToDo el={toDo} toggle={toggleIsDone} deleteToDo={deleteToDo} />
        );
      })}
    </ul>
  );
};

export default ToDosList;
