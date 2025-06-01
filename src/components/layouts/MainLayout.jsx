import Container from "./Container";
import Main from "./Main";
import TopNav from "./TopNav";
import Nav from "./Nav";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../store/slices/user";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  //TODO 내 정보 API 추가 후 수정
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/login");
  //   }
  // }, [isLoggedIn, navigate]);

  return (
    <Container>
      <TopNav />
      <Main>{children}</Main>
      <Nav />
    </Container>
  );
};

export default MainLayout;
