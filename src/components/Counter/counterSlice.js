import { createSlice } from "@reduxjs/toolkit";

// 슬라이스 정의
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      console.log("increment called");
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },

    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// 액션 생성자 함수
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// thunk 함수
export const incrementAsync = (amount) => {
  console.log("incrementAsync thunk called");
  return (dispatch) => {
    setTimeout(() => {
      dispatch(incrementByAmount(amount));
    }, 1000);
  };
};

// 선택자 함수
export const selectCount = (state) => state.counter.value;

// 슬라이스의 리듀서 반환
export default counterSlice.reducer;
