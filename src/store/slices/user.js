import { createSlice } from "@reduxjs/toolkit";
import _axios from "../../utils/_axios";

const initialState = {
  me: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMyInfo: (state, action) => {
      state.me = action.payload;
    },
    logout: (state) => {
      state.me = null;
      localStorage.removeItem("accessToken");
      delete _axios.defaults.headers.common.Authorization;
    },
  },
});

export const selectMe = (state) => state.user?.me;

const { actions, reducer } = userSlice;

export const { setMyInfo, logout } = actions;

export default reducer;
