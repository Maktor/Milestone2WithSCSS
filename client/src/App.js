import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage.js";
import BudgetInputPage from "./pages/BudgetInput/BudgetInput.js";
import NecessarySpending from "./pages/NecessarySpending/NecessarySpending";
import SpendingSummary from "./pages/SpendingSummary/SpendingSummary";

//Using JSX. Controlling the routes
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/budgetinput" element={<BudgetInputPage />} />
        <Route path="/necessaryspending" element={<NecessarySpending />} />
        <Route path="/spendingsummary" element={<SpendingSummary />} />
      </Routes>
    </Router>
  );
}

export default App;