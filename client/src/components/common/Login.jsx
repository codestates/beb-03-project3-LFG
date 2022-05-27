import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../App";

const LoginWrapper = styled.div`
  cursor: pointer;
`;

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser, score, setShowAlert, setAlertState } =
    useContext(UserContext);

  const handleLogin = async () => {
    if (!user) {
      if (typeof window.klaytn !== "undefined") {
        const accounts = await window.klaytn.enable();
        setUser((prev) => accounts[0]);
      } else {
        setAlertState((prev) => {
          return {
            message: "Install KaiKas!!",
            status: "FAILED",
          };
        });
        setShowAlert(true);
      }
    } else {
      navigate("/profile/wallet");
    }
  };

  return (
    <LoginWrapper onClick={handleLogin}>
      {!user
        ? "Login"
        : `${user.slice(2, 5)}...${user.slice(-3)} (${
            score.probability === "" ? 0 : score.probability
          }%)`}
    </LoginWrapper>
  );
};

export default Login;
