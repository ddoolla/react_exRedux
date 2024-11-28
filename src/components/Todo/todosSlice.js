import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: [],
  status: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded(state, action) {
      state.entities.push(action.payload);
    },

    todoToggled(state, action) {
      const todo = state.entities.find((todo) => todo.id === action.payload);
      todo.completed = !todo.completed;
    },
    todoLoading(state, action) {
      return {
        ...state,
        status: "loading",
      };
    },
  },
});

export const { todoAdded, todoToggled, todoLoading } = todosSlice.actions;

export default todosSlice.reducer;

/* 
    todoAdded 를 보면 push() 를 사용해서 배열 요소를 추가하고있다.
    
    Redux 를 사용하지 않으면 스프레드 연산자를 이용해서 기존 배열을 복사하면서
    추가해야한다.

    Redux 는 Immer 라이브러리를 사용하여 모든 변경사항을 추적 후 변경 사항 목록을 사용하여
    업데이트된 불변 값을 반환한다

*/
