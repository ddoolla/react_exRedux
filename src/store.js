import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./components/Counter/counterSlice";

/* 
  * Redux 스토어 인스턴스 생성
    - Redux 저장소: Redux Tookit 의 configureStore 의 함수를 사용하여 생성
    - 인수로 reducer 를 전달
*/

/*  
  * Redux Store
    - 앱의 모든 상태를 Redux 스토어에 넣어야하는 것은 아니다. 
      앱 전체에 필요한 글로벌 상태만 넣으면 되고, (글로벌 상태)
      한 컴포넌트에서만 사용하는 상태는 해당 컴포넌트에서 관리한다. (로컬 상태)
*/

export default configureStore({
  reducer: {
    counter: counterReducer,
    // counter - 슬라이스
    // counterReducer - 슬라이스를 업데이트하는 역할 (슬라이스 리듀서 함수)
  },
});
