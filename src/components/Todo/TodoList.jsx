import { useSelector } from "react-redux";
import {
  selectFilteredTodoIds,
  selectTodoIds,
  selectTodos,
} from "./todosSlice";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds);
  const loadingStatus = useSelector((state) => state.todos.status);

  if (loadingStatus === "loading") {
    return <div>loading...</div>;
  }

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />;
  });

  return <ul>{renderedListItems}</ul>;
};

export default TodoList;
