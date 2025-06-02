import axiosInstance from "../utils/_axios";

const prefix = "users";

// 포켓몬 목록 가져오기
export const fetchMyPokemons = async () => {
  try {
    const { data } = await axiosInstance.get(`/${prefix}/pokemons`);
    console.log("포켓몬 목록:", data);
    return data;
  } catch (error) {
    console.error("포켓몬 목록 가져오기 실패:", error);
    throw error;
  }
};

// 파트너 포켓몬 설정
export const setPartnerPokemon = async (pokemonId) => {
  try {
    const { data } = await axiosInstance.patch(
      `/${prefix}/partners/${pokemonId}`
    );
    return data;
  } catch (error) {
    console.error("파트너 설정 실패:", error);
    throw error;
  }
};

// 유저가 소지한 몬스터볼 목록 불러오기
export const fetchMyPokeBalls = async () => {
  try {
    const { data } = await axiosInstance.get(`/${prefix}/balls`);
    console.log("몬스터볼 목록:", data);
    return data;
  } catch (error) {
    console.error("몬스터볼 불러오기 실패:", error);
    throw error;
  }
};

// 몬스터볼을 사용하여 뽑기
export const openPokemonByBall = async (ballId) => {
  try {
    const { data } = await axiosInstance.post(
      `/${prefix}/balls/${ballId}/open`
    );
    console.log("포켓몬 뽑기 결과:", data);
    return data;
  } catch (error) {
    console.error("포켓몬 뽑기 실패:", error);
    throw error;
  }
};

// TODO 내 정보 API 완성 후 수정
export async function getMyData() {
  try {
    const {
      data: { result },
    } = await axiosInstance.get(`${prefix}/info`);
    console.log("내 정보:", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// import axios from "axios";

// // 포켓몬 목록 가져오기
// export const fetchMyPokemons = async () => {
//   try {
//     const response = await axios.get(
//       "http://43.201.162.24:8080/users/pokemons"
//     );
//     return response.data;
//   } catch (error) {
//     console.error("포켓몬 목록 가져오기 실패:", error);
//     throw error;
//   }
// };

// // 파트너 포켓몬 설정
// export const setPartnerPokemon = async (pokemonId) => {
//   try {
//     const response = await axios.patch(
//       `http://43.201.162.24:8080/users/partners/${pokemonId}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("파트너 설정 실패:", error);
//     throw error;
//   }
// };

// // 유저가 소지한 몬스터볼 목록 불러오기
// export const fetchMyPokeBalls = async () => {
//   try {
//     const response = await axios.get("http://43.201.162.24:8080//users/balls");
//     return response.data;
//   } catch (error) {
//     console.error("몬스터볼 불러오기 실패:", error);
//     throw error;
//   }
// };

// // 몬스터볼을 사용하여 뽑기
// export const openPokemonByBall = async (ballId) => {
//   try {
//     const response = await axios.post(
//       `http://43.201.162.24:8080/users/balls/{id}/open${ballId}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("포켓몬 뽑기 실패:", error);
//     throw error;
//   }
// };
