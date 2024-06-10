import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authorized: false,
  user: {},
  host: "http://127.0.0.1:3000",
};

const account = createSlice({
  name: "account",
  initialState,
  reducers: {
    login(state, action) {
      state.authorized = true;
      state.user = action.payload;
    },
  },
});

export const { login } = account.actions;

export default account.reducer;
