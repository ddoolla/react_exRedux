import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./components/Counter/counterSlice";
import todosReducer from "./components/Todo/todosSlice";
import { print1 } from "./exampleAddons/middleware";
import { sayHiOnDispatch } from "./exampleAddons/enhancers";

const middleware = [print1];

// 스토어 생성
export default configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return [...getDefaultMiddleware(), ...middleware];
  },
  enhancers: (defaultEnhancers) => {
    return [...defaultEnhancers(), sayHiOnDispatch];
  },
});
