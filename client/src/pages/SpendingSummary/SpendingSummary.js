import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function SpendingSummary()
{

    const navigate = useNavigate();
    const expenses = JSON.parse(localStorage.getItem('spendings'));
    const result = expenses.reduce((total, currentValue) => total = total + parseInt(currentValue.amount, 10), 0);;
    const budget =((parseInt(localStorage.getItem("budget")))-result)/(parseInt(localStorage.getItem("month")))
    console.table(expenses)
    console.log(result);
    console.log(localStorage.getItem("month"))
    console.log(budget)

    return (
        <div>
            <h1>Budget Summary</h1><br/>
            <h2>Monthly Income</h2>
            <li>${localStorage.getItem("budget")}</li><br/>
            <h2>Expenses</h2>
            {expenses.map((spending, index) =>
            (
                <li key={index} > {spending.name}: ${spending.amount}</li>
            ) 
            )}
            <h3>Total Expenses Cost: ${result}</h3><br/>
            <h2>Daily Budget For This Month: <br/>${Math.round(budget * 100) / 100}</h2>
            <br/><button onClick={function(){
                navigate("/dashboard");
                localStorage.removeItem("spendings");
                }}>Back</button><br/><br/>
        </div>
    )

}

export default SpendingSummary;