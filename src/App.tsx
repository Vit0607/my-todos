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
  const [isAddLoading, setIsAddLoading] = useState(false);

  const isMountedSearch = useRef(false);

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
    if (!isMountedSearch.current) {
      isMountedSearch.current = true;
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
    };

    searchData();
  }, [debouncedSearch]);

  useEffect(() => {
    getToDos();
  }, []);

  const handleChange = (checked: boolean, index: number) => {
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
                addLoading={isAddLoading}
              />
            );
          })}
        </ul>
      )}
      {isAddLoading && (
        <ul className={styles.isAddLoading}>
          <li>Загрузка новой задачи...</li>
        </ul>
      )}
      {!isLoading && data && memoryData.length !== 0 && data.length === 0 && (
        <p>Ничего не найдено!</p>
      )}
      <AddTask
        onChange={setNewTask}
        setData={setData}
        setMemoryData={setMemoryData}
        setIsAddLoading={setIsAddLoading}
        debouncedNewTask={debouncedNewTask}
      />
    </div>
  );
}

export default App;
