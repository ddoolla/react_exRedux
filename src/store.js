import { configureStore, Tuple } from "@reduxjs/toolkit";
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
  // 사용자정의 미들웨어 추가
  middleware: (getDefaultMiddleware) => {
    return [...getDefaultMiddleware(), ...middleware];
  },
  // 사용자정의 확장기 추가
  enhancers: (defaultEnhancers) => {
    return [...defaultEnhancers(), sayHiOnDispatch];
  },
});
