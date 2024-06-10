import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  loadMore: false,
  mode: "dark",
};
const blog = createSlice({
  name: "blog",
  initialState,
  reducers: {
    createBlogs(state, action) {
      state.blogs = [...state.blogs, ...action.payload];
    },
    loadMore(state, action) {
      state.loadMore = action.payload;
    },
    mode(state, action) {
      state.mode = action.payload;
    },
  },
});
export const { createBlogs, loadMore, mode } = blog.actions;
export default blog.reducer;
