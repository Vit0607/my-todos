import { useEffect, useState } from 'react';
import ToDosList from './components/ToDosList/ToDosList';
import { ToDo } from './types/toDo';
import InputForm from './components/InputForm/InputForm';

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
  const [memoryData, setMemoryData] = useState<ToDoType[] | null>();

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
    setMemoryData([...data]);
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

  const addItem = (item: object) => {
    setData(prev => [
      ...prev,
      {
        id: prev.length > 0 ? Math.max(...prev.map(i => i.id)) + 1 : 1,
        title: Object.values(item)[0],
        isDone: false
      }
    ]);
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
      {!isLoading && data.length > 0 && (
        <ToDosList
          toDosArr={data}
          toggleIsDone={toggleIsDone}
          onDeleted={handleDeleteItem}
        />
      )}
      {!isLoading && data.length === 0 && <p>Ничего не найдено!</p>}
      <InputForm
        onSubmit={addItem}
        placeholderText="add todo"
        typeText="text"
        buttonText="Add"
      />
    </div>
  );
}

export default App;
