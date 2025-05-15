import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Nav from "../components/Nav";
import TopNav from "../components/TopNav";
import { useNavContext } from "../apis/NavContext";

const Home = () => {
  const { setActiveNav } = useNavContext();

  useEffect(() => {
    setActiveNav(0);
  }, []);

  return (
    <Container>
      <TopNav></TopNav>
      <Main></Main>
      <Nav></Nav>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  // position: relative;
`;

const Main = styled.div`
  position: relative;
  top: 50px;
  background-color: #f5f5f5;
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
