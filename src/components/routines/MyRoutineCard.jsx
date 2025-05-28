import { useCallback } from "react";
import styled from "styled-components";
import CheckBox from "./CheckBox";
import AppColor from "../../utils/AppColor";

const MyRoutineCard = (props) => {
  const { routineId, title, isCompleted, isLast } = props;

  const onClick = useCallback(() => {
    //TODO API 연동 후 수행 여부 체크
    console.log(routineId, isCompleted, "clicked");
  }, [routineId, isCompleted]);

  return (
    <Container style={isLast ? { borderBottom: "0px" } : null}>
      {/* TODO 습관별 로고(아이콘) 추가 논의 후 추가 */}
      {/* <img src="/img/Logo.png" alt="Logo" /> */}
      <Text>{title}</Text>
      <CheckBox checked={isCompleted} onClick={onClick} />
    </Container>
  );
};

export default MyRoutineCard;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 10px 20px;
  border-bottom: 0.5px solid ${AppColor.border.gray};
`;

const Text = styled.p``;
