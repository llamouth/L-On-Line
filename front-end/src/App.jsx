import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import './App.scss';

// COMPONENTS 
import Navbar from './Components/Navbar/Navbar';
import useToken from "./Components/Login/UseToken";
import FourZeroFour from "./Components/FourZeroFour/FourZeroFour";

// PAGES
import ProductList from './Pages/ProductList/ProductList';
import Home from './Pages/Home/Home';
import Login from "./Pages/Login/Login";
import DistributorLogin from "./Components/DistributorLogin/DistributorLogin";
import UserPage from "./Pages/User/UserPage";
import DistributorPage from "./Pages/Distributor/DistributorPage";
import Cart from "./Pages/Cart/Cart";
import CreateUser from "./Pages/Create/CreateUser";

function App() {
  const { token, setToken, removeToken } = useToken();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedToken = token?.token;
    if (storedToken) {
      setUserId(storedToken);
    }
  }, [token]);

  return (
    <div className="app-container">
      <Navbar token={token} userId={userId} logout={removeToken} />
      <main className="main-display">
        <Routes>
          <Route path='/' element={ <Home token={token}/> } />
          <Route path='/products' element={<ProductList userId={userId}/>} />
          <Route path='/login' element={<Login setToken={setToken} token={token} />} />
          <Route path='/create/user'element={ <CreateUser/> }/>
          <Route path='/user/:id' element={<UserPage setUserId={setUserId} token={token}/>} />
          <Route path='/user/:id/cart' element={<Cart token={token}/>}/>
          <Route path='/distributor-login' element={<DistributorLogin setToken={setToken} token={token} />} />
          <Route path='/distributor/:id' element={<DistributorPage distributorId={userId} token={token} />} />
          <Route path='/distributor/:id/order/:orderid'/>
          <Route path="*" element={<FourZeroFour />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
