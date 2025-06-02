import { useEffect } from "react";
import Container from "./Container";
import Main from "./Main";
import TopNav from "./TopNav";
import { useDispatch } from "react-redux";
import { fetchMyInfo } from "../../store/thunks/user";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // TODO dispatch fetchMyInfo 필요하면 추가
      navigate("/");
    }
  }, [dispatch, navigate]);

  return (
    <Container>
      <TopNav />
      <Main>{children}</Main>
    </Container>
  );
};

export default AuthLayout;
