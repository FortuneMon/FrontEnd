// apis/Fortune.js
import axiosInstance from "../utils/_axios";
import axios from "axios";

/**
 * 오늘의 운세를 조회합니다 (GET 요청)
 * @returns {Promise<{fortune: string}>}
 */

export const getTodayFortune = async () => {
  try {
    const { data } = await axiosInstance.get("/users/fortune"); // 엔드포인트 확인 필요
    return data.result;
  } catch (error) {
    console.error("운세 조회 실패:", error);
    throw error;
  }
};

/**
 * 오늘의 운세를 새로 뽑습니다
 * @returns {Promise<{fortune: string}>}
 */
export const drawTodayFortune = async (love, health, wealth) => {
  try {
    const { data } = await axiosInstance.post("/fortunes", {
      love: love,
      health: health,
      wealth: wealth,
    });
    console.log("오늘의 운세 뽑기 결과:", data);
    return data;
  } catch (error) {
    console.error("운세 뽑기 실패:", error);
    throw error;
  }
};
