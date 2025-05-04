// import { SingleToDoProps } from './SingleToDo.props';
import styles from './SingleToDo.module.scss';
import { memo, useEffect } from 'react';

interface SingleToDoProps {
  id: number;
  title: string;
  isDone: boolean;
  toggleIsDone: (checked: boolean, index: number) => void;
  index: number;
  handleDeleteItem: (id: number) => void;
}

const SingleToDo = ({
  id,
  title,
  isDone,
  toggleIsDone,
  index,
  handleDeleteItem
}: SingleToDoProps) => {
  console.log(`TODO_${id}`);

  useEffect(() => {
    console.log('checked: ', isDone);
  }, [isDone]);

  return (
    <li className={styles.toDo}>
      <input
        type="checkbox"
        checked={isDone}
        onChange={e => toggleIsDone(e.target.checked, index)}
      />
      <span>{title}</span>
      <button className={styles.delete} onClick={() => handleDeleteItem(id)}>
        Delete
      </button>
    </li>
  );
};

export default memo(SingleToDo);
