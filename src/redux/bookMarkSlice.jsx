import { createSlice } from '@reduxjs/toolkit';

// This slice will handle the user's bookmarked games (aka favorites)
const initialState = {
  bookmarks: [],
};

const bookmarkSlice = createSlice({
  name: 'bookmarks', // Pluralized for clarity
  initialState,
  reducers: {
        // Add a game to the bookmarks list
    addBookmark: (state, action) => {
      const game = action.payload;
      const exists = state.bookmarks.some((g) => g.id === game.id);
      if (!exists) {
                // Adding a timestamp just in case I want to show when it was saved
        state.bookmarks.push({ ...game, addedAt: Date.now() }); // Add timestamp for uniqueness
      }
    },

        // Remove a game from the bookmarks list using its ID
    removeBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter((game) => game.id !== action.payload);
    },
  },
});

// Future idea: sync this with localStorage so it doesn't reset on refresh

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;