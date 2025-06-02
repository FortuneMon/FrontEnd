import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../store/slices/user";
import { fetchMyInfo } from "../store/thunks/user";

export default function useLoginLoading() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
      return;
    }
    if (!isLoggedIn) {
      dispatch(fetchMyInfo());
      return;
    }
    setIsLoading(false);
  }, [navigate, dispatch, isLoggedIn]);

  return { isLoading };
}
