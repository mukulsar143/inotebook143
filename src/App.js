import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Routes, Route, HashRouter } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Alerts from "./components/Alerts";
import { useState } from "react";

function App() {


  const [alert, setalert] = useState('')
  const showAlert = (message, type) =>{
    setalert({
      msg : message,
      type : type
    })
    setTimeout(() => {
      setalert(null)      
    }, 1200);
  }
  return (
    <>
      <NoteState >
        <HashRouter>
          <Navbar />
          <Alerts alert = {alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/home" element={<Home showAlert = {showAlert} />}></Route>
              <Route exact path="/signin" element={<Signin showAlert = {showAlert }  />}></Route>
              <Route exact path="/login" element={<Login showAlert = {showAlert}   />}></Route>
            </Routes>
          </div>
        </HashRouter>
      </NoteState>
    </>
  );
}

export default App;
