import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoanList from "./pages/LoanList";
import Navigation from "./components/Navigation";
import { MenuDropDown } from "./common/styles";
import styled from "styled-components";

const Rootdiv = styled.main`
  display: flex;
  flex-direction: column;
`;

const App = () => {
  const [dropdown, setDropdown] = useState(false);

  const handleDropDown = () => {
    setDropdown((prev) => {
      return !prev;
    });
  };

  return (
    <Rootdiv>
      <Navigation dropdown={dropdown} handleDropDown={handleDropDown} />

      {dropdown ? (
        <MenuDropDown handleDropDown={handleDropDown} />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loan/listings" element={<LoanList />} />
        </Routes>
      )}
    </Rootdiv>
  );
};

export default App;
