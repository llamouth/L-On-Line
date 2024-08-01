import React from "react";
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
  const { token, setToken } = useToken();

  return (
    <div className="app-container">
      <Navbar token={token} />
      <main className="main-display">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/login' element={<Login setToken={setToken} token={token} />} />
          <Route path='user/:id' element={<UserPage />} />
          <Route path='user/:id/cart' element={<Cart/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
