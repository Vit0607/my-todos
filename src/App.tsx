import { useEffect, useState } from 'react';
import ToDosList from './components/ToDosList/ToDosList';
import { ToDo } from './types/toDo';
import AddForm from './components/AddForm/AddForm';

function App() {
  const initialState = [
    { id: 1, title: 'todo_1', isDone: false },
    { id: 2, title: 'todo_2', isDone: false },
    { id: 3, title: 'todo_3', isDone: true },
    { id: 4, title: 'todo_4', isDone: false }
  ];

  type ToDoType = (typeof initialState)[0];

  const [data, setData] = useState<ToDoType[]>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const delay = (ms: number): Promise<ToDo[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(initialState);
      }, ms);
    });
  };

  const getToDos = async () => {
    setIsLoading(true);
    try {
      const tasks = await delay(1000);
      setData(tasks);
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
    setData(prev =>
      prev?.map(el =>
        el.id === id ? { ...el, isDone: !el.isDone } : { ...el }
      )
    );
  };

  const handleDeleteItem = (id: number) => {
    setData(prev => prev?.filter(item => item.id != id));
  };

  const addItem = (item: object) => {
    setData(prev => [
      ...prev,
      {
        id: Math.max(...prev.map(i => i.id)) + 1,
        title: Object.values(item)[0],
        isDone: false
      }
    ]);
  };

  return (
    <div>
      <div>
        <input type="search" placeholder="search todo" />
        <button>Search</button>
      </div>
      {!isLoading && data ? (
        <ToDosList
          toDosArr={data}
          toggleIsDone={toggleIsDone}
          onDeleted={handleDeleteItem}
        />
      ) : (
        <p>Загрузка...</p>
      )}
      <AddForm onSubmit={addItem} />
    </div>
  );
}

export default App;
