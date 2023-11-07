import './App.css';
import React, { useReducer, useState } from 'react';
import axios from 'axios';
import Registration from './components/Registration';
import HRpage from './components/HRPage';
import {Routes , Route } from 'react-router-dom'
import Home from './components/Home.js'
import Login from './components/Login.js';
import QRcode from './components/QR.js';
import MainPage from './components/Main.js';
import { AuthProvider } from './contexts/Auth.js';
import imaged from './/logo.png'
function App() {
  return (
    <>
    {/* <div className='head'>
      <img src={imaged} alt='images'/>
    </div> */}
    <div>
     <Routes>
       <Route index element={<Home/>}/>
       <Route path='/signup' element={<Registration/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/hr' element={<HRpage/>}/>
       <Route path='/qrcode' element={<QRcode/>}/>
       <Route path='/main' element={<MainPage/>}/>
     </Routes> 
     </div>
     

    </>
  );
}

export default App;
