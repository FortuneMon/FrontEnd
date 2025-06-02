import { createSlice } from "@reduxjs/toolkit";
import _axios from "../../utils/_axios";
import {
  fetchMyRoutines,
  fetchMyInfo,
  addMyRoutine,
  deleteMyRoutine,
  patchMyRoutineStatus,
} from "../thunks/user";

/**
 * me: {nickname, partner}
 */
const initialState = {
  me: null,
  myRoutines: [],
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
    builder.addCase(fetchMyInfo.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(fetchMyInfo.rejected, (state, action) => {
      state.me = null;
    });
    builder.addCase(fetchMyRoutines.fulfilled, (state, action) => {
      state.myRoutines = action.payload;
    });
    builder.addCase(addMyRoutine.fulfilled, (state, action) => {
      const routineName = action.payload.routineName;
      const routineId = action.meta.arg;
      state.myRoutines = [...state.myRoutines, { routineId, name: routineName, isCompeleted: false }];
      console.log("addMyRoutine Result:", state.myRoutines);
    });
    builder.addCase(deleteMyRoutine.fulfilled, (state, action) => {
      const routineId = action.meta.arg;
      state.myRoutines = state.myRoutines.filter((r) => r.routineId !== routineId);
      console.log("deleteMyRoutine Result:", state.myRoutines);
    });
    builder.addCase(patchMyRoutineStatus.fulfilled, (state, action) => {
      const routineId = action.meta.arg;
      const targetRoutine = state.myRoutines.find((r) => r.routineId === routineId);
      state.myRoutines = [
        ...state.myRoutines,
        { ...targetRoutine, isCompeleted: action.payload.isCompeleted },
      ];
      console.log("patchMyRoutineStatus Result:", state.myRoutines);
    });
  },
});

export const selectMyInfo = (state) => state.user?.me;
export const selectMyRoutines = (state) => state.user?.myRoutines;
export const selectIsLoggedIn = (state) => (state.user?.me ? true : false);

const { actions, reducer } = userSlice;

export const { setMyInfo, logout } = actions;

export default reducer;
