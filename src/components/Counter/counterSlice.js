import { createSlice, isAction } from "@reduxjs/toolkit";

// 카운터 기능에 대한 Redux 로직
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1; // 상태 변경
    },
    decrement: (state) => {
      state.value -= 1; // 상태 변경
    },
    // action 객체의 payload 파라미터 값으로 state 변경
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

/*  
  * thunk 함수
    - 비동기 로직을 포함할 수 있는 Redux 함수
    - 인수: 입력 데이터
    - 반환 값: 함수 (인수: dispatch, getState)
*/

// thunk 함수를 생성하고 반환하는 외부 생성자 함수
export const incrementAsync = (amount) => {
  // 내부 thunk 함수
  return (dispatch) => {
    setTimeout(() => {
      dispatch(incrementByAmount(amount));
    }, 1000);
  };
};

// store.js 에 정의된 counter 슬라스의 상태 값을 정의 ?
export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
