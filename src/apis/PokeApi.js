import axios from "axios";

// 포켓몬 목록 가져오기
export const fetchMyPokemons = async () => {
  try {
    const response = await axios.get(
      "http://43.201.162.24:8080/users/pokemons"
    );
    return response.data;
  } catch (error) {
    console.error("포켓몬 목록 가져오기 실패:", error);
    throw error;
  }
};

// 파트너 포켓몬 설정
export const setPartnerPokemon = async (pokemonId) => {
  try {
    const response = await axios.patch(
      `http://43.201.162.24:8080/users/partners/${pokemonId}`
    );
    return response.data;
  } catch (error) {
    console.error("파트너 설정 실패:", error);
    throw error;
  }
};
