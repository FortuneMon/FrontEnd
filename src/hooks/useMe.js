import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMyInfo } from "../store/slices/user";

export default function useMe() {
  const [isLoggedIn, setIsLogedIn] = useState(false);

  const dispatch = useDispatch();

  const me = {};
  //TODO 유저 정보 조회하고, 저장 로그인 여부 체크할 때 사용
  // const { data: me } = useQuery([USER_QUERY_KEY.GET_MY_INFO], () => getMyInfo(), {
  //   onSuccess: (res) => {
  //     if (!res) return;
  //     setIsLogedIn(true);
  //     if (res.state === "PENDING") {
  //       router.push("/auth/nickname");
  //       return;
  //     }
  //     dispatch(setMyInfo(res));
  //   },
  //   onError: () => {
  //     setIsLogedIn(false);
  //     router.push("/auth/login");
  //   },
  //   enabled: !["/auth/login", "/auth/signup"].includes(router.pathname),
  //   retry: false,
  //   initialData: null,
  // });

  return { me, isLoggedIn };
}
