// Thanks to https://iamtimsmith.com/blog/using-mongodb-with-express-js/ 
//and https://medium.com/geekculture/build-and-deploy-a-web-application-with-react-and-node-js-express-bce2c3cfec32

//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 3000;

require("dotenv").config();
const path = require("path");

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true,})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err));

//Connect the client side
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));

//Mongoose Schema to define username and password
const User = mongoose.model("User", new mongoose.Schema({
  username: String, 
  password: String
}), "users");

//HTTP get to see if the server is running
app.get("/", (req, res) => {
  res.send("server is running");
});

//Function to validate what users enter
function validation(validateData){
  const emptyForm = [];

  if (!validateData.username) {emptyForm.push("username");}
  if (!validateData.password) {emptyForm.push("password");}

  return emptyForm;
}

//Login route
app.post("/api/login", async (req, res) => {

  const emptyForm = validation(req.body);

  if (emptyForm.length > 0) {
    return res.status(400).json({ message: `Try again! Enter ${emptyForm.join(" and ")}!` });
  }

  const { username, password} = req.body;
  console.log("User input:", username, password);

  try {
    const user = await User.findOne({username});
    console.log("Found user in database:", user);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or pass!" });
    }
    res.status(200).json({ message: "successful login" });
  } catch (error) { res.status(500).json({ message: "server error" });}
});

//Registeration route
app.post("/api/register", async (req, res) => {

  //uses the validation function above
  const emptyForm = validation(req.body);

  //checks if registration form is empty or not
  if (emptyForm.length > 0) {
    return res.status(400).json({ message: `Try again! Enter ${emptyForm.join(" and ")}!` });
  }

  const { username, password} = req.body;
  console.log("Registration user input:", username, password);

  try {
    const existingUser = await User.findOne({username});
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken!" });
    } else {
      const newUser = new User({username, password});
      console.log(newUser)
      await newUser.save();
    
      res.status(201).json({
        message: "registration successful"});
    }
    
  } catch (error) {
    console.log("The error:", error)
    res.status(500).json({message: error});
  }
});

//Retrieve all user documents
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) { res.status(500).json({ message: "server error" });}
});

//Catches all routes
app.get("*", (req, res) => { res.sendFile(path.join(__dirname, "../client/build", "index.html"));});

//Start the server
app.listen(PORT, () => {console.log(`port ${PORT}`);});

module.exports = app;
