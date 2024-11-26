import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'

const Cart = () => {
  const {cart}=useContext(AppContext);
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)
  useEffect(() => {
    let qty=0;
    let price=0;
    if(cart?.items){
      for(let i=0;i<cart.items?.length;i++){
        qty+=cart.items[i].qty
        price+=cart.items[i].price
      }
    }
    setPrice(price)
    setQty(qty)
  }, [cart])
  
  return (
    <>
    <div className='my-5 text-center'>
      <button className='btn btn-info mx-3'>Total Qty:-{qty}</button>

      <button className='btn btn-warning mx-3'>Total Price:-{price}</button>    </div>
    {cart?.items?.map((product)=><div key={product._id} className='container bg-gray-800 rounded-lg my-5 p-3 text-center '>
     <div className='flex justify-around items-center'>
     <div className="cart_img   ">
        <img className='w-[100px] h-[100px] rounded-lg' src={product.imgSrc}></img>
      </div>
      <div className="cart_des">
        <h2 className='text-2xl font-bold'>{product.title}</h2>
        <h3 className='text-md font-semibold'>{product.price}</h3>
        <h3>Qty:-{product.qty}</h3>
      </div>
      <div className="cart_action">
        <button className="btn btn-warning font-bold mx-3">Qty--</button>
        <button className="btn btn-info font-bold mx-3">Qty++</button>
        <button className="btn btn-error font-bold mx-3">Remove</button>
      </div>
     </div>
    </div>)}
    </>
  )
}

export default Cart