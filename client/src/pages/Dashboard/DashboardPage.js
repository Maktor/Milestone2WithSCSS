// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {

  const navigate = useNavigate();

  return (
    <div className="DashboardPage">
      <h1>Dashboard</h1>
      <form>
        <button onClick={function(){navigate("/budgetinput");}}>Budget Input</button><br/><br/>
        <button onClick={function(){navigate("/");}}>Logout</button>
      </form>
    </div>
  );
}

export default DashboardPage;