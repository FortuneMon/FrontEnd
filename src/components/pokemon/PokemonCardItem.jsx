// components/pokemon/PokemonCardItem.jsx
import React from "react";
import styled from "styled-components";

const PokemonCardItem = ({ pokemon, isSelected, onClick }) => {
  return (
    // $을 통해 스타일 전용 Props로 만들어 DOM에는 전달 안되도록 설정
    <PokemonCard key={pokemon.id} onClick={onClick} $owned={pokemon.owned}>
      {pokemon.isPartner && (
        <PartnerIcon src="img/partner.png" alt="파트너 포켓몬" />
      )}
      {isSelected && (
        <>
          <div className="corner top-left selected" />
          <div className="corner top-right selected" />
          <div className="corner bottom-left selected" />
          <div className="corner bottom-right selected" />
        </>
      )}
      <PokeCardImg
        src={pokemon.url}
        alt={pokemon.name}
        $owned={pokemon.owned}
      />
    </PokemonCard>
  );
};

export default PokemonCardItem;

const PokemonCard = styled.div`
  position: relative;
  background-color: rgba(255, 255, 255, 0.1);
  width: 70px;
  height: 70px;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 0.75rem;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: ${({ $owned }) => ($owned ? "pointer" : "not-allowed")};
  pointer-events: ${({ $owned }) => ($owned ? "auto" : "none")};

  transition: all 0.2s ease;

  &:hover .corner {
    opacity: 1;
  }

  .corner {
    position: absolute;
    width: 70px;
    height: 70px;
    opacity: 0;
  }

  .corner.selected {
    opacity: 1; /* 클릭 상태면 항상 보이게 */
  }

  /* 각 모서리의 선 두 개: 가로 + 세로 */
  .corner::before,
  .corner::after {
    content: "";
    position: absolute;
    background-color: black;
  }

  /* 각 corner 위치별 스타일 */
  .top-left::before {
    width: 12px;
    height: 4px;
    top: 0;
    left: 0;
  }
  .top-left::after {
    width: 4px;
    height: 12px;
    top: 0;
    left: 0;
  }

  .top-right::before {
    width: 12px;
    height: 4px;
    top: 0;
    right: 0;
  }
  .top-right::after {
    width: 4px;
    height: 12px;
    top: 0;
    right: 0;
  }

  .bottom-left::before {
    width: 12px;
    height: 4px;
    bottom: 0;
    left: 0;
  }
  .bottom-left::after {
    width: 4px;
    height: 12px;
    bottom: 0;
    left: 0;
  }

  .bottom-right::before {
    width: 12px;
    height: 4px;
    bottom: 0;
    right: 0;
  }
  .bottom-right::after {
    width: 4px;
    height: 12px;
    bottom: 0;
    right: 0;
  }
`;

const PokeCardImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 0.5rem;

  filter: ${({ $owned }) => ($owned ? "none" : "grayscale(100%)")};
  opacity: ${({ $owned }) => ($owned ? 1 : 0.5)};
  background-color: ${({ $owned }) => ($owned ? "transparent" : "black")};
`;

const PartnerIcon = styled.img`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 24px;
  height: 24px;
  z-index: 2;
`;
