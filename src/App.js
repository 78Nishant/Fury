import Navbar from './Components/Navbar';
import FrontPageProducts from './Components/FrontPageProducts';
import ProductPage from './Components/ProductPage';
import { Routes,Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import MyCart from './Components/MyCart';
import Search from './Components/SearchPage'
import BuyPage from './Components/BuyPage';
import LoadingPage from './Components/LoadingPage';
import './App.css';


function App() {
  return (
    <div className='bg-[#fff] h-screen inset-0'>
      <Navbar /> 
      <Routes>
        <Route path="/" element={
          <div className='my-2'>
          <FrontPageProducts />
          </div>
        } />
        <Route path='/loading' element={<LoadingPage />} />
        <Route path="/productpage" element={<ProductPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path='/mycart' element={<MyCart/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/buyPage' element={<BuyPage />} />
      </Routes>
  
    </div>
   
      
  );
}

export default App;
