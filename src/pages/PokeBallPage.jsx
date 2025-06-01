import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import MainLayout from "../components/layouts/MainLayout";
import Title from "../components/layouts/Title";
import { fetchMyPokeBalls, openPokemonByBall } from "../apis/PokeApi";
import useModals from "../hooks/useModal";

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

const dummyPokeBalls = [
  {
    ballName: "MonsterBall",
    url: "/img/balls/MonsterBall.png",
    count: 5,
  },
  {
    ballName: "super",
    url: "/img/balls/SuperBall.png",
    count: 2,
  },
  {
    ballName: "ultra",
    url: "/img/balls/HyperBall.png",
    count: 1,
  },
  {
    ballName: "MonsterBall",
    url: "/img/balls/MonsterBall.png",
    count: 5,
  },
  {
    ballName: "super",
    url: "/img/balls/SuperBall.png",
    count: 2,
  },
];

const PokeBallPage = () => {
  // 유저가 가진 포켓볼 목록을 관리하는 상태
  const [pokeBalls, setPokeBalls] = useState([]);

  const [isOpened, openModal, closeModal] = useModals();
  const [selectedBall, setSelectedBall] = useState(null);

  const [isFlashing, setIsFlashing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [capturedPokemon, setCapturedPokemon] = useState(null);

  const captureMusicRef = useRef(null);

  useEffect(() => {
    const loadBalls = async () => {
      try {
        const data = await fetchMyPokeBalls();
        setPokeBalls(data);
      } catch (error) {
        console.warn("API 실패로 더미 데이터 사용");
        setPokeBalls(dummyPokeBalls);
      }
    };
    loadBalls();
  }, []);

  const handleDraw = async (ballType) => {
    try {
      const result = await openPokemonByBall(ballType);
      alert(`${result.name}을(를) 뽑았습니다!`);
      // 결과 포켓몬 페이지 이동 or 모달 표시 등 추가 가능
    } catch (error) {
      alert("뽑기 실패! 잔여 개수를 확인하세요.");
    }
  };

  const openDrawModal = (ball) => {
    setSelectedBall(ball);
    openModal(); // 모달 열기
  };

  //   const confirmDraw = async () => {
  //     if (!selectedBall) return;
  //     try {
  //       const result = await openPokemonByBall(selectedBall.ballName);
  //       alert(`${result.name}을(를) 뽑았습니다!`);
  //     } catch (error) {
  //       alert("뽑기 실패! 다시 시도해주세요.");
  //     }
  //     closeModal(); // 모달 닫기
  //   };

  // 더미데이터용 뽑기 함수
  const confirmDraw = () => {
    setIsAnimating(true); // 흔들림 시작

    setTimeout(() => {
      setIsAnimating(false); // 흔들림 끝
      setIsFlashing(true); // 번쩍임 시작

      setTimeout(() => {
        setIsFlashing(false); // 번쩍임 끝

        // 포켓몬 등장 + 음악 재생
        const random = Math.floor(Math.random() * myPokemonListDemo.length);
        setCapturedPokemon(myPokemonListDemo[random]);

        // 음악 재생 (오디오 ref 또는 Audio 객체)

        captureMusicRef.current?.play();
      }, 800); // 번쩍임 시간 0.8초
    }, 2000); // 흔들림 시간 2초
  };

  //   const cancelDraw = () => {
  //     closeModal(); // 모달 닫기
  //     setSelectedBall(null); // 선택 취소
  //   };

  const cancelDraw = () => {
    closeModal();
    setCapturedPokemon(null);
    setIsAnimating(false);
  };

  return (
    <MainLayout>
      <Title>내 가방</Title>
      <PokemonGrid>
        {pokeBalls.map((ball) => (
          <BallCard key={ball.ballName} onClick={() => openDrawModal(ball)}>
            <BallImgWrapper>
              <div className="corner top-left" />
              <div className="corner top-right" />
              <div className="corner bottom-left" />
              <div className="corner bottom-right" />
              <BallImg src={ball.url} alt={ball.ballName} />
            </BallImgWrapper>
            <BallCount>{ball.count}개</BallCount>
          </BallCard>
        ))}
      </PokemonGrid>

      {/* {isOpened && (
        <ModalOverlay>
          <ModalBox>
            <img
              src={selectedBall?.url}
              alt={selectedBall?.ballName}
              width="80"
            />
            <p>몬스터볼을 사용하시겠습니까?</p>
            <ButtonRow>
              <ModalButton onClick={confirmDraw}>예</ModalButton>
              <ModalButton onClick={cancelDraw}>아니요</ModalButton>
            </ButtonRow>
          </ModalBox>
        </ModalOverlay>
      )} */}
      {isOpened && (
        <ModalOverlay>
          <ModalBox>
            {capturedPokemon ? (
              <>
                <img
                  src={capturedPokemon.image}
                  alt={capturedPokemon.name}
                  width="100"
                />
                <PokeMonName>{capturedPokemon.name}</PokeMonName>
                <PokeMonGroup>{capturedPokemon.group}</PokeMonGroup>
                <ModalButton onClick={cancelDraw}>닫기</ModalButton>
              </>
            ) : (
              <>
                <BallImgAnimated
                  src={selectedBall?.url}
                  alt={selectedBall?.ballName}
                  isShaking={isAnimating}
                />
                <p>몬스터볼을 사용하시겠습니까?</p>
                <ButtonRow>
                  <ModalButton onClick={confirmDraw} disabled={isAnimating}>
                    예
                  </ModalButton>
                  <ModalButton onClick={cancelDraw} disabled={isAnimating}>
                    아니요
                  </ModalButton>
                </ButtonRow>
              </>
            )}
          </ModalBox>
          {isAnimating && <FlashOverlay />} {/* 흰색 번쩍임 */}
        </ModalOverlay>
      )}

      {/* 숨겨진 오디오 태그 */}
      <audio
        ref={captureMusicRef}
        src="/sounds/SoundEffect.mp3" // 여기에 노래 경로 넣기
        preload="auto"
        hidden
      />
    </MainLayout>
  );
};

export default PokeBallPage;

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 100px);
  gap: 1rem;
  justify-items: center;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 400px) {
    grid-template-columns: repeat(4, 60px);
  }
`;
const BallCard = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BallImgWrapper = styled.div`
  width: 100px;
  height: 100px;

  @media (max-width: 400px) {
    width: 60px;
    height: 60px;
  }

  &:hover .corner {
    opacity: 1;
  }

  position: relative; /* corner 포지셔닝 기준 */

  &:hover .corner {
    opacity: 1;
  }

  .corner {
    position: absolute;
    width: 70px;
    height: 70px;
    opacity: 0;
    pointer-events: none;
  }

  /* 각 모서리 라인 */
  .corner::before,
  .corner::after {
    content: "";
    position: absolute;
    background-color: black;
  }

  .top-left {
    top: 0;
    left: 0;
  }
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

  .top-right {
    top: 0;
    right: 0;
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

  .bottom-left {
    bottom: 0;
    left: 0;
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

  .bottom-right {
    bottom: 0;
    right: 0;
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

const BallImg = styled.img`
  width: 100%;
  height: 100%;
`;

const BallImgAnimated = styled.img`
  width: 100px;
  height: 100px;

  ${({ isShaking }) =>
    isShaking &&
    css`
      animation: ${shake} 0.5s linear infinite;
    `}
`;

const BallCount = styled.div`
  margin-top: 0.3rem;
  font-size: 0.9rem;
  color: black;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalBox = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px 32px;
  max-width: 320px;
  width: 90%;
  box-shadow: 0 0 20px rgb(255 255 255 / 60%);
  text-align: center;
  color: black;
`;

const PokeMonName = styled.h2`
  margin: 0;
`;

const PokeMonGroup = styled.h4`
  margin: 0.5rem 0;
  color: #656565;
`;

const ButtonRow = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ModalButton = styled.button`
  width: 100px;
  background-color: #c9c9c9;
  border: none;
  border-radius: 8px;
  padding: 8px 24px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: background-color 0.25s ease;

  &:hover {
    background-color: rgb(164, 164, 164);
  }
`;

/* 흔들리는 애니메이션 */
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
`;

// 번쩍이는 효과
const flash = keyframes`
  0% { opacity: 0; }
  30% { opacity: 1; }
  100% { opacity: 0; }
`;

/* 플래시 효과 */
const FlashOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  opacity: 0.8;
  animation: ${flash} 2.5s ease-in-out forwards;
`;
