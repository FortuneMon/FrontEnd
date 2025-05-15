import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const TopNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  const [isFocused, setIsFocused] = useState(false);

  // 쿼리 파라미터로 검색어 유지
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    const isFromHome = location.state?.from === "home";

    if (query && !isFromHome) {
      setIsSearchOpen(true);
      setSearchText(query);
    } else {
      setIsSearchOpen(false);
      setSearchText("");
    }
  }, [location.search]);

  // 로컬스토리지에서 최근 검색어 불러오기
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(saved);
  }, []);

  // 포커스 이벤트 핸들러
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    // 딜레이 안 주면 클릭 전에 사라져버림
    setTimeout(() => setIsFocused(false), 150);
  };

  const saveToHistory = (term) => {
    const updated = [term, ...searchHistory.filter((t) => t !== term)].slice(
      0,
      10
    );
    setSearchHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  };

  const handleSearch = () => {
    const trimmed = searchText.trim();
    if (trimmed) {
      saveToHistory(trimmed);
      navigate(`/searchpage?query=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleBack = () => {
    if (location.pathname === "/searchpage") {
      // 검색결과 페이지에서는 뒤로가기
      navigate(-1);
    } else {
      // 홈 화면에서는 그냥 검색창 닫기
      setIsSearchOpen(false);
      setSearchText("");
    }
  };

  const handleDeleteHistory = (term) => {
    const updated = searchHistory.filter((t) => t !== term);
    setSearchHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  };

  const handleClickHistory = (term) => {
    setSearchText(term);
    saveToHistory(term);
    navigate(`/searchpage?query=${encodeURIComponent(term)}`);
  };

  return (
    <>
      <Container>
        <AppTitle onClick={() => navigate("/")}>
          <img src="/img/Logo.png" alt="Logo" />
          <MainTitle>FortuneMon</MainTitle>
        </AppTitle>
      </Container>
    </>
  );
};

export default TopNav;

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 600px;
  height: 50px;
  border-bottom: 1px solid #c9c9c9;
  background-color: white;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 1rem;
  z-index: 100;

  img {
    width: 1.2rem;
  }

  @media (max-width: 600px) {
    img {
      width: 1rem;
    }
  }
`;

const AppTitle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const MainTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;
