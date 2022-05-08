import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoanList from "./pages/LoanList";
import Navigation from "./components/Navigation";
import { MenuDropDown, Rootdiv } from "./common/styles";
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
