// import { SingleToDoProps } from './SingleToDo.props';
import styles from './SingleToDo.module.scss';
import { memo } from 'react';

interface SingleToDoProps {
  id: number;
  title: string;
  isDone: boolean;
  toggleIsDone: (checked: boolean, index: number) => void;
  index: number;
  handleDeleteItem: (id: number) => void;
  addLoading: boolean;
}

const SingleToDo = ({
  id,
  title,
  isDone,
  toggleIsDone,
  index,
  handleDeleteItem,
  addLoading
}: SingleToDoProps) => {
  console.log(`TODO_${id}`);

  return (
    <li className={styles.toDo}>
      <input
        type="checkbox"
        checked={isDone}
        onChange={e => toggleIsDone(e.target.checked, index)}
        disabled={addLoading}
      />
      <span className={addLoading ? styles.titleDisabled : styles.titleActive}>
        {title}
      </span>
      <button
        className={styles.delete}
        onClick={() => handleDeleteItem(id)}
        disabled={addLoading}
      >
        Delete
      </button>
    </li>
  );
};

export default memo(SingleToDo);
