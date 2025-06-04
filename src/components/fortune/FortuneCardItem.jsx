// components/fortune/FortuneCardItem.jsx
import React from "react";
import styled from "styled-components";

const FortuneCardItem = ({ icon, title, content }) => {
  return (
    <FortuneCard>
      <FortuneCategoryTitle>
        {icon} {title}
      </FortuneCategoryTitle>
      <FortuneText>{content}</FortuneText>
    </FortuneCard>
  );
};

export default FortuneCardItem;

const FortuneCard = styled.div`
  width: 100%;
`;

const FortuneCategoryTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 6px;
  color: black; /* 포인트 색상 */
`;

const FortuneText = styled.div`
  font-size: 1.2rem;
  text-align: center;
  color: #333;
  background-color: #f7f7f7;
  padding: 1rem;
  border-radius: 10px;
  width: 90%;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(150, 150, 150);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(150, 150, 150, 0.1);
  }
`;
