import styled from "styled-components";
import AppColor from "../../utils/AppColor";

const SelectRoutineButton = (props) => {
  const { onClick, isPlus } = props;
  return (
    <Button
      onClick={onClick}
      style={{ backgroundColor: isPlus ? AppColor.background.lightgray : AppColor.background.red }}
    >
      <Text
        style={{
          color: isPlus ? AppColor.text.gray : AppColor.text.white,
        }}
      >
        {isPlus ? "+" : "-"}
      </Text>
    </Button>
  );
};

export default SelectRoutineButton;

const Button = styled.button`
  border-radius: 100%;
  width: 40px;
  height: 40px;
  border: 0;
  align-items: center;
  justify-content: center;
  padding: 0px;
  cursor: pointer;
`;

const Text = styled.p`
  font-size: 30px;
  margin: 0px;
`;
