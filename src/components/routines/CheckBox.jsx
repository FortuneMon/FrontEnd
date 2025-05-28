import styled from "styled-components";
import AppColor from "../../utils/AppColor";

const CheckBox = (props) => {
  const { checked, onClick } = props;
  return (
    <Container
      style={{
        backgroundColor: checked ? AppColor.checkbox.checked : AppColor.checkbox.unChecked,
        boxShadow: checked ? "0" : `0 0 0 2px ${AppColor.border.gray} inset`,
      }}
      onClick={onClick}
    >
      {checked ? <Check>✓</Check> : null}
    </Container>
  );
};

export default CheckBox;

const Container = styled.div`
  border-radius: 100%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  cursor: pointer;
`;

const Check = styled.p`
  font-weight: bold;
  color: ${AppColor.text.white};
  font-size: 14px;
`;
