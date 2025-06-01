import styled from "styled-components";

const MonthCarousel = (props) => {
  const { selectedDate, onClick } = props;
  return (
    <Container>
      <CarouselButton onClick={onClick("prev")}>〈</CarouselButton>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Text>{selectedDate.year + "년"}</Text>
        <Text style={{ width: "46px", textAlign: "right" }}>{selectedDate.month + "월"}</Text>
      </div>
      <CarouselButton onClick={onClick("next")}>〉</CarouselButton>
    </Container>
  );
};

export default MonthCarousel;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  align-items: center;
`;

const CarouselButton = styled.div`
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
