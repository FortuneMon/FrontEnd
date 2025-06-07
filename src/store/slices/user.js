import { createSlice } from "@reduxjs/toolkit";
import _axios from "../../utils/_axios";
import {
  fetchMyRoutines,
  fetchMyInfo,
  addMyRoutine,
  deleteMyRoutine,
  patchMyRoutineStatus,
  setPartnerPokemon,
} from "../thunks/user";

/**
 * me: {nickName, pokemonId, pokemonName, url}
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
      localStorage.removeItem("refreshToken");
      delete _axios.defaults.headers.common.Authorization;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMyInfo.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(fetchMyInfo.rejected, (state, action) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      delete _axios.defaults.headers.common.Authorization;
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
      const result = action.payload;
      state.myRoutines = state.myRoutines.map((r) =>
        r.routineId === routineId ? { ...r, isCompleted: result.isCompleted } : r
      );
      console.log("patchMyRoutineStatus Result:", state.myRoutines);
    });
    builder.addCase(setPartnerPokemon.fulfilled, (state, action) => {
      const { id, name, url } = action.payload;
      state.me = { ...state.me, pokemonId: id, pokemonName: name, url };
    });
  },
});

export const selectMyInfo = (state) => state.user?.me;
export const selectMyRoutines = (state) => state.user?.myRoutines;
export const selectIsLoggedIn = (state) => (state.user?.me ? true : false);
export const selectMyPartnerPokemon = (state) =>
  state.user?.me?.pokemonId
    ? { id: state.user?.me.pokemonId, name: state.user?.me.pokemonName, url: state.user?.me.url }
    : null;

const { actions, reducer } = userSlice;

export const { setMyInfo, logout } = actions;

export default reducer;
