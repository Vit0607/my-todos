// import { SingleToDoProps } from './SingleToDo.props';
import styles from './SingleToDo.module.scss';
import { ToDoFull } from '../../types/toDo';

const SingleToDo = ({
  el,
  toggle,
  deleteToDo
}: {
  el: ToDoFull;
  toggle: (id: number) => void;
  deleteToDo: (id: number) => void;
}) => {
  const { isDeleted } = el;
  return isDeleted ? (
    ''
  ) : (
    <li key={el.id} className={styles.toDo}>
      <input
        type="checkbox"
        checked={el.isDone}
        onChange={() => toggle(el.id)}
      />
      <span>{el.title}</span>
      <button className={styles.delete} onClick={() => deleteToDo(el.id)}>
        x
      </button>
    </li>
  );
};

export default SingleToDo;
