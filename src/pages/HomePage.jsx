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

const HomePage = () => {
  const dispatch = useDispatch();

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
    dispatch(fetchMyRoutines());
  }, [dispatch]);

  useEffect(() => {
    fetchAllRoutinesByCategory(category).then((data) => {
      setAllRoutinesByCategory(data);
    });
  }, [category, myRoutine]);

  return (
    <MainLayout>
      <div>
        <Title>오늘의 루틴</Title>
        <RoutineBox>
          {myRoutine.map((data, i) => (
            <MyRoutineCard
              key={data.routineId}
              routineId={data.routineId}
              title={data.name}
              isCompleted={data.isCompleted}
              isLast={data.length === i + 1}
            />
          ))}
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
