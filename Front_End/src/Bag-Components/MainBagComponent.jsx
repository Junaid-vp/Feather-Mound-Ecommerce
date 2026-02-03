import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../Reusable Components/ProductCart';
import { api } from '../Api/Axios';

export default function MainBagComponent() {
  const {type} = useParams()
  
  const [limit, setLimit] = useState(12);
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState([]);
  const url = Number(type) ===0  ? `/products?limit=${limit}` : `/products?type=${type}&limit=${limit}`

  
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(url)
        setProduct(res?.data?.Products || []);
        setCount(res?.data?.Count || 0);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchProduct();
  }, [limit,type]);




  return (
    <div className="bg-white" data-aos="fade-up" data-aos-duration="3000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="w-full lg:w-3/5 order-1 lg:order-2">
            <img
              className="w-full h-auto object-cover rounded-md"
              src="https://miraggiolife.com/cdn/shop/files/BYOB-1.jpg?v=1758093214&width=3000"
              alt={Number(type) ===0  ?  "Best Sellers" : type}
            />
          </div>

          <div className="w-full lg:w-2/5 order-2 lg:order-1 text-center lg:text-left">
            <h6 className="text-sm text-gray-500 mb-2">
              <Link to="/" className="hover:underline">
                Home
              </Link>{" "}
              
            </h6>

            <h3 className="text-3xl font-bold text-gray-900 mb-4 mt-10">
              { Number(type) ===0  ?  "Best Sellers" : type}
            </h3>

            <p className="text-gray-600 leading-relaxed mt-10">
              Best-loved. Best carried. From totes and hobos to minis, clutches,
              and backpacks, these are the bestsellers that women keep coming
              back to.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {product.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-10">
          {limit < count && (
            <button
              onClick={() => setLimit((prev) => prev + 12)}
              className="px-6 py-2 bg-black text-white rounded"
            >
              Show More
            </button>
          )}

          {limit > 12 && (
            <button
              onClick={() => setLimit((prev)=> Math.max(12, prev - 12))}
              className="px-6 py-2 border border-black rounded"
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
}