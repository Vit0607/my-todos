import { addItem } from '../../utils/addItem';
import { TodosUpdater } from '../../types/todo';

interface AddTaskProps {
  onChange: (value: string) => void;
  setData: TodosUpdater;
  setMemoryData: TodosUpdater;
  debouncedNewTask: string;
}

const AddTask = ({
  onChange,
  setData,
  setMemoryData,
  debouncedNewTask
}: AddTaskProps) => {
  return (
    <div className="addTask">
      <input
        type="text"
        placeholder="Add todo"
        onChange={e => onChange(e.target.value)}
      />
      <button onClick={() => addItem(setData, setMemoryData, debouncedNewTask)}>
        Add
      </button>
    </div>
  );
};

export default AddTask;
