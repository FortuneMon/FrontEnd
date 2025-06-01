import styled from "styled-components";
import { useMemo } from "react";
import dayjs from "dayjs";
import AppColor from "../../utils/AppColor";

export default function Day(props) {
  const { date, color, isDone } = props;

  const extractedDate = useMemo(() => dayjs(date).get("date"), [date]);

  return (
    <Container
      style={{
        backgroundColor: date === null ? AppColor.white : isDone ? color : AppColor.background.lightgray,
      }}
    >
      {date === null ? "" : extractedDate}
    </Container>
  );
}

const Container = styled.div`
  border-radius: 8px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  padding: 2px;
`;
