import './App.css';
import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Pages/Login';
import GenerateQR from './Pages/GenerateQR';
import ScanQR from './Pages/ScanQR';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/login' Component={Login}/>
      <Route path='/generate' Component={GenerateQR}/>
      <Route path='/scan' Component={ScanQR}/>
      
    </Routes>
    </BrowserRouter>
    // <p>Hello</p>
  )
}

export default App;
