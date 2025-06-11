import AppColor from "../../utils/AppColor";
import styled from "styled-components";

export default function TextInput({
  wrapperStyle,
  containerStyle,
  error,
  helperText,
  endAdornment,
  ...rest
}) {
  return (
    <Wrapper style={wrapperStyle}>
      <Container style={containerStyle}>
        <Input {...rest} />
        {endAdornment && endAdornment}
      </Container>
      {error && helperText && <ErrorText>{helperText}</ErrorText>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Container = styled.div`
  width: 100%;
  height: 30px;
  border-radius: 8px;
  border: 1px solid ${AppColor.border.gray};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  background-color: ${AppColor.background.lightgray};
`;

const Input = styled.input`
  color: ${AppColor.text.main};
  background-color: ${AppColor.background.lightgray};
  border: none;
  width: 100%;
  height: 100%;
  padding: 0 8px;
  font-weight: 500;
  flex: 1;
  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${AppColor.text.lightgray};
  }
`;

const ErrorText = styled.p`
  color: ${AppColor.text.error};
  font-size: 12px;
  line-height: 1.5;
  margin: 6px 0 2px;
  position: absolute;
`;
