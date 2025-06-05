import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import MainLayout from "../components/layouts/MainLayout";
import Title from "../components/layouts/Title";
import useLoginLoading from "../hooks/useLoginLoading";
import { drawTodayFortune, getTodayFortune } from "../apis/FortuneApi";
import FortuneCardItem from "../components/fortune/FortuneCardItem";
import Constants from "../utils/constants";
import { toast } from "react-toastify";
import Loading from "../components/common/Loading";

const FortunePage = () => {
  const { isLoading } = useLoginLoading();

  const [drawLoading, setDrawLoading] = useState(false);

  const [fortune, setFortune] = useState(null);
  const getFortuneContentByCategory = useCallback(
    (category) => {
      if (fortune === null) return "";
      const target = fortune.find((f) => f.category === category);
      return target?.content
        ? target.content
        : // : `${category} 관련 루틴을 추가하시면, 내용을 확인하실 수 있어요.`;
          "";
    },
    [fortune]
  );

  // 오늘의 운세 조회
  useEffect(() => {
    if (!isLoading) {
      const fetchFortune = async () => {
        try {
          const res = await getTodayFortune();
          if (Array.isArray(res) && res.length === 0) {
            setFortune(null);
          } else if (res) {
            setFortune(res);
          }
        } catch (error) {
          console.error("운세 불러오기 실패:", error);
          toast.error("오늘의 운세를 불러오는데 실패했습니다. 다시 시도해 주세요.");
          setFortune(null);
        }
      };
      fetchFortune();
    }
  }, [isLoading]);

  const handleDrawFortune = useCallback(async () => {
    try {
      setDrawLoading(true);
      const res = await drawTodayFortune();
      if (res) {
        setFortune(res);
      }
    } catch (error) {
      toast.error("운세를 뽑는데 실패했습니다. 잠시 후 다시 시도해 주세요.");
      console.error("운세 뽑기 실패:", error);
    } finally {
      setDrawLoading(false);
    }
  }, []);

  return (
    <MainLayout isLoading={isLoading}>
      <Title>오늘의 운세 뽑기</Title>
      <FlexBox>
        <ContentBox>
          {fortune !== null ? (
            <>
              <ImgBox>
                <img src="img/Fortune.png" alt="포츈기계" />
              </ImgBox>
              <FortuneBtn disabled={drawLoading} onClick={handleDrawFortune}>
                {drawLoading && <Loading size="12px" style={{ position: "absolute", left: "30px" }} />}
                {!drawLoading ? "오늘의 운세를 뽑아주세요" : "운세를 뽑고 있습니다..."}
              </FortuneBtn>
            </>
          ) : (
            <FortuneBox>
              {Constants.routineCategory.map((rc) => (
                <FortuneCardItem
                  key={rc.title}
                  icon={rc.icon}
                  title={rc.title}
                  content={getFortuneContentByCategory(rc.title)}
                />
              ))}
              {fortune !== null && fortune.length < Constants.routineCategory.length ? (
                <>
                  <Text style={{ marginTop: "50px" }}>다른 카테고리의 루틴을 추가하면,</Text>
                  <Text>다른 카테고리의 운세도 함께 확인할 수 있어요!</Text>
                </>
              ) : null}
            </FortuneBox>
          )}
        </ContentBox>
      </FlexBox>
    </MainLayout>
  );
};

export default FortunePage;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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

  &:disabled {
    background-color: rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.26);
  }
`;

const FortuneBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Text = styled.p`
  margin: 5px 0;
`;
