import styled from "styled-components";
import AppColor from "../../utils/AppColor";
import { useMemo } from "react";
import { getTotalDays, makeCalendarArray } from "../../utils/AppUtils";
import Day from "./Day";

const Calendar = (props) => {
  const { routineName, year, month, data, themeColor } = props;

  const calendarArray = useMemo(() => {
    return makeCalendarArray(year, month).map((d) => {
      if (d === null) return null;
      if (!data[d]) {
        return { [d]: false };
      }
      return { [d]: data[d] };
    });
  }, [year, month, data]);

  const achivement = useMemo(() => {
    const totalDays = getTotalDays(year, month);
    let count = 0;
    for (let i = 0; i < calendarArray.length; i++) {
      if (calendarArray[i] === null) continue;
      if (Object.values(calendarArray[i])[0] === true) {
        count++;
      }
    }
    return { percentage: ((count / totalDays) * 100).toFixed(2), count };
  }, [year, month, calendarArray]);

  return (
    <Conatiner>
      <RoutineName>{routineName}</RoutineName>
      <Box>
        {calendarArray.map((d, i) => (
          <Day key={d + i} date={d} color={themeColor} />
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
