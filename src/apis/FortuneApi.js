import axiosInstance from "../utils/_axios";

/**
 * 오늘의 운세를 조회합니다 (GET 요청)
 * @returns {Promise<{category: string; content: string; date: string}[]>}
 */
export const getTodayFortune = async () => {
  try {
    const {
      data: { result },
    } = await axiosInstance.get("/users/fortune");
    return result;
  } catch (error) {
    console.error("운세 조회 실패:", error);
    throw error;
  }
};

/**
 * 오늘의 운세를 새로 뽑습니다
 * @returns {Promise<{category: string; content: string; date: string}[]>}
 */
export const drawTodayFortune = async () => {
  try {
    const {
      data: { result },
    } = await axiosInstance.post("/fortunes");
    return result;
  } catch (error) {
    console.error("운세 뽑기 실패:", error);
    throw error;
  }
};
