import dayjs from "dayjs";
import axiosInstance from "../utils/_axios";

const prefix = "users";

/**
 * @param
 * @returns {Promise<{id: number; name: string; isCompleted: boolean}[]>}
 */
export async function fetchMyRoutines() {
  try {
    const {
      data: {
        result: { routines },
      },
    } = await axiosInstance.get(`${prefix}/routine`);
    return routines;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @param {string} category
 * @returns {Promise<{id: number; name: string; selected: boolean }[]>}
 */
export async function fetchAllRoutinesByCategory(category) {
  try {
    const {
      data: { result },
    } = await axiosInstance.get(`routines?category=${category}`);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @param {number} year
 * @param {number} month
 * @returns {Promise<{routineId: number; routineName: string; daysStatistics: {}}[]>}
 */
export async function fetchMyStatistics(year, month) {
  try {
    const date = dayjs(new Date(year, month - 1)).format("YYYY-MM-DD");
    const {
      data: {
        result: { statistics },
      },
    } = await axiosInstance.get(`${prefix}/routines/${date}/statistics`);
    return statistics;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
