import { useState } from "react";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import styled from "styled-components";
import MenuDropDown from "./common/styles/MenuDropDown";

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
        <>
          <Home />
          <Footer />
        </>
      )}
    </Rootdiv>
  );
};

export default App;
