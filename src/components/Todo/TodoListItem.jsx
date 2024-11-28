import { useDispatch, useSelector } from "react-redux";
import {
  selectTodoById,
  todoColorSelected,
  todoDeleted,
  todoToggled,
} from "./todosSlice";

const TodoListItem = ({ id }) => {
  const todo = useSelector((state) => selectTodoById(state, id));
  const { text, completed, color } = todo;

  const dispatch = useDispatch();

  const handleCompletedChanged = () => {
    dispatch(todoToggled(todo.id));
  };

  const handleColorChanged = (e) => {
    const color = e.target.value;
    dispatch(todoColorSelected(todo.id, color));
  };

  const onDelete = () => {
    dispatch(todoDeleted(todo.id));
  };

  return (
    <li>
      <div>
        <div>
          <input
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div>{text}</div>
        </div>
        <div>
          <button onClick={onDelete}>del</button>
        </div>
      </div>
    </li>
  );
};

export default TodoListItem;
