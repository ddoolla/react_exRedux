import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../components/counterSlice.js"; // export default counterSlice.reducer;

/* 
  * Redux 스토어 인스턴스 생성
    - Redux 저장소: Redux Tookit 의 configureStore 의 함수를 사용하여 생성
    - 인수로 reducer 를 전달
*/
export default configureStore({
  reducer: {
    counter: counterReducer,
    // counter - 슬라이스
    // counterReducer - 슬라이스를 업데이트하는 역할 (슬라이스 리듀서 함수)
  },
});
