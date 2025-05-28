import Container from "./Container";
import Main from "./Main";
import TopNav from "./TopNav";
import Nav from "./Nav";

const MainLayout = ({ children }) => {
  return (
    <Container>
      <TopNav />
      <Main>{children}</Main>
      <Nav />
    </Container>
  );
};

export default MainLayout;
