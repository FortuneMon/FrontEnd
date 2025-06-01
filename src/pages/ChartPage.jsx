import styled from "styled-components";
import MainLayout from "../components/layouts/MainLayout";
import Title from "../components/layouts/Title";
import DateCarousel from "../components/charts/DateCarousel";
import { useCallback, useState } from "react";
import AppColor from "../utils/AppColor";
import Calendar from "../components/charts/Calendar";

const ChartPage = () => {
  const dummyData = {};

  const [selectedDate, setSelectedDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const onClickDateCarousel = useCallback(
    (direction) => () => {
      if (direction === "prev") {
        if (selectedDate.month === 1) {
          setSelectedDate((prev) => ({ year: prev.year - 1, month: 12 }));
          return;
        }
        setSelectedDate((prev) => ({ ...prev, month: prev.month - 1 }));
        return;
      }
      if (direction === "next") {
        if (selectedDate.month === 12) {
          setSelectedDate((prev) => ({ year: prev.year + 1, month: 1 }));
          return;
        }
        setSelectedDate((prev) => ({ ...prev, month: prev.month + 1 }));
        return;
      }
    },
    [selectedDate]
  );

  return (
    <MainLayout>
      <Title>통계</Title>
      <FlexBox>
        <DateCarousel selectedDate={selectedDate} onClick={onClickDateCarousel} />
        <GridBox>
          <Calendar routineName={"물마시기"} year={selectedDate.year} month={selectedDate.month} data={[]} />
          <Calendar routineName={"물마시기"} year={selectedDate.year} month={selectedDate.month} data={[]} />
          <Calendar routineName={"물마시기"} year={selectedDate.year} month={selectedDate.month} data={[]} />
        </GridBox>
      </FlexBox>
    </MainLayout>
  );
};

export default ChartPage;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${AppColor.background.lightgray};
  margin: 0.5rem -0.5rem 0;
`;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 14px;
  grid-column-gap: 14px;
  width: calc(100% - 40px);
  padding: 10px 0 20px;
`;
