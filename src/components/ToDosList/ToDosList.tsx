import { ToDo } from '../../types/toDo';
import SingleToDo from '../SingleToDo/SingleToDo';
import styles from './ToDosList.module.scss';

const ToDosList = ({
  toDosArr,
  toggleIsDone
}: {
  toDosArr: ToDo[];
  toggleIsDone: (id: number) => void;
}) => {
  return (
    <ul className={styles.toDoList}>
      {toDosArr?.map((toDo: ToDo) => {
        return <SingleToDo el={toDo} toggle={toggleIsDone} />;
      })}
    </ul>
  );
};

export default ToDosList;
