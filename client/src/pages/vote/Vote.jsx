import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../App";

const Vote = () => {
  const { user, score, setShowAlert, setAlertState } = useContext(UserContext);

  return <Outlet context={{ user, score, setShowAlert, setAlertState }} />;
};

export default Vote;
