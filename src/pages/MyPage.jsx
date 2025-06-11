import { useCallback } from "react";
import styled from "styled-components";
import MainLayout from "../components/layouts/MainLayout";
import Title from "../components/layouts/Title";
import { useNavigate } from "react-router-dom";
import useLoginLoading from "../hooks/useLoginLoading";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectMyInfo } from "../store/slices/user";
import Loading from "../components/common/Loading";

const MyPage = () => {
  const { isLoading } = useLoginLoading();
  const dispatch = useDispatch();

  const user = useSelector(selectMyInfo);

  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  if (isLoading || user === null) return <Loading />;

  return (
    <MainLayout isLoading={isLoading}>
      <Title>내 정보</Title>
      <FlexBox>
        <UserBoxLogin>
          <UserBox>
            <img src={user.profileImage || "img/UserImg.png"} alt="user" />
            <NameBox>
              <UserName>{user.nickName}</UserName>
              <PokeName>
                <img src="img/Partner.png" alt="partner" />
                &nbsp;{user.pokemonName || "파트너 포켓몬"}
              </PokeName>
            </NameBox>
            {user.url && user.pokemonId ? (
              <img src={user.url} alt="logo" />
            ) : (
              <NoParterPokemon>
                파트너 포켓몬을<br></br>설정해주세요
              </NoParterPokemon>
            )}
          </UserBox>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </UserBoxLogin>

        <ContentBox>
          <Content onClick={() => navigate("/pokeball")}>
            <div className="corner top-left" />
            <div className="corner top-right" />
            <div className="corner bottom-left" />
            <div className="corner bottom-right" />
            <img src="img/MonsterBall.png" alt="ball" />
            <SubTitle>포켓몬 뽑기</SubTitle>
          </Content>
          <Content onClick={() => navigate("/pokedev")}>
            <div className="corner top-left" />
            <div className="corner top-right" />
            <div className="corner bottom-left" />
            <div className="corner bottom-right" />
            <img src="img/PokeDex.png" alt="dex" />
            <SubTitle>포켓몬 도감</SubTitle>
          </Content>
        </ContentBox>
      </FlexBox>
    </MainLayout>
  );
};

export default MyPage;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-height: calc(100% - 100px);
  width: 100%;
`;

const UserBoxLogin = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #f4f4f4;
  border-radius: 1rem;

  box-shadow: rgb(0, 0, 0, 0.1) 3px 3px 6px 1px;

  img {
    width: 100px;
  }
`;

const UserBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NameBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const UserName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;
const PokeName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #656565;

  img {
    width: 1rem;
    height: 1rem;
  }
`;

const NoParterPokemon = styled.div`
  width: 100px;
  font-size: 0.9rem;
  color: #aaa;
  fontstyle: italic;
`;

const LogoutButton = styled.div`
  width: 80%;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #656565;
  cursor: pointer;
  margin-top: 20px;
  text-align: center;
`;

const ContentBox = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f4f4f4;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 2rem;
  border-radius: 1rem;

  box-shadow: rgb(0, 0, 0, 0.1) 3px 3px 6px 1px;
`;

const Content = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 1rem;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: pointer;

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }

  &:hover .corner {
    opacity: 1;
  }

  .corner {
    position: absolute;
    width: 150px;
    height: 150px;
    opacity: 0;
  }

  /* 각 모서리의 선 두 개: 가로 + 세로 */
  .corner::before,
  .corner::after {
    content: "";
    position: absolute;
    background-color: black;
  }

  /* 각 corner 위치별 스타일 */
  .top-left::before {
    width: 15px;
    height: 4px;
    top: 0;
    left: 0;
  }
  .top-left::after {
    width: 4px;
    height: 15px;
    top: 0;
    left: 0;
  }

  .top-right::before {
    width: 15px;
    height: 4px;
    top: 0;
    right: 0;
  }
  .top-right::after {
    width: 4px;
    height: 15px;
    top: 0;
    right: 0;
  }

  .bottom-left::before {
    width: 15px;
    height: 4px;
    bottom: 0;
    left: 0;
  }
  .bottom-left::after {
    width: 4px;
    height: 15px;
    bottom: 0;
    left: 0;
  }

  .bottom-right::before {
    width: 15px;
    height: 4px;
    bottom: 0;
    right: 0;
  }
  .bottom-right::after {
    width: 4px;
    height: 15px;
    bottom: 0;
    right: 0;
  }
`;
const SubTitle = styled.h3`
  margin: 0;
`;
