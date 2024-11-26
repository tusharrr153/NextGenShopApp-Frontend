
import ShowProduct from './components/product/ShowProduct'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from './components/product/ProductDetail';
import Navbar from './components/user/Navbar';
import SearchProduct from './components/product/SearchProduct';
import Register from './components/user/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/user/Login';
import Profile from './components/user/Profile';
import Cart from './components/user/Cart';
const App = () => {
  // const {  } = useContext(AppContext)
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<ShowProduct />} />
          <Route path='/product/search/:term' element={<SearchProduct />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/cart' element={<Cart/>}/>

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App