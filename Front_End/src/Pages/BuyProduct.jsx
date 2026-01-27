import React, { useEffect, useState } from "react";
import Address from "../Authentication/Address";
import { api } from "../Api/Axios";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
function BuyProduct() {
  const { product_id } = useParams();
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const {userData}= useContext(AuthContext)
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${product_id}`);
      setProduct(res?.data?.Product);
    };
    fetchProduct();
  }, [product_id]);


  const totalAmount = product?.sale_price * quantity

   const HandleContinue = ()=>{

      if(!userData.address){
        toast.error("Save Your Address")
        return
      }


    navigate(`/paymentSection?ItemId=${product_id}&quantity=${quantity}`)

   }
  

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* ---------------- Cart Items ---------------- */}
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Your Items
          </h2>

          <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
            <img
              src={product?.image_url}
              alt={product?.name}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="flex-1">
              <p className="font-medium text-gray-900">{product?.name}</p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 my-2">
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                  className="px-3 py-1 border rounded"
                >
                  <Minus size={14}/>
                </button>

                <span className="font-semibold">{quantity}</span>

                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-1 border rounded"
                >
                  <Plus size={14}/>
                </button>
              </div>

              <p className="text-gray-500">
                Price: ₹{product?.sale_price}
              </p>

            </div>
          </div>

          {/* Totals */}
          <div className="mt-4 border-t border-gray-200 pt-4 space-y-1">
            <p className="font-medium text-gray-800">
              Total Quantity: {quantity}
            </p>
            <p className="font-bold text-lg text-gray-900">
              Total Amount: ₹{totalAmount}
            </p>
          </div>
        </div>

        {/* ---------------- Address Section ---------------- */}
        <div className="flex-1 flex flex-col gap-6">
          <Address />

          <button onClick={HandleContinue}className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-gray-900">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyProduct;

