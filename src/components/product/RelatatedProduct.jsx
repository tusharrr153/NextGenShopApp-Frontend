import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom';

const RelatatedProduct = ({ category }) => {
  const { products } = useContext(AppContext);
  const [reletedProduct, setReletedProduct] = useState([])

  useEffect(() => {
    setReletedProduct(products.filter((data) => data?.category?.toLowerCase() == category?.toLowerCase()))
  }, [category, products])

  return (
    <>
      <div className="container text-center">
        <h1>Related Products</h1>
        <div className="container mx-auto px-4 ">
          {/* Grid layout for responsive design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {reletedProduct?.map((product) => (
              <div key={product._id} className="flex justify-center items-center my-10">
                <div className="card bg-gray-800 text-white shadow-xl w-full sm:w-96 rounded-lg">
                  <Link to={`/product/${product._id}`} className="flex justify-center items-center p-3">
                    <img
                      src={product.imgSrc}
                      alt={product.title} // Better accessibility
                      className="rounded-[10px] border-yellow-400 border-[2px] border-solid w-[200px] h-[200px]"
                    />
                  </Link>
                  <div className="card-body text-center flex justify-center items-center">
                    <h2 className="card-title text-black">{product.title}</h2>
                    <div className="card-actions">
                      <button className="btn btn-primary">{product.price}{" "}{"₹"}</button>
                      <button className='btn btn-primary bg-yellow-400 text-black border-solid border-yellow-400 border-[2px] hover:bg-yellow-500'>Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default RelatatedProduct