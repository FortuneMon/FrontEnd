import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Title from "../components/layouts/Title";
import MainLayout from "../components/layouts/MainLayout";
import MyRoutineCard from "../components/routines/MyRoutineCard";
import RoutineCard from "../components/routines/RoutineCard";
import AppColor from "../utils/AppColor";
import Constants from "../utils/constants";
import RoutineCategoryChip from "../components/routines/RoutineCategoryChip";
import { fetchAllRoutinesByCategory } from "../apis/RoutineApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyRoutines } from "../store/thunks/user";
import { selectMyRoutines } from "../store/slices/user";
import useLoginLoading from "../hooks/useLoginLoading";

const HomePage = () => {
  const dispatch = useDispatch();

  const { isLoading } = useLoginLoading();

  const [category, setCategory] = useState(Constants.routineCategory[0].title);
  const onClickCategory = useCallback(
    (title) => () => {
      setCategory(title);
    },
    []
  );

  const myRoutine = useSelector(selectMyRoutines);
  const [allRoutinesByCategory, setAllRoutinesByCategory] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchMyRoutines());
    }
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (!isLoading) {
      fetchAllRoutinesByCategory(category).then((data) => {
        setAllRoutinesByCategory(data);
      });
    }
  }, [category, myRoutine, isLoading]);

  return (
    <MainLayout isLoading={isLoading}>
      <div>
        <Title>오늘의 루틴</Title>
        <RoutineBox>
          {myRoutine.length > 0 ? (
            myRoutine.map((data, i) => (
              <MyRoutineCard
                key={data.routineId}
                routineId={data.routineId}
                title={data.name}
                isCompleted={data.isCompleted}
                isLast={data.length === i + 1}
              />
            ))
          ) : (
            <NoRoutineWrapper>
              <NoRoutineText>현재 진행 중인 루틴이 없습니다.</NoRoutineText>
              <NoRoutineText>내 일상에 만들고 싶은 루틴을 추가해보세요!</NoRoutineText>
            </NoRoutineWrapper>
          )}
        </RoutineBox>
      </div>
      <Line />

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
          {allRoutinesByCategory.map((data, i) => (
            <RoutineCard
              key={data.id}
              routineId={data.id}
              title={data.name}
              isRegistered={data.selected}
              isLast={data.length === i + 1}
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

const NoRoutineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
`;

const NoRoutineText = styled.p`
  margin: 8px 0;
`;
