import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Rootdiv } from "./common";
import Navigation from "./components/Navigation";
import MenuDropDown from "./components/MenuDropDown";
import Home from "./pages/Home";
import LoanList from "./pages/LoanList";
import LoanDetail from "./pages/LoanDetail";
import MyPage from "./pages/MyPage";

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
          <Route path="/loan/:hash" element={<LoanDetail />} />
          <Route path="/profile/wallet" element={<MyPage />} />
        </Routes>
      )}
    </Rootdiv>
  );
};

export default App;
