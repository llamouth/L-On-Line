import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './App.scss';

// COMPONENTS 
import Navbar from './Components/Navbar/Navbar';
import useToken from "./Components/Login/UseToken";

// PAGES
import ProductList from './Pages/ProductList/ProductList';
import Home from './Pages/Home/Home';
import Login from "./Pages/Login/Login";
import UserPage from "./Pages/User/UserPage";
import Cart from "./Pages/Cart/Cart";

function App() {

  const [userId, setUserId] = useState(null)
  const { token, setToken } = useToken();

  return (
    <div className="app-container">
      <Navbar token={token} userId={userId}/>
      <main className="main-display">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<ProductList userId={userId}/>} />
          <Route path='/login' element={<Login setToken={setToken} token={token} />} />
          <Route path='user/:id' element={<UserPage  setUserId={setUserId}/>} />
          <Route path='user/:id/cart' element={<Cart/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
