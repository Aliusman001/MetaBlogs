import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./reducer";
import blogReducer from "./blogReducer";

export default configureStore({
  reducer: {
    account: accountReducer,
    blog: blogReducer,
  },
});
