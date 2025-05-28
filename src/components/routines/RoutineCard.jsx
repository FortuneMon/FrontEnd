import { useCallback } from "react";
import styled from "styled-components";
import AppColor from "../../utils/AppColor";
import SelectRoutineButton from "../routines/SelectRoutineButton";

const RoutineCard = (props) => {
  const { routineId, title, isRegistered, isLast } = props;

  const onClick = useCallback(() => {
    //TODO API 연동 후 루틴 추가 또는 제거
    console.log(routineId, isRegistered, "clicked");
  }, [routineId, isRegistered]);

  return (
    <Container style={isLast ? { borderBottom: "0px" } : null}>
      {/* TODO 습관별 로고(아이콘) 추가 논의 후 추가 */}
      {/* <img src="/img/Logo.png" alt="Logo" /> */}
      <Text>{title}</Text>
      <SelectRoutineButton isPlus={!isRegistered} onClick={onClick} />
    </Container>
  );
};

export default RoutineCard;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 10px 20px;
  border-bottom: 0.5px solid ${AppColor.border.gray};
`;

const Text = styled.p``;
