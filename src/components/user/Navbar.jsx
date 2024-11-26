import React, { useContext, useState } from 'react'
import { Link, useNavigate ,useLocation} from 'react-router-dom'
import { Search } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import AppContext from '../../context/AppContext';


const Navbar = () => {
  const [searchTerm, setsearchTerm] = useState(" ")
  const navigate = useNavigate();
  const location=useLocation ();

  const {setFilteredData,products,logout,isAuthenticated,cart}=useContext(AppContext);
  // console.log("user cart=",cart)

  const filterbyCateogry=(cat)=>{
    setFilteredData(products.filter((data)=>data.category.toLowerCase()==cat.toLowerCase()))
  }

  const filterbyPrice=(price)=>{
    setFilteredData(products.filter((data)=>data.price>=price))
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) { // Ensure there's a valid term
      navigate(`/product/search/${searchTerm.trim()}`)
      setsearchTerm('') // Clear search after submission
    }
  }

  return (
    <>
      <div className="nav sticky top-0">
        <div className="nav_bar flex justify-around items-center p-[10px] bg-violet-500 w-[100%]">
          <Link to='/' className="left">
            <h3>NextGenShop</h3>
          </Link>
          <form onSubmit={submitHandler} className="search_bar flex justify-center items-center bg-black w-[30%] rounded-[20px] p-[10px]">
            <Search /><input value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)} type='text' className='border-none w-[400px] bg-black' placeholder='
            Search Products' />
          </form>
          <div className="right">
            {isAuthenticated&&(
              <>
             <div className="flex items-center space-x-3">
  <Link to="/cart"
    type="button"
    className="relative inline-flex items-center px-4 py-2 font-medium text-white bg-blue-500 rounded-lg"
  >
    <ShoppingCart />
    <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
      {cart?.items?.length}
      <span className="sr-only">unread messages</span>
    </span>
  </Link>

  <Link to="/profile" className="px-4 py-2 font-medium text-white bg-blue-500 rounded-lg">
    Profile
  </Link>

  <button
    className="px-4 py-2 font-medium text-white bg-red-500 rounded-lg"
    onClick={() => {
      logout();
      navigate('/');
    }}
  >
    Logout
  </button>
</div>

              </>
            )}
           
            {!isAuthenticated&&(
              <>
               <Link to='/login' className='btn btn-secondary mx-3'>login</Link>
               <Link to='/register' className='btn btn-info mx-3'>register</Link>
              </>
            )}
 
          </div>
        </div>


{location.pathname=='/'&&(
        <div className="sub_bar flex justify-between items-center w-[100%]  bg-blue-700 ">
          <div className="hover:cursor-pointer items p-[10px] hover:bg-black font-bold  " onClick={()=>setFilteredData(products)}>No Filter</div>
          <div className="hover:cursor-pointer items p-[10px] hover:bg-black font-bold " onClick={()=>filterbyCateogry("mobiles")}>Mobiles</div>
          <div className="hover:cursor-pointer items p-[10px] hover:bg-black font-bold " onClick={()=>filterbyCateogry("laptops")}>Laptops</div>
          <div className="hover:cursor-pointer items p-[10px] hover:bg-black font-bold " onClick={()=>filterbyCateogry("cameras")}>Cameras</div>
          <div className="hover:cursor-pointer items p-[10px] hover:bg-black font-bold " onClick={()=>filterbyCateogry("headphones")}>Headphones</div>
          <div className="hover:cursor-pointer items p-[10px] hover:bg-black font-bold"  onClick={()=>filterbyPrice(15999)}>15999</div>
          <div className="hover:cursor-pointer items p-[10px] hover:bg-black font-bold"  onClick={()=>filterbyPrice(25999)}>25999</div>
          <div className="hover:cursor-pointer items p-[10px] hover:bg-black font-bold"  onClick={()=>filterbyPrice(49999)}>49999</div>
          <div className="hover:cursor-pointer items p-[10px] hover:bg-black font-bold" onClick={()=>filterbyPrice(69999)} >69999</div>
          <div className="hover:cursor-pointer items p-[10px] hover:bg-black font-bold"  onClick={()=>filterbyPrice(99999)}>99999</div>
        </div>)}
      </div>
    </>
  )
}

export default Navbar