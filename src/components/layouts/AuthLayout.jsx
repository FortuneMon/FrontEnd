import Container from "./Container";
import Main from "./Main";
import TopNav from "./TopNav";

const AuthLayout = ({ children }) => {
  return (
    <Container>
      <TopNav />
      <Main>{children}</Main>
    </Container>
  );
};

export default AuthLayout;
