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
