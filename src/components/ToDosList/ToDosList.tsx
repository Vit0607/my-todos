import { ToDo } from '../../types/toDo';
import SingleToDo from '../SingleToDo/SingleToDo';
import styles from './ToDosList.module.scss';

const ToDosList = ({
  toDosArr,
  toggleIsDone,
  onDeleted
}: {
  toDosArr: ToDo[];
  toggleIsDone: (id: number) => void;
  onDeleted: (id: number) => void;
}) => {
  return (
    <ul className={styles.toDoList}>
      {toDosArr?.map((toDo: ToDo) => {
        return (
          <SingleToDo
            el={toDo}
            toggle={toggleIsDone}
            deleteToDo={onDeleted}
            key={toDo.id}
          />
        );
      })}
    </ul>
  );
};

export default ToDosList;
