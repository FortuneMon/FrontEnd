import styled from "styled-components";
import AppColor from "../../utils/AppColor";
import { useMemo } from "react";
import { getTotalDays, makeCalendarArray } from "../../utils/AppUtils";
import Day from "./Day";

const Calendar = (props) => {
  const { routineName, year, month, data } = props;
  const calendarArray = useMemo(() => {
    console.log(makeCalendarArray(year, month));
    return makeCalendarArray(year, month);
  }, [year, month]);

  const achivement = useMemo(() => {
    const totalDays = getTotalDays(year, month);
    // TODO API 연동 후 구현
    const count = 14;
    return { percentage: (count / totalDays).toFixed(4) * 100, count };
  }, [year, month, data]);

  return (
    <Conatiner>
      <RoutineName>{routineName}</RoutineName>
      <Box>
        {calendarArray.map((d) => (
          <Day date={d} color={"#ae0df0"} isDone={true} />
        ))}
      </Box>
      <Achivement>
        <Value>성취율: {achivement.percentage}%</Value>
        <VerticalLine>|</VerticalLine>
        <Value>횟수: {achivement.count}</Value>
      </Achivement>
    </Conatiner>
  );
};

export default Calendar;

const Conatiner = styled.div`
  background-color: ${AppColor.white};
  border-radius: 12px;
  padding: 14px;
  box-shadow: rgb(0, 0, 0, 0.1) 3px 4px 18px 1px;
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-row-gap: 4px;
  grid-column-gap: 4px;
  margin-top: 10px;
`;

const RoutineName = styled.h3`
  margin: 0;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
`;

const Achivement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  margin: 14px 0 0;
`;

const Value = styled.p`
  margin: 0;
  font-weight; bold;
  font-size: 13px;
`;

const VerticalLine = styled.p`
  margin: 0;
  color: ${AppColor.border.gray};
  font-size: 14px;
`;
