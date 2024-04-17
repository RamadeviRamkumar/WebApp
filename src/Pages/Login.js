import React from "react";
import GenerateQR from "./GenerateQR";
import image from "../Assets/1.png";
import "./Login.css";

const Login = () => {
  return (
    <div className="container">
      <div className="header">
        <h3>Login</h3>
      </div>
      <div className="card">
        <img src={image} alt="Not show an" className="img" />
        <GenerateQR />
        <ul className="list">
          <li>1. Install Veeras App on your phone from Play Store</li>
          <li>2. Tap Scanner and Link a Device</li>
          <li>3. Point your phone to this screen to capture the code</li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
