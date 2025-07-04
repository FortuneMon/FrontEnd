import { useEffect, useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import Title from "../components/layouts/Title";
import styled from "styled-components";
import { toast } from "react-toastify";
import { fetchMyPokemons } from "../apis/PokeApi";
import PokemonCardItem from "../components/pokemon/PokemonCardItem";
import { useDispatch, useSelector } from "react-redux";
import { setPartnerPokemon } from "../store/thunks/user";
import { selectMyPartnerPokemon } from "../store/slices/user";

const myPokemonListDemo = [
  {
    id: 1,
    name: "피카츄",
    image: "/img/Logo.png",
    type: ["전기", "강철"],
    group: "전기쥐포켓몬",
    owned: true,
  },
  {
    id: 2,
    name: "파이리",
    image: "/img/파이리.png",
    type: ["불꽃", "비행"],
    group: "도마뱀포켓몬",
    owned: true,
  },
  {
    id: 3,
    name: "꼬부기",
    image: "/img/꼬부기.png",
    type: ["물", "얼음"],
    group: "거북포켓몬",
    owned: false,
  },
  {
    id: 4,
    name: "이상해씨",
    image: "/img/이상해씨.png",
    type: ["풀", "독"],
    group: "풀포켓몬",
    owned: false,
  },
  {
    id: 5,
    name: "버터플",
    image: "/img/버터플.png",
    type: ["벌레", "비행"],
    group: "나비포켓몬",
    owned: false,
  },
  {
    id: 6,
    name: "야도란",
    image: "/img/Partner.png",
    type: ["물"],
    group: "해파리포켓몬",
    owned: true,
  },
];

const typeColors = {
  노말: "#A8A77A",
  불꽃: "#EE8130",
  물: "#6390F0",
  전기: "#F7D02C",
  풀: "#7AC74C",
  얼음: "#96D9D6",
  격투: "#C22E28",
  독: "#A33EA1",
  땅: "#E2BF65",
  비행: "#A98FF3",
  에스퍼: "#F95587",
  벌레: "#A6B91A",
  바위: "#B6A136",
  고스트: "#735797",
  드래곤: "#6F35FC",
  악: "#705746",
  강철: "#B7B7CE",
  페어리: "#D685AD",
};

const PokeDevPage = () => {
  const dispatch = useDispatch();

  const partnerPokemon = useSelector(selectMyPartnerPokemon);
  // 현재 선택된 포켓몬
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // 내 포켓몬 리스트 저장 상태변수
  const [myPokemonList, setMyPokemonList] = useState([]);

  // 포켓몬 목록 불러오기
  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const data = await fetchMyPokemons();
        setMyPokemonList(
          data.map((pokemon) => ({ ...pokemon, isPartner: pokemon.id === partnerPokemon?.id }))
        );
        console.log("내 포켓몬 목록:", data);
      } catch (error) {
        setMyPokemonList(myPokemonListDemo); // 임시 데이터로 대체
        toast.error("포켓몬 목록을 불러오지 못했습니다.");
      }
    };

    loadPokemons();
  }, [partnerPokemon]);

  // 파트너 포켓몬 등록
  const handleSetPartner = () => {
    if (!selectedPokemon) {
      toast.error("먼저 포켓몬을 선택해주세요.");
      return;
    }

    if (!selectedPokemon.owned) {
      toast.error("소유한 포켓몬만 파트너로 설정할 수 있습니다.");
      return;
    }

    try {
      dispatch(setPartnerPokemon(selectedPokemon.id));
      toast.success(`"${selectedPokemon.name}"이(가) 파트너로 설정되었습니다.`);
    } catch (error) {
      toast.error("파트너 설정 중 오류가 발생했습니다.");
    }
  };

  return (
    <MainLayout>
      <TitleFlexBox>
        <LeftTitle>포켓몬 도감</LeftTitle>
        <ParterBox onClick={handleSetPartner}>
          <img src="img/Partner.png" alt="" />
          <RightTitle>파트너 포켓몬</RightTitle>
        </ParterBox>
      </TitleFlexBox>
      {/* 선택한 포켓몬 정보 영역 */}
      <InfoBox $selectedPokemon={selectedPokemon}>
        {selectedPokemon ? (
          <>
            <PokeImg src={selectedPokemon.url} alt={selectedPokemon.name} owned={selectedPokemon.owned} />
            <PokeMonDetail>
              <PokeMonName>{selectedPokemon.name}</PokeMonName>
              <PokeMonGroup>{selectedPokemon.groupName}</PokeMonGroup>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {selectedPokemon.type.map((type) => (
                  <PokeMonType key={type} type={type}>
                    {type}
                  </PokeMonType>
                ))}
              </div>
            </PokeMonDetail>
          </>
        ) : (
          <h3>포켓몬을 선택해주세요.</h3>
        )}
      </InfoBox>

      {/* 도감 영역 */}
      <DexBackground>
        <PokemonGrid>
          {myPokemonList.map((pokemon) => (
            <PokemonCardItem
              key={pokemon.id}
              pokemon={pokemon}
              isSelected={selectedPokemon?.id === pokemon.id}
              onClick={() => setSelectedPokemon(pokemon)}
            />
          ))}
        </PokemonGrid>
      </DexBackground>
    </MainLayout>
  );
};

export default PokeDevPage;

const TitleFlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 10px 10px 0 10px;
`;

const LeftTitle = styled(Title)`
  margin: 0;
`;

const RightTitle = styled.div`
  margin: 0;
  font-weight: 500;
`;

const ParterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 2rem;
    margin-right: 0.5rem;
  }
`;

const InfoBox = styled.div.attrs((props) => ({}))`
  padding: 1rem;
  background-color: white;
  border-radius: 1rem;
  border: 1px solid #c9c9c9;
  color: black;
  text-align: center;
  margin: 1.5rem 10px;

  display: ${({ $selectedPokemon }) => ($selectedPokemon ? "flex" : "block")};
  align-items: center;
`;

const PokeImg = styled.img`
  width: 100px;
  height: 100px;
  margin: 0 1rem;

  filter: ${({ owned }) => (owned ? "none" : "grayscale(100%)")};
  opacity: ${({ owned }) => (owned ? 1 : 0.2)};
  background-color: ${({ owned }) => (owned ? "transparent" : "transparent")};
`;

const PokeMonDetail = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const PokeMonName = styled.h2`
  margin: 0;
`;

const PokeMonGroup = styled.h4`
  margin: 0.5rem 0;
  color: #656565;
`;

const PokeMonType = styled.span`
  background-color: ${({ type }) => typeColors[type.toLowerCase()] || "#777"};
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: bold;
  text-transform: capitalize;
`;

const DexBackground = styled.div`
  width: 100%;
  height: 100%;
  //   background-image: url("/img/pokedexBackImg.png");
  //   background-size: cover;
  /* 회색 격자무늬 만들기 */
  background-color: #ccc;
  background-image: linear-gradient(90deg, #bbb 1px, transparent 1px),
    linear-gradient(#bbb 1px, transparent 1px);

  background-size: 20px 20px; // 격자 간격
  background-position: 0 0, 0 0;
  border-radius: 1rem;

  padding: 1rem;
  box-sizing: border-box;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(150, 150, 150);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(150, 150, 150, 0.1);
  }
`;

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 60px);
  gap: 1rem;
  justify-items: start;
  justify-content: space-around;

  @media (max-width: 400px) {
    grid-template-columns: repeat(4, 60px);
  }
`;
