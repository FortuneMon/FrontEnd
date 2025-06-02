import styled from "styled-components";
import MainLayout from "../components/layouts/MainLayout";
import Title from "../components/layouts/Title";
import DateCarousel from "../components/charts/DateCarousel";
import { useCallback, useEffect, useMemo, useState } from "react";
import AppColor from "../utils/AppColor";
import Calendar from "../components/charts/Calendar";
import { fetchMyStatistics } from "../apis/RoutineApi";
import { getRandomItems } from "../utils/AppUtils";
import useLoginLoading from "../hooks/useLoginLoading";

const ChartPage = () => {
  const { isLoading } = useLoginLoading();

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

  const [statistics, setStatistics] = useState([]);

  const calendarThemeColorList = useMemo(() => {
    return getRandomItems(AppColor.chartCalendarThemeColors, statistics.length);
  }, [statistics]);

  useEffect(() => {
    if (!isLoading) {
      fetchMyStatistics(selectedDate.year, selectedDate.month).then((s) => {
        setStatistics(s);
      });
    }
  }, [isLoading, selectedDate]);

  return (
    <MainLayout isLoading={isLoading}>
      <Title>통계</Title>
      <FlexBox>
        <DateCarousel selectedDate={selectedDate} onClick={onClickDateCarousel} />
        <GridBox>
          {statistics.map((s, i) => (
            <Calendar
              key={s.routineId}
              routineName={s.routineName}
              year={selectedDate.year}
              month={selectedDate.month}
              data={s.daysStatistics}
              themeColor={calendarThemeColorList[i]}
            />
          ))}
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
