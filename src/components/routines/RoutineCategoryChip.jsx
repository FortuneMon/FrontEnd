import styled from "styled-components";
import AppColor from "../../utils/AppColor";

const RoutineCategoryChip = (props) => {
  const { icon, title, isSelected, onClick } = props;
  return (
    <Container
      style={{ backgroundColor: isSelected ? AppColor.selected.selected : AppColor.selected.unSelected }}
      onClick={onClick}
    >
      <Text>{icon}</Text>
      <Text style={{ ...(isSelected && { fontWeight: "bold", color: AppColor.text.white }) }}>{title}</Text>
    </Container>
  );
};

export default RoutineCategoryChip;

const Container = styled.div`
  border-radius: 10px;
  border: 2px solid ${AppColor.border.gray};
  padding: 10px 16px;
  display: flex;
  column-gap: 10px;
  cursor: pointer;
`;

const Text = styled.p`
  margin: 0;
`;
