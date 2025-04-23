// import { SingleToDoProps } from './SingleToDo.props';
import styles from './SingleToDo.module.scss';
import { ToDo } from '../../types/toDo';

const SingleToDo = ({
  el,
  toggle,
  deleteToDo
}: {
  el: ToDo;
  toggle: (id: number) => void;
  deleteToDo: (id: number) => void;
}) => {
  console.log(`TODO_${el.id}`);
  return (
    <li key={el.id} className={styles.toDo}>
      <input
        type="checkbox"
        checked={el.isDone}
        onChange={() => toggle(el.id)}
      />
      <span>{el.title}</span>
      <button className={styles.delete} onClick={() => deleteToDo(el.id)}>
        Delete
      </button>
    </li>
  );
};

export default SingleToDo;
