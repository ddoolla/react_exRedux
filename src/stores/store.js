import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../components/counterSlice.js"; // export default counterSlice.reducer;

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
