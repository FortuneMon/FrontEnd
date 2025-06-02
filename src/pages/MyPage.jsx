import { useEffect, useState } from "react";
import styled from "styled-components";
import TopNav from "../components/layouts/TopNav";
import Nav from "../components/layouts/Nav";
import MainLayout from "../components/layouts/MainLayout";
import Title from "../components/layouts/Title";
import { useNavigate } from "react-router-dom";
import { fetchMyInfo } from "../apis/UserApi";
import useLoginLoading from "../hooks/useLoginLoading";

const MyPage = () => {
  const { isLoading } = useLoginLoading();

  const [user, setUser] = useState(null); // 사용자 정보 저장
  const [loading, setLoading] = useState(true); // 로딩 상태

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const result = await fetchMyInfo();
        setUser(result);
      } catch (error) {
        console.error("내 정보 불러오기 실패", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [isLoading]);

  const handleLogout = () => {
    // 로그아웃 API 호출 + 상태 초기화
    // axios.post("/api/logout").then(() => {
    //   setUser(null);
    // });
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <MainLayout isLoading={isLoading}>
      <Title>내 정보</Title>
      <FlexBox>
        {user ? (
          <UserBoxLogin>
            <UserBox>
              <img src={user.profileImage || "img/UserImg.png"} alt="user" />
              <NameBox>
                <UserName>{user.nickName}</UserName>
                <PokeName>
                  <img src="img/Partner.png" alt="partner" />
                  &nbsp;{user.partnerPokemon || "파트너 포켓몬"}
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
            <ButtonLogin onClick={handleLogout}>로그아웃</ButtonLogin>
          </UserBoxLogin>
        ) : (
          <UserBoxLogout>
            <ButtonLogout onClick={() => navigate("/login")}>
              로그인
            </ButtonLogout>
          </UserBoxLogout>
        )}

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
