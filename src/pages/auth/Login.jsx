import styled from "styled-components";
import AuthLayout from "../../components/layouts/AuthLayout";
import Title from "../../components/layouts/Title";
import TextInput from "../../components/common/TextInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import CommonButton from "../../components/common/CommonButton";
import AppColor from "../../utils/AppColor";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../apis/UserApi";
import { useDispatch } from "react-redux";
import { setMyInfo } from "../../store/slices/user";
import { getMyInfo } from "../../store/thunks/user";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, errors, touched, isValid, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      id: "",
      password: "",
    },
    validationSchema: Yup.object({
      id: Yup.string().required("아이디를 입력해 주세요."),
      password: Yup.string()
        .min(8, "8자리 이상 비밀번호를 입력해 주세요.")
        .required("비밀번호를 입력해 주세요."),
    }),
    onSubmit: (values) => {
      login({ loginId: values.id, password: values.password })
        .then(() => {
          // TODO 내 정보 조회 API 추가 되면 수정
          // dispatch(getMyInfo());
          dispatch(setMyInfo({ nickname: "테스트1", partner: { name: "이상해씨" } }));
          toast.success("로그인 성공");
          navigate("/");
        })
        .catch((error) => {
          toast.error("로그인 실패");
        });
    },
  });

  return (
    <AuthLayout>
      <Container>
        <Title>로그인</Title>
        <Box>
          <Form onSubmit={handleSubmit}>
            <TextInput
              name="id"
              placeholder="아이디"
              error={Boolean(touched.id && errors.id)}
              helperText={errors.id}
              value={values.id}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <TextInput
              name="password"
              placeholder="비밀번호"
              type="password"
              error={Boolean(touched.password && errors.password)}
              helperText={errors.password}
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <CommonButton
              label="로그인"
              type="submit"
              disabled={!isValid}
              buttonStyle={{
                width: "100%",
                height: "48px",
                fontSize: "18px",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            />
          </Form>
          <CommonButton
            label="회원가입"
            onClick={() => navigate("/signup")}
            buttonStyle={{
              backgroundColor: AppColor.white,
              border: `1px solid ${AppColor.border.gray}`,
              color: AppColor.background.black,
              width: "100%",
              height: "48px",
              fontSize: "18px",
              fontWeight: "bold",
              marginTop: "-20px",
            }}
          />
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  row-gap: 40px;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px;
  row-gap: 30px;
`;
