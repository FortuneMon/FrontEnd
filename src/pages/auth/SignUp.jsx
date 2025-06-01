import styled from "styled-components";
import AuthLayout from "../../components/layouts/AuthLayout";
import Title from "../../components/layouts/Title";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/common/TextInput";
import CommonButton from "../../components/common/CommonButton";
import { useNavigate } from "react-router-dom";
import AppColor from "../../utils/AppColor";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { checkId, checkNickname, signup } from "../../apis/UserApi";

const SignUp = () => {
  const navigate = useNavigate();

  const [checked, setChecked] = useState({ id: false, nickname: false });

  const { values, errors, touched, isValid, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      id: "",
      password: "",
      rePassword: "",
      nickname: "",
    },
    validationSchema: Yup.object({
      id: Yup.string().required("아이디를 입력해 주세요."),
      password: Yup.string()
        .min(8, "8자리 이상 비밀번호를 입력해 주세요.")
        .required("비밀번호를 입력해 주세요."),
      rePassword: Yup.string()
        .min(8, "8자리 이상 비밀번호를 한번 더 입력해 주세요.")
        .required("비밀번호를 한번 더 입력해 주세요."),
      nickname: Yup.string().required("닉네임을 입력해 주세요."),
    }),
    validate: (values) => {
      const error = {};
      if (values.password && values.rePassword) {
        if (values.password !== values.rePassword) {
          error.rePassword = "비밀번호가 일치하지 않습니다.";
        }
      }
      return error;
    },
    onSubmit: (values) => {
      if (!checked.id) {
        toast.error("아이디 중복 체크를 진행해 주세요");
        return;
      }
      if (!checked.nickname) {
        toast.error("닉네임 중복 체크를 진행해 주세요");
        return;
      }
      signup({ loginId: values.id, password: values.password, nickname: values.nickname })
        .then(() => {
          toast.success("회원가입이 완료되었습니다!");
          navigate("/login");
        })
        .catch((error) => {
          toast.error("일시적 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        });
    },
  });

  // TODO 중복 체크 API 추가 되면 수정
  const onCheckId = useCallback(async () => {
    if (!values.id) return;
    const result = await checkId({ id: values.id });
    if (result) {
      setChecked((prev) => ({ ...prev, id: true }));
    } else {
      setChecked((prev) => ({ ...prev, id: false }));
    }
  }, [values]);

  const onCheckNickname = useCallback(async () => {
    if (!values.nickname) return;
    const result = await checkNickname({ nickname: values.nickname });
    if (result) {
      setChecked((prev) => ({ ...prev, nickname: true }));
    } else {
      setChecked((prev) => ({ ...prev, nickname: false }));
    }
  }, [values]);

  return (
    <AuthLayout>
      <Container>
        <Title>회원가입</Title>
        <Box>
          <Form onSubmit={handleSubmit}>
            <div style={{ display: "flex", position: "relative" }}>
              <TextInput
                name="id"
                placeholder="아이디"
                wrapperStyle={{ width: "calc(100% - 68px)" }}
                error={Boolean(touched.id && errors.id)}
                helperText={errors.id}
                value={values.id}
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setChecked((prev) => ({ ...prev, id: false }));
                }}
              />
              <CommonButton
                buttonStyle={{
                  position: "absolute",
                  right: "0px",
                  width: "58px",
                  height: "48px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
                type="button"
                label="중복 확인"
                onClick={onCheckId}
                disabled={checked.id}
              />
            </div>
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
            <TextInput
              name="rePassword"
              placeholder="비밀번호 확인"
              type="password"
              error={Boolean(touched.rePassword && errors.rePassword)}
              helperText={errors.rePassword}
              value={values.rePassword}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <div style={{ display: "flex", position: "relative" }}>
              <TextInput
                name="nickname"
                placeholder="닉네임"
                wrapperStyle={{ width: "calc(100% - 68px)" }}
                error={Boolean(touched.nickname && errors.nickname)}
                helperText={errors.nickname}
                value={values.nickname}
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setChecked((prev) => ({ ...prev, nickname: false }));
                }}
              />
              <CommonButton
                buttonStyle={{
                  position: "absolute",
                  right: "0px",
                  width: "58px",
                  height: "48px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
                type="button"
                label="중복 확인"
                onClick={onCheckNickname}
                disabled={checked.nickname}
              />
            </div>
            <CommonButton
              label="회원가입"
              type="submit"
              disabled={!isValid || !checked.id || !checked.nickname}
              buttonStyle={{
                width: "100%",
                height: "48px",
                fontSize: "18px",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            />
          </Form>
          <p style={{ margin: "-10px 0 0" }}>이미 계정이 있으신가요?</p>
          <CommonButton
            label="로그인"
            onClick={() => navigate("/login")}
            buttonStyle={{
              backgroundColor: AppColor.white,
              border: `1px solid ${AppColor.border.gray}`,
              color: AppColor.background.black,
              width: "100%",
              height: "48px",
              fontSize: "18px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          />
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default SignUp;

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
