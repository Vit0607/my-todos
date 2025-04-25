import { useEffect, useRef, useState } from 'react';
import { ToDo } from './types/toDo';
import InputForm from './components/InputForm/InputForm';
import { delay } from './utils/delay';
import { initialState } from './constants/initialState';
import SingleToDo from './components/SingleToDo/SingleToDo';
import styles from './App.module.scss';
import { handleInput } from './utils/handleInput';
import { addItem } from './utils/addItem';

function App() {
  const [data, setData] = useState<ToDo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [memoryData, setMemoryData] = useState<ToDo[]>([]);
  const [addValue, setAddValue] = useState<string>('');
  const addRef = useRef<HTMLInputElement>(null);

  const getToDos = async () => {
    setIsLoading(true);
    try {
      const tasks = await delay(initialState, 1000);
      setData(tasks);
      setMemoryData(tasks);
    } catch (error) {
      console.error(`Ошибка: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getToDos();
  }, []);

  useEffect(() => {
    console.log('data: ', data);
    console.log('memoryData: ', memoryData);
  }, [data, memoryData]);

  const toggleIsDone = (id: number) => {
    setData(prev =>
      prev?.map(el =>
        el.id === id ? { ...el, isDone: !el.isDone } : { ...el }
      )
    );
  };

  const handleDeleteItem = (id: number) => {
    setMemoryData(prev => prev?.filter(item => item.id !== id));
    setData(prev => prev?.filter(item => item.id !== id));
  };

  const searchItem = (item: object) => {
    setData(prev =>
      prev?.filter(task => task.title.includes(Object.values(item)[0]))
    );
    if (
      memoryData &&
      (Object.values(item)[0] === '' || Object.values(item)[0] === null)
    ) {
      setData([...memoryData]);
    }
  };

  return (
    <div>
      <InputForm
        onSubmit={searchItem}
        placeholderText="search todo"
        typeText="search"
        buttonText="Search"
      />
      {isLoading && <p>Загрузка...</p>}
      {!isLoading && data && data.length > 0 && (
        <ul className={styles.toDoList}>
          {data?.map((toDo: ToDo) => {
            return (
              <SingleToDo
                el={toDo}
                toggle={toggleIsDone}
                deleteToDo={handleDeleteItem}
                key={toDo.id}
              />
            );
          })}
        </ul>
      )}
      {!isLoading && data && data.length === 0 && <p>Ничего не найдено!</p>}
      {/* <InputForm
        onSubmit={addItem}
        placeholderText="add todo"
        typeText="text"
        buttonText="Add"
      /> */}
      <input
        type="text"
        placeholder="add todo"
        value={addValue}
        ref={addRef}
        onChange={handleInput(setAddValue)}
      />
      <button onClick={() => addItem(setData, setMemoryData, addRef)}>
        Add
      </button>
    </div>
  );
}

export default App;
