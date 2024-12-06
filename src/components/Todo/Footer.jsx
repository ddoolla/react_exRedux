import { useDispatch, useSelector } from "react-redux";
import { availableColors, capitalize } from "./filters/colors";
import {
  colorFilterChanged,
  statusFilterChanged,
  StatusFilters,
} from "./filters/filtersSlice";
import {
  allTodosCompleted,
  completedTodosCleared,
  selectTodos,
} from "./todosSlice";

// 남은 Todo의 개수를 나타내는 컴포넌트
const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? "" : "s";

  return (
    <div>
      <h5>Remaing Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  );
};

// Todo 목록을 상태에 따라 필터링하는 컴포넌트
const StatusFilter = ({ value: status, onChange }) => {
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key];
    const handleClick = () => onChange(value);
    const className = value === status ? "selected" : "";

    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    );
  });

  return (
    <div className="statusFilter">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  );
};

// Todo 목록을 색깔에 따라 필터링하는 컴포넌트
const ColorFilters = ({ value: colors, onChange }) => {
  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color);
    const handleChange = () => {
      const changeType = checked ? "removed" : "added";
      onChange(color, changeType);
    };

    return (
      <label key={color}>
        <input
          type="checkbox"
          name={color}
          checked={checked}
          onChange={handleChange}
        />
        {capitalize(color)}
      </label>
    );
  });

  return (
    <div className="colorFilters">
      <h5>Filter by color</h5>
      <form>{renderedColors}</form>
    </div>
  );
};

const Footer = () => {
  const dispatch = useDispatch();

  // 남은 todo 의 개수 (완료되지 않은 todo)
  const todosRemaining = useSelector((state) => {
    const uncompletedTodos = selectTodos(state).filter(
      (todo) => !todo.completed
    );
    return uncompletedTodos.length;
  });

  // 필터 상태의 필드 가져오기
  const { status, colors } = useSelector((state) => state.filters);

  const onMarkCompletedClicked = () => dispatch(allTodosCompleted());
  const onClearCompletedClicked = () => dispatch(completedTodosCleared());

  const onClolorChange = (color, changeType) =>
    dispatch(colorFilterChanged(color, changeType));

  const onStatusChange = (status) => dispatch(statusFilterChanged(status));

  return (
    <footer>
      <div className="actions_section">
        <h5>Actions</h5>
        <button onClick={onMarkCompletedClicked}>Mark All Completed</button>
        <button onClick={onClearCompletedClicked}>Clear Completed</button>
      </div>

      <RemainingTodos count={todosRemaining} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onClolorChange} />
    </footer>
  );
};

export default Footer;
