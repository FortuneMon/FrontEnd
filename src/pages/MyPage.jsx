import React, { useState } from "react";
import styled from "styled-components";
import TopNav from "../components/TopNav";
import Nav from "../components/Nav";

const MyPage = () => {
  // ✅ 임시 로그인 상태 (기본값: true → 로그인 상태로 시작)
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Container>
      <TopNav />
      <Main>
        <Title>내 정보</Title>
        <FlexBox>
          {isLoggedIn ? (
            <UserBoxLogin>
              <UserBox>
                <img src="img/UserImg.png" alt="user" />
                <NameBox>
                  <UserName>홍길동</UserName>
                  <PokeName>
                    <img src="img/Partner.png" alt="partner" />
                    &nbsp;파트너 포켓몬
                  </PokeName>
                </NameBox>
                <img src="img/Logo.png" alt="logo" />
              </UserBox>
              <ButtonLogin onClick={handleLogout}>로그아웃</ButtonLogin>
            </UserBoxLogin>
          ) : (
            <UserBoxLogout>
              <ButtonLogout onClick={handleLogin}>로그인</ButtonLogout>
            </UserBoxLogout>
          )}

          <ContentBox>
            <Content>
              <div className="corner top-left" />
              <div className="corner top-right" />
              <div className="corner bottom-left" />
              <div className="corner bottom-right" />
              <img src="img/MonsterBall.png" alt="ball" />
              <SubTitle>포켓몬 뽑기</SubTitle>
            </Content>
            <Content>
              <div className="corner top-left" />
              <div className="corner top-right" />
              <div className="corner bottom-left" />
              <div className="corner bottom-right" />
              <img src="img/PokeDex.png" alt="dex" />
              <SubTitle>포켓몬 도감</SubTitle>
            </Content>
          </ContentBox>
        </FlexBox>
      </Main>
      <Nav />
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  // position: relative;
`;

const Main = styled.div`
  position: relative;
  top: 50px;
  background-color: white;
  padding: 0.5rem;
  overflow-y: auto;
  height: 100%;
  max-height: calc(100% - 100px);
  box-sizing: border-box;

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

const Title = styled.h2`
  margin: 0;
  margin-left: 10px;
  margin-top: 10px;
`;

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
  img {
    width: 100px;
  }
`;

const UserBoxLogout = styled.div`
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

const ButtonLogin = styled.div`
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

const ButtonLogout = styled.div`
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
    transition: opacity 0.2s ease;
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
