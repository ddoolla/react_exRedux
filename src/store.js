import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./components/Counter/counterSlice";
import todosReducer from "./components/Todo/todosSlice";

// 스토어 생성
export default configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
  },
});
