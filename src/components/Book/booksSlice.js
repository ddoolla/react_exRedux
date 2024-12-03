import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const booksAdapter = createEntityAdapter({
  // default: entity => entity.id
  selectId: (book) => book.bookId,
  // 제공하지 않으면 순서에 대한 보장 없음?
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const booksSlice = createSlice({
  name: "books",
  initialState: booksAdapter.getInitialState({
    loading: "idle",
  }),
  reducers: {
    bookAdded: booksAdapter.addOne,
    booksReceived(state, action) {
      booksAdapter.setAll(state, action.payload.books);
    },
  },
});
