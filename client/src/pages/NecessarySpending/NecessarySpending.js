import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NecessarySpending() {

const [spendings, setSpendings] = useState([]);
const navigate = useNavigate();


  const addNecessarySpending = (event) => {
    event.preventDefault();

    // var year = new Date().getFullYear();
    
    // document.getElementById('date').setAttribute("min", year + "-01-01");
    // document.getElementById('date').setAttribute("max", year + "-12-31");

    document.getElementById('date').setAttribute("max", 31)
    document.getElementById('date').setAttribute("min", 1)


    const spendingName = document.getElementById("spendingName").value;
    const spendingAmount = document.getElementById("spendingAmount").value;
    const dueDate = document.getElementById("date").value;
    
    if (!spendingName) {
      alert("Please enter a spending name.");
    } else if (isNaN(spendingAmount)) {
      alert("Please enter a spending amount.");
    } else if (spendingAmount < 0) {
      alert("Spending amount must be greater than or equal to 0.");
    } else {
      setSpendings([...spendings, { name: spendingName, amount: spendingAmount, date: dueDate }]);
      document.getElementById("spendingName").value = "";
      document.getElementById("spendingAmount").value = "";
      console.table(spendings)
    }
  };

  return (
    <div className="NecessarySpending">
      <form onSubmit={addNecessarySpending}>
        <h2>Necessary Spendings</h2> 
        <label htmlFor="spendingName">Spending Name: </label>
        <input type="text" id="spendingName" placeholder="Spending Name"/><br/><br/>
        <label htmlFor="spendingAmount">Spending Amount: </label>
        <input type="number" id="spendingAmount" placeholder="Spending Amount"/><br/><br/>
        <label htmlFor="dueDate">Date Due: </label>
        <input type="number" id="date" max={parseInt(localStorage.getItem("month"))} min="1" placeholder="Date"/><br/><br/>
        <button type="submit">Add Spending</button>
      </form>

      <div>
        <ul>
          {spendings.map((spending, index) => (
          <li key={index} > {spending.name}: ${spending.amount}</li>
          ))}
        </ul>
      </div>
      <br/><button onClick={function(){
        localStorage.setItem("spendings", JSON.stringify(spendings));
        navigate("/spendingsummary");}}>Summary</button><br/><br/>
      <br/><button onClick={function(){navigate("/budgetinput");}}>Back</button>

    </div>
  );
}

export default NecessarySpending;