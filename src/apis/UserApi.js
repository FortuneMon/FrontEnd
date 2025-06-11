import axiosInstance from "../utils/_axios";

const prefix = "users";

/**
 * @param {{loginId: string; password: string}} params
 * @returns {Promise<{accessToken: string; refreshToken: string}>}
 */
export async function login(params) {
  try {
    const {
      data: { result },
    } = await axiosInstance.post(`${prefix}/signin`, params);
    const accessToken = result.accessToken;
    const refreshToken = result.refreshToken;
    localStorage.setItem("accessToken", accessToken);
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

/**
 * @return {Promise<{nickName: string; pokemonId: number | null; pokemonName: string | null; url: string | null}>}
 *
 */
export async function fetchMyInfo() {
  try {
    const {
      data: { result },
    } = await axiosInstance.get(`${prefix}/info`);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @param {string} loginId
 * @returns {Promise<{message: string; _confirmed: boolean}>}
 */
export async function checkId(loginId) {
  try {
    const {
      data: { result },
    } = await axiosInstance.get(`${prefix}/check-login-id?loginId=${loginId}`);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @param {string} nickname
 * @returns {Promise<{message: string; _confirmed: boolean}>}
 */
export async function checkNickname(nickname) {
  try {
    const {
      data: { result },
    } = await axiosInstance.get(`${prefix}/check-nickname?nickname=${nickname}`);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
