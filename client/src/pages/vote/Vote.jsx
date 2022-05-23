import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../App";

const Vote = () => {
  const { user } = useContext(UserContext);

  return <Outlet user={user} />;
};

export default Vote;
