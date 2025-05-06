import { useEffect, useState, useCallback, useRef } from 'react';
import { Todo } from './types/todo';
import { delay } from './utils/delay';
import { DEFAULT_TODO_LIST } from './mocks/defaultTodoList';
import SingleToDo from './components/SingleToDo/SingleToDo';
import styles from './App.module.scss';
import { useDebounce } from './hooks/useDebounce.hook';
import SearchBar from './components/SearchBar/SearchBar';
import AddTask from './components/AddTask/AddTask';

function App() {
  const [data, setData] = useState<Todo[]>([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [isLoading, setIsLoading] = useState(false);
  const [memoryData, setMemoryData] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const debouncedNewTask = useDebounce(newTask);

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
      <SearchBar onChange={setSearch} />
      {isLoading && <p>Загрузка...</p>}
      {!isLoading && data && data.length > 0 && (
        <ul className={styles.toDoList}>
          {data?.map((toDo: Todo, index: number) => {
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
      {/* <div className={styles.addItemBlock}>
        <input
          type="text"
          placeholder="add todo"
          onChange={e => setNewTask(e.target.value)}
        />
        <button
          onClick={() => addItem(setData, setMemoryData, debouncedNewTask)}
        >
          Add
        </button>
      </div> */}
      <AddTask
        onChange={setNewTask}
        setData={setData}
        setMemoryData={setMemoryData}
        debouncedNewTask={debouncedNewTask}
      />
    </div>
  );
}

export default App;
