import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Title from "../components/layouts/Title";
import { useNavContext } from "../apis/NavContext";
import MainLayout from "../components/layouts/MainLayout";
import MyRoutineCard from "../components/routines/MyRoutineCard";
import RoutineCard from "../components/routines/RoutineCard";
import AppColor from "../utils/AppColor";
import Constants from "../utils/constants";
import RoutineCategoryChip from "../components/routines/RoutineCategoryChip";

const HomePage = () => {
  // const { setActiveNav } = useNavContext();
  // useEffect(() => {
  //   setActiveNav(0);
  // }, []);
  // TODO 로그인 연동 후 hooks로 isLoggedIn 체크
  const isLoggedIn = true;

  const [category, setCategory] = useState(Constants.routineCategory[0].title);
  const onClickCategory = useCallback(
    (title) => () => {
      setCategory(title);
    },
    []
  );

  const dummyData = [
    { routineId: 1, title: "공복에 물 마시기", isCompleted: false },
    { routineId: 2, title: "이불 정리", isCompleted: true },
    { routineId: 3, title: "운동하기", isCompleted: false },
    { routineId: 4, title: "긍정적인 생각하기", isCompleted: false },
  ];
  const dummyData2 = [
    { routineId: 1, title: "공복에 물 마시기", isRegistered: false },
    { routineId: 2, title: "이불 정리", isRegistered: true },
    { routineId: 3, title: "운동하기", isRegistered: false },
    { routineId: 4, title: "긍정적인 생각하기", isRegistered: false },
  ];

  useEffect(() => {
    // TODO 내 루틴 정보 불러오기
  }, []);

  useEffect(() => {
    // TODO 모든 루틴 정보 불러오기
  }, []);

  return (
    <MainLayout>
      {isLoggedIn && (
        <>
          <div>
            <Title>오늘의 루틴</Title>
            <RoutineBox>
              {dummyData.map((data, i) => (
                <MyRoutineCard
                  key={data.routineId}
                  routineId={data.routineId}
                  title={data.title}
                  isCompleted={data.isCompleted}
                  isLast={dummyData.length === i + 1}
                />
              ))}
            </RoutineBox>
          </div>
          <Line />
        </>
      )}

      <div>
        <Title>추천 루틴</Title>
        <CategoryBox>
          {Constants.routineCategory.map((c, i) => (
            <RoutineCategoryChip
              key={i}
              icon={c.icon}
              title={c.title}
              isSelected={c.title === category}
              onClick={onClickCategory(c.title)}
            />
          ))}
        </CategoryBox>
        <RoutineBox>
          {dummyData2.map((data, i) => (
            <RoutineCard
              key={data.routineId}
              routineId={data.routineId}
              title={data.title}
              isRegistered={data.isRegistered}
              isLast={dummyData.length === i + 1}
            />
          ))}
        </RoutineBox>
      </div>
    </MainLayout>
  );
};

export default HomePage;

const RoutineBox = styled.div`
  display: flex;
  witdh: 80%;
  flex-direction: column;
  border: 1px solid ${AppColor.border.gray};
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;

  box-shadow: rgb(0, 0, 0, 0.1) 3px 4px 18px 1px;
`;

const Line = styled.div`
  border-bottom: 1px solid ${AppColor.border.gray};
  margin: 50px auto;
`;

const CategoryBox = styled.div`
  display: flex;
  column-gap: 14px;
  margin-top: 20px;
`;
