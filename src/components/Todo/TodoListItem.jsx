import { useDispatch, useSelector } from "react-redux";
import {
  selectTodoById,
  todoColorSelected,
  todoDeleted,
  todoToggled,
} from "./todosSlice";
import { availableColors, capitalize } from "./filters/colors";

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

  const colorOptions = availableColors.map((color) => (
    <option key={color} value={color}>
      {capitalize(color)}
    </option>
  ));

  return (
    <li>
      <div className="todoListItem">
        <div className="item_content" style={{ display: "flex", gap: "10px" }}>
          <input
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div>{text}</div>
        </div>
        <div>
          <select value={color} style={{ color }} onChange={handleColorChanged}>
            <option value=""></option>
            {colorOptions}
          </select>
        </div>
        <div>
          <button onClick={onDelete}>del</button>
        </div>
      </div>
    </li>
  );
};

export default TodoListItem;
