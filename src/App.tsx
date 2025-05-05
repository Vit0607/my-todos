import { useEffect, useState, useCallback, useRef } from 'react';
import { ToDo } from './types/toDo';
import { delay } from './utils/delay';
import { DEFAULT_TODO_LIST } from './constants/defaultTodoList';
import SingleToDo from './components/SingleToDo/SingleToDo';
import styles from './App.module.scss';
import { addItem } from './utils/addItem';
import { useDebounce } from './hooks/useDebounce.hook';

function App() {
  const [data, setData] = useState<ToDo[]>([]);
  const [search, setSearch] = useState('');
  // const debouncedSearch = useDebounce(setSearch);
  const debouncedSearch = useDebounce(search);
  const [isLoading, setIsLoading] = useState(false);
  const [memoryData, setMemoryData] = useState<ToDo[]>([]);
  const [newToDo, setNewToDo] = useState<string>('');
  const debouncedNewToDo = useDebounce(setNewToDo);

  const isMounted = useRef(false);

  console.log('Parent (App) rerender');

  const getToDos = async () => {
    setIsLoading(true);
    try {
      const tasks = await delay(DEFAULT_TODO_LIST, 1000);
      setData(tasks);
      setMemoryData(tasks);
    } catch (error) {
      console.error(`Ошибка: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      console.log('isMounted сработал 2');
      isMounted.current = true;
      return;
    }

    const searchData = async () => {
      setIsLoading(true);

      const substr = await delay(debouncedSearch, 1000);
      setData(prev => prev?.filter(task => task.title.includes(substr)));

      if (memoryData && (substr === '' || substr === null)) {
        setData([...memoryData]);
      }

      setIsLoading(false);
      console.log('ПОИСК СРАБОТАЛ');
    };

    searchData();
    console.log('data: ', data);
    console.log('memoryData: ', memoryData);
  }, [debouncedSearch]);

  useEffect(() => {
    getToDos();
  }, []);

  useEffect(() => {
    console.log('dataChanged: ', data);
  }, [data]);

  const handleChange = (checked: boolean, index: number) => {
    console.log('isChecked: ', checked);
    setData(prev => {
      prev[index].isDone = checked;
      return [...prev];
    });
  };

  const listenChange = useCallback((checked: boolean, index: number) => {
    handleChange(checked, index);
  }, []);

  const handleDeleteItem = (id: number) => {
    setMemoryData(prev => prev?.filter(item => item.id !== id));
    setData(prev => prev?.filter(item => item.id !== id));
  };

  const listenDelete = useCallback((id: number) => {
    handleDeleteItem(id);
  }, []);

  return (
    <div>
      <input
        type="search"
        placeholder="search todo"
        onChange={e => setSearch(e.target.value)}
      />
      {isLoading && <p>Загрузка...</p>}
      {!isLoading && data && data.length > 0 && (
        <ul className={styles.toDoList}>
          {data?.map((toDo: ToDo, index: number) => {
            return (
              <SingleToDo
                id={toDo.id}
                title={toDo.title}
                isDone={toDo.isDone}
                index={index}
                toggleIsDone={listenChange}
                handleDeleteItem={listenDelete}
                key={toDo.id}
              />
            );
          })}
        </ul>
      )}
      {!isLoading && data && memoryData.length !== 0 && data.length === 0 && (
        <p>Ничего не найдено!</p>
      )}
      <div className={styles.addItemBlock}>
        <input
          type="text"
          placeholder="add todo"
          onChange={e => debouncedNewToDo(e.target.value)}
        />
        <button onClick={() => addItem(setData, setMemoryData, newToDo)}>
          Add
        </button>
      </div>
    </div>
  );
}

export default App;
