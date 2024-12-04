import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./components/Counter/counterSlice";
import todosReducer from "./components/Todo/todosSlice";
import { print1, print2, print3 } from "./exampleAddons/middleware";
import {
  sayHiOnDispatch,
  includeMeaningOfLife,
} from "./exampleAddons/enhancers";

const customMiddleware = [print1, print2, print3];
const customEnhancers = [sayHiOnDispatch, includeMeaningOfLife];

// 스토어 생성
export default configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
  },
  // 사용자정의 미들웨어 추가
  middleware: (getDefaultMiddleware) => {
    return [...getDefaultMiddleware(), ...customMiddleware];
  },
  // 사용자정의 확장기 추가
  enhancers: (defaultEnhancers) => {
    return [...defaultEnhancers(), ...customEnhancers];
  },
});
