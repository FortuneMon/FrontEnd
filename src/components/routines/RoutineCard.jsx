import { useCallback } from "react";
import styled from "styled-components";
import AppColor from "../../utils/AppColor";
import SelectRoutineButton from "../routines/SelectRoutineButton";
import { useDispatch } from "react-redux";
import { addMyRoutine, deleteMyRoutine } from "../../store/thunks/user";

const RoutineCard = (props) => {
  const { routineId, title, isRegistered, isLast } = props;

  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    if (isRegistered) {
      dispatch(deleteMyRoutine(routineId));
    } else {
      dispatch(addMyRoutine(routineId));
    }
  }, [dispatch, routineId, isRegistered]);

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
