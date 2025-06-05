import styled, { keyframes } from "styled-components";
import AppColor from "../../utils/AppColor";
import { useMemo } from "react";

const LoadingSpinner = (props) => {
  const { size, style } = props;

  const _size = useMemo(() => (size ? { width: size, height: size } : {}), [size]);

  return (
    <SpinnerWrapper style={{ ..._size, ...style }}>
      <div>
        <Spinner style={_size} />
      </div>
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  padding: 2rem;
`;

const Spinner = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid ${AppColor.background.red};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;
