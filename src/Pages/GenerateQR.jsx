import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GenerateQR.css";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const GenerateQR = () => {
  const endPoint = "https://veeras-login.onrender.com/api/generateQR";
  const [QRimage, setQRimage] = useState(null);
  const navigate = useNavigate(); // Import useNavigate hook

  useEffect(() => {
    const socket = io("https://veeras-login.onrender.com");

    socket.on("connect", () => {
      console.log("Connected to Socket.io server");
    });

    socket.on("generateQR", (data) => {
      setQRimage(data.qrCodeUrl);
    });

    const getAPI = async () => {
      try {
        const response = await axios.get(endPoint);
        setQRimage(response.data.qrCodeUrl);
      } catch (error) {
        console.log(error);
      }
    };

    getAPI();

    return () => {
      socket.disconnect();
    };
  }, []);

  // Function to handle click event on the QR code image
  const handleQRClick = () => {
    navigate("/scan"); // Navigate to the scan page using navigate
  };

  return (
    <div className="qr-container" onClick={handleQRClick}> {/* Add onClick event */}
      {QRimage && (
        <img
          src={QRimage}
          alt="QR Code"
          className="qr-image"
        />
      )}
    </div>
  );
};

export default GenerateQR;
