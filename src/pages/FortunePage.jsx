import { useEffect, useState } from "react";
import styled from "styled-components";
import TopNav from "../components/layouts/TopNav";
import Nav from "../components/layouts/Nav";
import axios from "axios";
import MainLayout from "../components/layouts/MainLayout";
import Title from "../components/layouts/Title";
import Main from "../components/layouts/Main";
import useLoginLoading from "../hooks/useLoginLoading";
import { drawTodayFortune, getTodayFortune } from "../apis/FortuneApi";

const dummyFortune = {
  재물운:
    "타인과 재정적인 거래를 약속해서는 안 됩니다. 오늘은 일 년 중 반드시 피해야 할 서른 날 중의 하루입니다. 특히 재물을 운용하시는 분은 작은 수익이라도 발생을 하면 즉시 운용을 중단해야 합니다. 목표수익을 크게 낮추어 잡고 욕심을 버리지 않으면 자칫 큰 손실로 이어질 가능성도 있습니다. 재물에 관한 약속을 하거나 타인에게 금전을 융통해야 하는 경우라면 오늘은 피하셔야 합니다. 다 된 일도 마무리가 틀어지는 날이니 후 일로 미루어 계획을 잡는 것이 좋습니다.",
  애정운:
    "오해가 발생하거나 서로에게 불만이 생기는 날입니다. 사소한 일도 큰 다툼으로 이어지거나 약속이 어긋나는 일들이 발생합니다. 새롭게 인연을 만나도 끝이 좋지 않으니 새로운 만남도 자제해야 하며 판단력이 흐려져서 이성에게 실수를 할 수도 있습니다. 특히 본인이나 상대에게 서로 알아서는 안 될 일이 있다면 오늘은 주변의 실수로 들통이 나는 경우도 있습니다. 가급적 다툼을 피하시고 조금이라도 오해를 살 만한 일이나 행동을 하지 않도록 하시기 바랍니다.",
  로또운:
    "전체적인 운의 흐름이 어려운 날입니다. 공연히 짜증이 나거나 뜻대로 일이 풀리지 않으니 다 잡은 행운도 오히려 나의 몫이 안 될 가능성이 있는 날입니다. 당첨 기운이 크게 부족한 날이니 구입을 절대로 삼가셔야 하는 날입니다. 오늘 좋은 기운을 보충하고 액운을 멀리하는 색상은 파란색, 초록색입니다. 의상이나 소품에 참고하여 지니시면 도움이 될 것이며 구입 지역이나 장소 혹은 연관되는 이름에 ㅂ, ㅍ, ㅎ 자음의 성씨 자음이 들어가면 행운과 더 가까워질 것입니다.",
  건강운:
    "건강에 대한 걱정이 생기는 날입니다. 몸이 아프거나 병원에 가게 되는 일이 생길 수 있습니다. 특히 평소에 건강에 문제가 있었던 분들은 오늘은 병원에 가서 검사를 받는 것이 좋습니다. 오늘은 몸의 이상을 발견하고 치료를 받는 것이 좋습니다. 또한, 오늘은 스트레스가 쌓이기 쉬운 날이니 스트레스를 해소할 수 있는 방법을 찾아보는 것이 좋습니다.",
};

const FortunePage = () => {
  const { isLoading } = useLoginLoading();

  const [fortune, setFortune] = useState([]);
  const [loading, setLoading] = useState(true);
  const [love, setLove] = useState("");
  const [health, setHealth] = useState("");
  const [wealth, setWealth] = useState("");

  // 오늘의 운세 조회
  useEffect(() => {
    const fetchFortune = async () => {
      try {
        const res = await getTodayFortune();

        if (Array.isArray(res) && res.length === 0) {
          setFortune([]);
        } else if (res) {
          console.log("오늘의 운세:", res);
          setFortune(res);

          // 카테고리별 운세 추출
          const loveFortune = res.find((f) => f.category === "love");
          const healthFortune = res.find((f) => f.category === "health");
          const wealthFortune = res.find((f) => f.category === "wealth");

          setLove(loveFortune?.content || "관계 카테고리 루틴을 추가해주세요");
          setHealth(
            healthFortune?.content || "건강 카테고리 루틴을 추가해주세요"
          );
          setWealth(
            wealthFortune?.content || "자기계발 카테고리 루틴을 추가해주세요"
          );
        }
      } catch (error) {
        console.error("운세 불러오기 실패:", error);
        setLove("애정운 불러오기 실패");
        setHealth("건강운 불러오기 실패");
        setWealth("재물운 불러오기 실패");
      } finally {
        setLoading(false);
      }
    };

    fetchFortune();
  }, [isLoading]);

  const handleDrawFortune = async () => {
    try {
      const res = await drawTodayFortune("love", "health", "wealth");
      if (res?.fortune) {
        const drawn = res.fortune;
        setFortune(drawn);

        const loveFortune = drawn.find((f) => f.category === "love");
        const healthFortune = drawn.find((f) => f.category === "health");
        const wealthFortune = drawn.find((f) => f.category === "wealth");

        setLove(loveFortune?.content || "관계 카테고리 루틴을 추가해주세요");
        setHealth(
          healthFortune?.content || "건강 카테고리 루틴을 추가해주세요"
        );
        setWealth(
          wealthFortune?.content || "자기계발 카테고리 루틴을 추가해주세요"
        );
      }
    } catch (error) {
      console.error("운세 뽑기 실패:", error);
      setLove("애정운 fallback");
      setHealth("건강운 fallback");
      setWealth("재물운 fallback");
    }
  };

  return (
    <MainLayout isLoading={isLoading}>
      <Title>오늘의 운세 뽑기</Title>
      <FlexBox>
        <ContentBox>
          {/* {!fortune.length ? (
            <ImgBox>
              <img src="img/Fortune.png" alt="포츈기계" />
            </ImgBox>
          ) : null}

          {!loading && !fortune.length ? (
            <FortuneBtn onClick={handleDrawFortune}>
              오늘의 운세를 뽑아주세요
            </FortuneBtn>
          ) : (
            <FortuneBox>
              <FortuneCard>
                <FortuneCategoryTitle>💘 애정운</FortuneCategoryTitle>
                <FortuneText>{love}</FortuneText>
              </FortuneCard>
              <div>
                <FortuneCategoryTitle>💪 건강운</FortuneCategoryTitle>
                <FortuneText>{health}</FortuneText>
              </div>
              <div>
                <FortuneCategoryTitle>💰 재물운</FortuneCategoryTitle>
                <FortuneText>{wealth}</FortuneText>
              </div>
            </FortuneBox>
          )} */}

          {loading ? null : !fortune.length ? (
            <>
              <ImgBox>
                <img src="img/Fortune.png" alt="포츈기계" />
              </ImgBox>
              <FortuneBtn onClick={handleDrawFortune}>
                오늘의 운세를 뽑아주세요
              </FortuneBtn>
            </>
          ) : (
            <FortuneBox>
              <FortuneCard>
                <FortuneCategoryTitle>💘 애정운</FortuneCategoryTitle>
                <FortuneText>{love}</FortuneText>
              </FortuneCard>
              <FortuneCard>
                <FortuneCategoryTitle>💪 건강운</FortuneCategoryTitle>
                <FortuneText>{health}</FortuneText>
              </FortuneCard>
              <FortuneCard>
                <FortuneCategoryTitle>💰 재물운</FortuneCategoryTitle>
                <FortuneText>{wealth}</FortuneText>
              </FortuneCard>
            </FortuneBox>
          )}
        </ContentBox>
      </FlexBox>

      <Nav />
    </MainLayout>
  );
};

export default FortunePage;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  // max-height: calc(100% - 100px);
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

const FortuneBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FortuneCard = styled.div`
  width: 100%;
`;

const FortuneCategoryTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 6px;
  color: black; /* 포인트 색상 */
`;

const FortuneText = styled.div`
  font-size: 1.2rem;
  text-align: center;
  color: #333;
  background-color: #f7f7f7;
  padding: 1rem;
  border-radius: 10px;
  width: 90%;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

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
