import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Rootdiv, HelperAbi } from "./common";
import Navigation from "./components/Navigation";
import MenuDropDown from "./components/MenuDropDown";
import Home from "./pages/Home";
import LoanList from "./pages/LoanList";
import LoanDetail from "./pages/LoanDetail";
import MyPage from "./pages/MyPage";
import TradeApp from "./pages/TradeApp";
import IOffer from "./pages/IOffer";
import Trade from "./pages/Trade";
import ConfirmTrade from "./pages/ConfirmTrade";
import IReceive from "./pages/IReceive";
import CreatedTrade from "./pages/CreatedTrade";

export const UserContext = createContext({
  user: null,
  helperContract: null,
  setUser: () => {},
});

const App = () => {
  const [dropdown, setDropdown] = useState(false);
  const [helperContract, setHelperContract] = useState(null);
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

    setHelperContract((prev) => {
      const contract = new window.caver.contract(
        HelperAbi,
        process.env.REACT_APP_HELPER_CONTRACT_ADDRESS
      );

      return contract;
    });
  }, [user]);

  const handleDropDown = () => {
    setDropdown((prev) => {
      return !prev;
    });
  };

  return (
    <UserContext.Provider value={{ user, helperContract, setUser }}>
      <Rootdiv>
        <Navigation dropdown={dropdown} handleDropDown={handleDropDown} />

        {dropdown ? (
          <MenuDropDown handleDropDown={handleDropDown} />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loans/listings" element={<LoanList />} />
            <Route path="/loans/:hash" element={<LoanDetail />} />
            <Route path="/loans/create" element={<LoanDetail create />} />
            <Route path="/loans/:hash/edit" element={<LoanDetail edit />} />
            <Route path="/profile/wallet" element={<MyPage />} />
            <Route path="/trade-create" element={<Trade />}>
              <Route index element={<TradeApp />} />
              <Route path="add-counterparty-wallet" element={<IReceive />} />
              <Route path="your-offer-selection" element={<IOffer />} />
              <Route path="confirm-trade" element={<ConfirmTrade />} />
              <Route path="created" element={<CreatedTrade />} />
            </Route>
          </Routes>
        )}
      </Rootdiv>
    </UserContext.Provider>
  );
};

export default App;
