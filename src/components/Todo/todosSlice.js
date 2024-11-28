import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  entities: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded(state, action) {
      const { id, text } = action.payload;
      state.entities.push({
        id,
        text,
        completed: false,
        color: "",
      });
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
      state.entities = state.entities.filter(
        (todo) => todo.id !== action.payload
      );
    },
    allTodosCompleted(state, action) {
      Object.values(state.entities).forEach((todo) => {
        // Object.values => 객체 속성 값들을 배열로 변환
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
      const newEntities = [];
      action.payload.forEach((todo) => {
        newEntities.push(todo);
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

// thunk function
export const fetchTodos = () => (dispatch) => {
  dispatch(todosLoading());
  const fetchedTodos = localStorage.getItem("todos");

  if (!fetchedTodos) {
    dispatch(todosLoaded([]));
    return;
  }

  const parsedTodos = JSON.parse(fetchedTodos);
  dispatch(todosLoaded(parsedTodos.entities));
};

export const saveNewTodo = ({ id, text }) => {
  return (dispatch, getState) => {
    const initialData = { id, text };
    dispatch(todoAdded(initialData));
    localStorage.setItem("todos", JSON.stringify(getState().todos));
  };
};

const selectTodoEntities = (state) => state.todos.entities;

export const selectTodos = createSelector(selectTodoEntities, (entities) => {
  return Object.values(entities);
});

export const selectTodoById = (state, todoId) => {
  return selectTodoEntities(state)[todoId];
};

export const selectTodoIds = createSelector(selectTodos, (todos) =>
  todos.map((todo) => todo.id)
);
