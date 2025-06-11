import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import MainLayout from "../components/layouts/MainLayout";
import Title from "../components/layouts/Title";
import { fetchMyPokeBalls, openPokemonByBall } from "../apis/PokeApi";
import useModals from "../hooks/useModal";
import { toast } from "react-toastify";

const ballImages = {
  1: "/img/balls/MonsterBall.png",
  2: "/img/balls/SuperBall.png",
  3: "/img/balls/HyperBall.png",
  4: "/img/balls/MasterBall.png",
};

const PokeBallPage = () => {
  // 유저가 가진 포켓볼 목록을 관리하는 상태
  const [pokeBalls, setPokeBalls] = useState([]);

  const [isOpened, openModal, closeModal] = useModals();
  const [selectedBall, setSelectedBall] = useState(null);

  const [isFlashing, setIsFlashing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [capturedPokemon, setCapturedPokemon] = useState(null);
  const [selectedBallId, setSelectedBallId] = useState(null);
  const [selectedBallKeyId, setSelectedBallKeyId] = useState(null);
  const captureMusicRef = useRef(null);

  useEffect(() => {
    const loadBalls = async () => {
      try {
        const data = await fetchMyPokeBalls();
        setPokeBalls(data.reverse()); // 역순으로 저장
      } catch (error) {
        toast.error("포켓볼을 불러오는 데 실패했습니다.");
      }
    };
    loadBalls();
  }, []);

  useEffect(() => {
    console.log("selectedBallId가 변경됨:", selectedBallId);
  }, [selectedBallId]);

  const handleDraw = async (ballType) => {
    try {
      const result = await openPokemonByBall(ballType);
      alert(`${result.name}을(를) 뽑았습니다!`);
      // 결과 포켓몬 페이지 이동 or 모달 표시 등 추가 가능
    } catch (error) {
      alert("뽑기 실패! 잔여 개수를 확인하세요.");
    }
  };

  const openDrawModal = useCallback(
    (ball) => {
      setSelectedBall(ball);
      setSelectedBallId(ball.ballId);
      setSelectedBallKeyId(ball.id);
      console.log("선택한 볼:", ball);
      console.log("현재 선택한 볼 ID:", ball.ballId);
      console.log("현재 선택한 볼의 고유 Key ID:", ball.id);
      openModal();
    },
    [openModal]
  ); // openModal도 외부에서 왔다면 의존성에 포함

  const handleClickBall = useCallback(
    (ball) => () => {
      openDrawModal(ball);
    },
    [openDrawModal] // openDrawModal이 위에서 이미 정의됨
  );

  const confirmDraw = async () => {
    if (!selectedBall) return;

    // 흔들림 시작
    setIsAnimating(true);

    setTimeout(async () => {
      // 흔들림 끝
      setIsAnimating(false);

      // 번쩍임 시작
      setIsFlashing(true);

      setTimeout(async () => {
        setIsFlashing(false); // 번쩍임 끝

        try {
          // 실제 API 호출
          console.log("현재 오픈한 선택한 볼 ID:", selectedBallId);
          console.log("현재 선택한 볼의 고유 Key ID:", selectedBallKeyId);
          const result = await openPokemonByBall(selectedBallKeyId);

          console.log("뽑은 포켓몬 정보 1:", result);

          // 등장 포켓몬 설정
          setCapturedPokemon(result); // result에 name, image 등 있다고 가정

          console.log("뽑은 포켓몬 정보 2:", capturedPokemon);
          // 음악 재생
          captureMusicRef.current?.play();
        } catch (error) {
          alert("뽑기 실패! 다시 시도해주세요.");
        }
      }, 800); // 번쩍임 시간
    }, 2000); // 흔들림 시간
  };

  const cancelDraw = () => {
    closeModal();
    setCapturedPokemon(null);
    setIsAnimating(false);
    window.location.reload(); // 페이지 새로고침
  };

  const cancelDrawPokemon = () => {
    closeModal();
    setCapturedPokemon(null);
    setIsAnimating(false);
    window.location.reload(); // 페이지 새로고침
  };

  return (
    <MainLayout>
      <Title>내 가방</Title>
      <PokemonGrid>
        {pokeBalls.map((ball) => (
          <BallCard
            key={ball.ballId}
            $isUsed={ball.open}
            onClick={handleClickBall(ball)}
          >
            <BallImgWrapper>
              <div className="corner top-left" />
              <div className="corner top-right" />
              <div className="corner bottom-left" />
              <div className="corner bottom-right" />
              <BallImg
                src={ballImages[ball.ballId]}
                $isUsed={ball.open}
                alt={`ball-${ball.ballId}`}
              />
            </BallImgWrapper>
            <BallDate>{ball.created_at.split("T")[0]}</BallDate>
          </BallCard>
        ))}
      </PokemonGrid>

      {isOpened && (
        <ModalOverlay>
          <ModalBox>
            {capturedPokemon ? (
              <>
                <img
                  src={capturedPokemon.url}
                  alt={capturedPokemon.name}
                  width="100"
                />
                <PokeMonName>{capturedPokemon.name}</PokeMonName>
                <PokeMonGroup>{capturedPokemon.group}</PokeMonGroup>
                <ModalButton onClick={cancelDrawPokemon}>닫기</ModalButton>
              </>
            ) : (
              <>
                <BallImgAnimated
                  src={ballImages[selectedBallId]}
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

  filter: ${(props) => (props.$isUsed ? "grayscale(100%)" : "none")};
  pointer-events: ${(props) => (props.$isUsed ? "none" : "auto")};
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

  filter: ${(props) => (props.$isUsed ? "grayscale(100%)" : "none")};
  pointer-events: ${(props) => (props.$isUsed ? "none" : "auto")};
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

const BallDate = styled.div`
  margin-top: 0.3rem;
  font-size: 0.8rem;
  color: black;
  font-weight: 600;
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
