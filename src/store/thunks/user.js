import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/_axios";

const prefix = "/users";

export const fetchMyInfo = createAsyncThunk("fetchMyInfo", async () => {
  const {
    data: { result },
  } = await axiosInstance.get(`${prefix}/info`);
  return result;
});

export const fetchMyRoutines = createAsyncThunk("fetchMyRoutines", async () => {
  const {
    data: {
      result: { routines },
    },
  } = await axiosInstance.get(`${prefix}/routine`);
  return routines;
});

/**
 * @param {id: number} routineId
 * @returns
 */
export const addMyRoutine = createAsyncThunk("addMyRoutine", async (routineId) => {
  const {
    data: { result },
  } = await axiosInstance.post(`${prefix}/routines/${routineId}`);
  return result;
});

/**
 * @param {id: number} routineId
 * @returns
 */
export const deleteMyRoutine = createAsyncThunk("deleteMyRoutine", async (routineId) => {
  const {
    data: { result },
  } = await axiosInstance.delete(`${prefix}/routines/${routineId}`);
  return result;
});

/**
 * @param {id: number} routineId
 * @returns
 */
export const patchMyRoutineStatus = createAsyncThunk("patchMyRoutineStatus", async (routineId) => {
  const {
    data: { result },
  } = await axiosInstance.patch(`${prefix}/routines/${routineId}/status`);
  return result;
});
