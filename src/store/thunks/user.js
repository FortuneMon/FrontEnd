import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/_axios";

const prefix = "/users";

export const getMyInfo = createAsyncThunk(`${prefix}/me`, async () => {
  const {
    data: { result },
  } = await axiosInstance.get(`${prefix}/me`);
  if (!result) {
    return;
  }
  return result;
});
