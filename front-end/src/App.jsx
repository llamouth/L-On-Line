import React, { useState } from "react";
import {Routes, Route} from "react-router-dom"
import './App.scss';

//COMPONENTS 
import Navbar from './Components/Navbar/Navbar'
import useToken from "./Components/Login/UseToken";

//PAGES
import ProductList from './Pages/ProductList/ProductList';
import Home from './Pages/Home/Home';
import Login from "./Pages/Login/Login";
import UserPage from "./Pages/User/UserPage";

function App() {

  const { token, setToken } = useToken();

  return (
    <div className='container'>
      <Navbar token={token}/>
      <div className="main-display">
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/products' element={ <ProductList /> }/>
          <Route path='/login' element={ <Login setToken={setToken} token={token} /> }/>
          <Route path='user/:id' element={ <UserPage/> }/>
        </Routes>
      </div>
    </div>
  )
}

export default App
