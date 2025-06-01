import styled from "styled-components";
import AppColor from "../../utils/AppColor";

export default function CommonButton({ label, buttonStyle, ...props }) {
  return (
    <Button style={buttonStyle} {...props}>
      {label}
    </Button>
  );
}

const Button = styled.button`
  cursor: pointer;
  padding: 8px 16px;
  background-color: ${AppColor.background.black};
  color: ${AppColor.white};
  border: none;
  border-radius: 10px;
  // box-shadow: rgb(0, 0, 0, 0.2) 0px 3px 1px -2px, rgb(0, 0, 0, 0.14) 0px 2px 2px 0px, rgb(0, 0, 0, 0.12) 0px 1px 5px 0px;

  &:disabled {
    background-color: rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.26);
  }
`;
