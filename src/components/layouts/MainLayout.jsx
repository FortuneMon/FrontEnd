import Container from "./Container";
import Main from "./Main";
import TopNav from "./TopNav";
import Nav from "./Nav";
import Loading from "../common/Loading";

const MainLayout = ({ children, isLoading }) => {
  return (
    <Container>
      <TopNav />
      {isLoading ? <Loading /> : <Main>{children}</Main>}
      <Nav />
    </Container>
  );
};

export default MainLayout;
