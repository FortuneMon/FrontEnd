import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TopNav from "../components/TopNav";
import Nav from "../components/Nav";
import axios from "axios";

const dummyFortune = {
  재물운:
    "타인과 재정적인 거래를 약속해서는 안 됩니다. 오늘은 일 년 중 반드시 피해야 할 서른 날 중의 하루입니다. 특히 재물을 운용하시는 분은 작은 수익이라도 발생을 하면 즉시 운용을 중단해야 합니다. 목표수익을 크게 낮추어 잡고 욕심을 버리지 않으면 자칫 큰 손실로 이어질 가능성도 있습니다. 재물에 관한 약속을 하거나 타인에게 금전을 융통해야 하는 경우라면 오늘은 피하셔야 합니다. 다 된 일도 마무리가 틀어지는 날이니 후 일로 미루어 계획을 잡는 것이 좋습니다.",
  애정운:
    "오해가 발생하거나 서로에게 불만이 생기는 날입니다. 사소한 일도 큰 다툼으로 이어지거나 약속이 어긋나는 일들이 발생합니다. 새롭게 인연을 만나도 끝이 좋지 않으니 새로운 만남도 자제해야 하며 판단력이 흐려져서 이성에게 실수를 할 수도 있습니다. 특히 본인이나 상대에게 서로 알아서는 안 될 일이 있다면 오늘은 주변의 실수로 들통이 나는 경우도 있습니다. 가급적 다툼을 피하시고 조금이라도 오해를 살 만한 일이나 행동을 하지 않도록 하시기 바랍니다.",
  로또운:
    "전체적인 운의 흐름이 어려운 날입니다. 공연히 짜증이 나거나 뜻대로 일이 풀리지 않으니 다 잡은 행운도 오히려 나의 몫이 안 될 가능성이 있는 날입니다. 당첨 기운이 크게 부족한 날이니 구입을 절대로 삼가셔야 하는 날입니다. 오늘 좋은 기운을 보충하고 액운을 멀리하는 색상은 파란색, 초록색입니다. 의상이나 소품에 참고하여 지니시면 도움이 될 것이며 구입 지역이나 장소 혹은 연관되는 이름에 ㅂ, ㅍ, ㅎ 자음의 성씨 자음이 들어가면 행운과 더 가까워질 것입니다.",
};

const FortunePage = () => {
  const [fortune, setFortune] = useState(null);
  const [loading, setLoading] = useState(true);

  // 오늘의 운세 조회
  useEffect(() => {
    const fetchFortune = async () => {
      try {
        const response = await axios.get("/api/fortune/today"); // 예시 엔드포인트
        if (response.data?.fortune) {
          setFortune(response.data.fortune);
        }
      } catch (error) {
        console.error("운세 불러오기 실패:", error);
        // setFortune(dummyFortune.애정운);
      } finally {
        setLoading(false);
      }
    };

    fetchFortune();
  }, []);

  const handleDrawFortune = async () => {
    try {
      const response = await axios.post("/api/fortune/draw"); // 운세 뽑기 API
      if (response.data?.fortune) {
        setFortune(response.data.fortune);
      }
    } catch (error) {
      console.error("운세 뽑기 실패:", error);
      setFortune(dummyFortune.로또운);
    }
  };

  return (
    <Container>
      <TopNav />
      <Main>
        <Title>오늘의 운세 뽑기</Title>
        <FlexBox>
          <ContentBox>
            {!fortune ? (
              <ImgBox>
                <img src="img/Fortune.png" alt="" />
              </ImgBox>
            ) : (
              <></>
            )}
            {!loading &&
              (fortune ? (
                <FortuneText>{fortune}</FortuneText>
              ) : (
                <FortuneBtn onClick={handleDrawFortune}>
                  오늘의 운세를 뽑아주세요
                </FortuneBtn>
              ))}
          </ContentBox>
        </FlexBox>
      </Main>
      <Nav />
    </Container>
  );
};

export default FortunePage;

const Container = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  // position: relative;
`;

const Main = styled.div`
  position: relative;
  top: 50px;
  background-color: white;
  padding: 0.5rem;
  overflow-y: auto;
  height: 100%;
  max-height: calc(100% - 100px);
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(150, 150, 150);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(150, 150, 150, 0.1);
  }
`;

const Title = styled.h2`
  margin: 0;
  margin-left: 10px;
  margin-top: 10px;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-height: calc(100% - 100px);
  width: 100%;
`;

const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImgBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    max-width: 400px;
  }
`;

const FortuneBtn = styled.button`
  width: 80%;
  max-width: 400px;
  height: 50px;
  background-color: #ffda22;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  margin-top: 20px;
`;

const FortuneText = styled.div`
  font-size: 1.2rem;
  text-align: center;
  color: #333;
  background-color: #f7f7f7;
  padding: 1rem;
  border-radius: 10px;
  width: 80%;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
