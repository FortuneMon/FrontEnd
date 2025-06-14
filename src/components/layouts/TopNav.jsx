import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TopNav = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <AppTitle onClick={() => navigate("/")}>
          <img src="/img/Logo.png" alt="Logo" />
          <MainTitle>포츈몬</MainTitle>
        </AppTitle>
      </Container>
    </>
  );
};

export default TopNav;

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 600px;
  height: 50px;
  border-bottom: 1px solid #c9c9c9;
  background-color: white;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 1rem;
  z-index: 100;

  img {
    width: 1.2rem;
  }

  @media (max-width: 600px) {
    img {
      width: 1rem;
    }
  }
`;

const AppTitle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  column-gap: 8px;
`;

const MainTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;
