import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import RelatatedProduct from './RelatatedProduct';

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const { id } = useParams()
  const url = "http://localhost:1000/api";



  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json"
        },
        withCredentials: true
      })

      // console.log(api.data.product);
      // setProducts(api.data.products);
      setProduct(api.data.product)

    }
    fetchProduct();
  }, [id]);

  return (
    <>
      <div className="container flex text-center py-5 justify-evenly items-center">
        <div className="left">
          <img className='w-[250px] h-[250px] rounded-[10px] border-yellow-300 border-[2px] ' src={product?.imgSrc} alt='' />
        </div>
        <div className="right">
          <h1>{product?.title}</h1>
          <p>{product?.description}</p>
          <h1>{product?.price}{" "}{"₹"}</h1>

          <div className='my-5'>
            <button className='btn btn-error mx-3 text-white font-bold'>Buy Now</button>
            <button className='btn btn-warning bg-yellow-400 font-bold'>Add To Cart</button>

          </div>
        </div>
      </div>

      <RelatatedProduct category={product?.category} />
    </>
  )
}

export default ProductDetail