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
import FortuneCardItem from "../components/fortune/FortuneCardItem";

const FortunePage = () => {
  const { isLoading } = useLoginLoading();

  const [fortune, setFortune] = useState([]);
  const [loading, setLoading] = useState(true);
  const [love, setLove] = useState("");
  const [health, setHealth] = useState("");
  const [wealth, setWealth] = useState("");

  // const [love, health, wealth] = useState({});

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

      // 버튼 누르면 버튼이 비활성화 되게.
      window.location.reload(); // 운세 뽑기 후 페이지 새로고침
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
              {/* constant의 title을 추가 수정 */}
              <FortuneCardItem icon="💘" title="애정운" content={love} />
              <FortuneCardItem icon="💪" title="건강운" content={health} />
              <FortuneCardItem icon="💰" title="재물운" content={wealth} />
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
  // height: 100%;
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
