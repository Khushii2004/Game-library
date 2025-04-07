import { configureStore } from '@reduxjs/toolkit';
import bookmarkReducer from "./bookMarkSlice"; // Correct path

// Creating the Redux store
const store = configureStore({
  reducer: {
        // I named this 'bookmarks' because it holds the list of favorited games
    bookmarks: bookmarkReducer, // Matches slice name
  },
});

export default store;