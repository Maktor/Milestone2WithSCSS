// Thanks to https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";

function LoginPage() {
  //To manage local state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [expenses, setExpenses] = useState("");
  // const [income, setIncome] = useState("");
  //Registration
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  //To navigate through various URL
  const navigate = useNavigate();

  const rexpenses = "1"
  const rincome = "2"

  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);
    if (showSplash) document.querySelector('.SplashScreen').classList.add('SplashScreen-fadeOut');
  
    return () => clearTimeout(timer);
  }, [showSplash]);

  const loginButton = async (event) => {
    event.preventDefault();
    //use try and catch to test
    try {
      // POST request to the /api/login route using PORT 3000
      //const check = await fetch("http://localhost:3000/api/login/", { method: "POST", mode: "cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password}),});
      const check = await fetch("https://milestone-2-ncstate-server-1ib376eji-maktor.vercel.app/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password}),});

      const data = await check.json();
      console.log(data)

      // Code 200 to check if the request was successful
      if (check.ok) {
        console.log(data.message);
        navigate("/dashboard");
      } else {
        console.error(data.message);
        alert(data.message);
      }
    } catch (error) {console.error("Error during login:", error); alert("Registration error. Try again.");}
  };

  const registerButton = async (event) => {
    event.preventDefault();

    try {
      // POST request to the /api/register route using PORT 3000
      const check = await fetch("https://milestone-2-ncstate-server-1ib376eji-maktor.vercel.app/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({username: registerUsername, password: registerPassword,}),});
      //const check = await fetch("http://localhost:3000/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({username: registerUsername, password: registerPassword,}),});


      console.log(username, password, rexpenses, rincome)
      const data = await check.json();
      console.log(data)

      if (check.ok) {
        console.log(data.message);
        navigate("/dashboard");
      } else {
        console.error(data.message);
        alert(data.message);
      }
    } catch (error) {console.error("Error during registration:", error);
        alert("Registration error. Try again.");
    }
  };

  //Rendering form
  return (
    <div className="LoginPage">
      {showSplash ? (
        <div className="SplashScreen">
          <h1>MERN APP</h1>
        </div>
      ) : (
        <>
          {<div className="LoginPage">
      <h1>MERN Application</h1><br/>
      <h2>Registration</h2>
      <form onSubmit={registerButton}>
        <input type="text" placeholder="Username" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)}/>
        <input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)}/>
        <button type="submit">Register</button>
      </form>
      <h2>Login</h2>
      <form onSubmit={loginButton}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
      </form>
    </div>}
        </>
      )}
    </div>
  );
}

export default LoginPage;
