import "./styles.css";
import { useState, useEffect } from "react";
import Home from'./pages/home'
import Welcome from "./pages/welcome";
import {BrowserRouter as Router,Route,Routes,Link,useNavigate} from 'react-router-dom'


export default function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Home/>} path="/"/>
        <Route element={<Welcome/>} path="/welcome"/>
        <Route element={<Home/>} path="*"/>

      </Routes>
    </Router>
  );
}
