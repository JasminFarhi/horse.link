import { Route, Routes, Navigate, HashRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard_Logic";
import HorseRace from "./pages/HorseRace/HorseRace_Logic";
import Market from "./pages/Market/Market_Logic";
import VaultList from "./pages/VaultList/VaultList_Logic";
import Bets from "./pages/Bets/Bets_Logic";
import { FaucetPage } from "./pages/Faucet";

const Navigation = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/results" element={<Results />} /> */}
        <Route path="/vaults" element={<VaultList />} />
        <Route path="/markets" element={<Market />} />
        <Route path="/history" element={<Bets />} />
        <Route path="/horses/:track/:number" element={<HorseRace />} />
        <Route path="/faucet" element={<FaucetPage />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </HashRouter>
  );
};

export default Navigation;
