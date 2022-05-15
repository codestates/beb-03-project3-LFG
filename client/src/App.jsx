import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Rootdiv } from "./common";
import Navigation from "./components/Navigation";
import MenuDropDown from "./components/MenuDropDown";
import LoadingSpinner from "./components/LoadingSpinner";
import Home from "./pages/Home";
import LoanList from "./pages/LoanList";
import LoanDetail from "./pages/LoanDetail";
import MyPage from "./pages/MyPage";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

const App = () => {
  const [dropdown, setDropdown] = useState(false);
  const [user, setUser] = useState(null);

  const isUnlocked = async () => {
    const ok = await window.klaytn._kaikas.isUnlocked();
    return ok;
  };

  useEffect(() => {
    isUnlocked().then(() => {
      setUser((prev) => window.klaytn.selectedAddress);
    });

    window.klaytn.on("accountsChanged", (accounts) => {
      setUser((prev) => accounts[0]);
    });
  }, []);

  const handleDropDown = () => {
    setDropdown((prev) => {
      return !prev;
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Rootdiv>
        <Navigation dropdown={dropdown} handleDropDown={handleDropDown} />

        {dropdown ? (
          <MenuDropDown handleDropDown={handleDropDown} />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loans/listings" element={<LoanList />} />
            <Route path="/loans/:hash" element={<LoanDetail />} />
            <Route path="/profile/wallet" element={<MyPage />} />

            <Route path="/loading" element={<LoadingSpinner />} />
          </Routes>
        )}
      </Rootdiv>
    </UserContext.Provider>
  );
};

export default App;
