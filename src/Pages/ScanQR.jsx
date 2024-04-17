// import React, { useState } from 'react';
// import QrReader from 'react-qr-scanner'
// import { useNavigate } from "react-router-dom";

// const ScanQR = () => {
//     const [scanMessage, setScanMessage] = useState("");
//     const navigate = useNavigate();

//     const handleScan = (data) => {
//         if (data) {
//             console.log("Scanning process successful");
//             setScanMessage("Scanning process successful");
//             navigate("/"); 
//         }
//     }

//     const handleError = (error) => {
//         console.log(error);
//     }

//     const previewStyle = {
//       height: 240,
//       width: 320,
//     };

//     return (
//         <div>
//             <QrReader
//                 delay={100}
//                 style={previewStyle}
//                 onError={handleError}
//                 onScan={handleScan}
//             />
//             {scanMessage && <p>{scanMessage}</p>}
//         </div>
//     );
// };

// export default ScanQR;

import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';

const ScanQR = () => {
  const [qrData, setQrData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initPusher = () => {
      Pusher.logToConsole = true;
      return new Pusher('f9d50dc5fcf1106227ce', {
        cluster: 'ap2'
      });
    };

    const getQRCode = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://veera-cw6k.onrender.com/api/qr");
        console.log('QR Code Response:', res.data);
        setQrData(res.data.data);
      } catch (error) {
        console.error('Error fetching QR Data', error);
      } finally {
        setLoading(false);
      }
    };

    const handleLogin = async (data) => {
      const { channel, user_id } = data;
      try {
        await axios.post('https://veera-cw6k.onrender.com/api/triggerEvent', { channel, user_id });
        // Redirect to profile page after successful login
        navigate('/login');
      } catch (error) {
        console.error('Login failed:', error);
      }
    };
    
    const showQrCode = () => {
      const pusher = initPusher();
      getQRCode().then((res) => {
        if (res) {
          const channel = pusher.subscribe('private-' + res.channel);
          console.log('CHANNEL=', res.channel);
          channel.bind('login-event', function (data) {
            handleLogin(data);
          });
        }
      });
    };

    showQrCode(); 
    const intervalId = setInterval(showQrCode, 1000000); 

    return () => {
      clearInterval(intervalId); 
    };
  }, [navigate]);
  if (isLoading) return <div>
  <h2>Loading...</h2>
</div>
  return (
    <div>
      <h1>QR Code Scanner</h1>
      <div style={{ marginTop: 50, background: 'white', padding: '16px' }}>
        {qrData ? (
          <QRCode value={qrData} size={320} />
        ) : (
          <div>No QR Data available</div>
        )}
      </div>
    </div>
  );
}  
export default ScanQR;


