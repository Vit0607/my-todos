import { useEffect, useState } from 'react';
import ToDosList from './components/ToDosList/ToDosList';

function App() {
  const initialState = [
    { id: 1, title: 'todo_1', isDone: false },
    { id: 2, title: 'todo_2', isDone: false },
    { id: 3, title: 'todo_3', isDone: true },
    { id: 4, title: 'todo_4', isDone: false }
  ];

  type ToDoType = (typeof initialState)[0];

  const [toDos, setToDos] = useState<ToDoType[]>();
  const [isLoading, setIsLoading] = useState(false);

  const delay = (ms: number): Promise<ToDoType[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(initialState);
      }, ms);
    });
  };

  const getToDos = async () => {
    setIsLoading(true);
    try {
      const data = await delay(1000);
      console.log(typeof data);
      setToDos(data);
    } catch (error) {
      console.error(`Ошибка: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getToDos();
  }, []);

  const toggleIsDone = (id: number) => {
    setToDos(prev =>
      prev?.map(el =>
        el.id === id ? { ...el, isDone: !el.isDone } : { ...el }
      )
    );
  };

  return (
    <div>
      <input type="search" />
      {!isLoading && toDos ? (
        <ToDosList toDosArr={toDos} toggleIsDone={toggleIsDone} />
      ) : (
        <p>Загрузка...</p>
      )}
      <button>Добавить задачу</button>
    </div>
  );
}

export default App;
