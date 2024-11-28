import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  entities: {},
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded(state, action) {
      const todo = action.payload;
      state.entities[todo.id] = todo;
    },

    todoToggled(state, action) {
      const todoId = action.payload;
      const todo = state.entities[todoId];
      todo.completed = !todo.completed;
    },
    todoColorSelected: {
      reducer(state, action) {
        const { color, todoId } = action.payload;
        state.entities[todoId].color = color;
      },
      prepare(todoId, color) {
        return {
          payload: { todoId, color },
        };
      },
    },
    todoDeleted(state, action) {
      delete state.entities[action.payload];
    },
    allTodosCompleted(state, action) {
      Object.values(state.entities).forEach((todo) => {
        todo.completed = true;
      });
    },
    completedTodosCleared(state, action) {
      Object.values(state.entities).forEach((todo) => {
        if (todo.completed) {
          delete state.entities[todo.id];
        }
      });
    },
    todosLoading(state, action) {
      state.status = "loading";
    },
    todosLoaded(state, action) {
      const newEntities = {};
      action.payload.forEach((todo) => {
        newEntities[todo.id] = todo;
      });
      state.entities = newEntities;
      state.status = "idle";
    },
  },
});

export const {
  todoAdded,
  todoToggled,
  todoColorSelected,
  todoDeleted,
  allTodosCompleted,
  completedTodosCleared,
  todosLoading,
  todosLoaded,
} = todosSlice.actions;

export default todosSlice.reducer;
