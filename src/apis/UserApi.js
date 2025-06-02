import axiosInstance from "../utils/_axios";

const prefix = "users";

/**
 * @param {{loginId: string; password: string}} params
 * @returns {{accessToken: string;}}
 */
export async function login(params) {
  try {
    const {
      data: { result },
    } = await axiosInstance.post(`${prefix}/signin`, params);
    const accessToken = result.accessToken;
    const refreshToken = result.refreshToken;
    localStorage.setItem("accessToken", accessToken);
    // refresh 저장
    localStorage.setItem("refreshToken", refreshToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @param {{loginId: string; password: string; nickname: string}} params
 *
 */
export async function signup(params) {
  try {
    await axiosInstance.post(`${prefix}/signup`, params);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// TODO 내 정보 API 완성 후 수정
export async function getMyInfo() {
  try {
    const {
      data: { result },
    } = await axiosInstance.get(`${prefix}/me`);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// TODO 중복체크 API 완성 후 수정
export async function checkId(params) {
  try {
    const { data } = await axiosInstance.post(`${prefix}/id`, params);
    console.log("data", data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function checkNickname(params) {
  try {
    const { data } = await axiosInstance.post(`${prefix}/nickname`, params);
    console.log("data", data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
