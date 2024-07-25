import { useEffect, useState } from 'react'
import {Routes, Route} from "react-router-dom"
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './Components/Navbar'
import ProductList from './Pages/ProductList';

function App() {

  const API = import.meta.env.VITE_BASE_URL
  const [ products, setProducts ] = useState([])

  useEffect(() => {
    fetch(`${API}/products`)
    .then( res => res.json() )
    .then( res => setProducts(res))
    .catch( err => console.error(err) )
  },[])
  
  return (
    <div className='container'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ProductList products={products} setProducts={setProducts}/>}/>
      </Routes>
    </div>
  )
}

export default App
