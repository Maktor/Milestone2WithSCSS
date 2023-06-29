import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BudgetInput() {

// const [days, setDays] = useState("0");
const [budget, setBudget] = useState("0");

const navigate = useNavigate();

const submitButton = async (event) => {
    event.preventDefault();
    let monthChosen = document.getElementById("month")
    let month = monthChosen.value
   if (budget <= 0 )
   {
      alert("Invalid values entered, please try again.")
   }
   else
   {
    localStorage.setItem("month", month);
    localStorage.setItem("budget", budget);
    navigate("/necessaryspending")
   }


    console.log(budget)
    console.log(month)
  };

  return (
    <div className="BudgetInput">
      <h1>Budget Input</h1>
      <form onSubmit={submitButton}>
      Month: <select name="month" id="month">
      <option value="31">January</option>
      <option value="28">February</option>
      <option value="31">March</option>
      <option value="30">April</option>
      <option value="31">May</option>
      <option value="30">June</option>
      <option value="31">July</option>
      <option value="31">August</option>
      <option value="30">September</option>
      <option value="31">October</option>
      <option value="30">November</option>
      <option value="31">December</option>
      </select><br/><br/>
        Monthly Income: <input type="number" placeholder="Budget" value={budget} onChange={(e) => setBudget(e.target.value)}></input><br/><br/>
        <br/><button type="submit" >Necessary Spending</button><br/><br/>
      </form>

      <br/><button onClick={function(){navigate("/dashboard");}}>Back</button><br/><br/>

    </div>
  );
}

export default BudgetInput;
