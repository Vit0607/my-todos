// import { SingleToDoProps } from './SingleToDo.props';
import styles from './SingleToDo.module.scss';
import { ToDo } from '../../types/toDo';

const SingleToDo = ({
  el,
  toggle
}: {
  el: ToDo;
  toggle: (id: number) => void;
}) => {
  return (
    <li key={el.id} className={styles.toDo}>
      <input
        type="checkbox"
        checked={el.isDone}
        onChange={() => toggle(el.id)}
      />
      <span>{el.title}</span>
    </li>
  );
};

export default SingleToDo;
