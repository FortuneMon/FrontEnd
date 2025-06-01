import { createSlice } from "@reduxjs/toolkit";
import _axios from "../../utils/_axios";
import { getMyInfo } from "../thunks/user";

/**
 * me: {nickname, partner}
 */
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
  extraReducers: (builder) => {
    builder.addCase(getMyInfo.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(getMyInfo.rejected, (state, action) => {
      state.me = null;
    });
  },
});

export const selectMyInfo = (state) => state.user?.me;
export const selectIsLoggedIn = (state) => (state.user?.me ? true : false);

const { actions, reducer } = userSlice;

export const { setMyInfo, logout } = actions;

export default reducer;
