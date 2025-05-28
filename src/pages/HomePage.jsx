import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Nav from "../components/layouts/Nav";
import TopNav from "../components/layouts/TopNav";
import Title from "../components/layouts/Title";
import { useNavContext } from "../apis/NavContext";
import MainLayout from "../components/layouts/MainLayout";

const HomePage = () => {
  // const { setActiveNav } = useNavContext();
  // useEffect(() => {
  //   setActiveNav(0);
  // }, []);

  return (
    <MainLayout>
      <Title>오늘의 루틴</Title>
      <FlexBox></FlexBox>
    </MainLayout>
  );
};

export default HomePage;

const FlexBox = styled.div`
  // display: flex;
`;
