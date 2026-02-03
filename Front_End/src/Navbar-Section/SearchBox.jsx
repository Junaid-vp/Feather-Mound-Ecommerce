import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/UseFetch";
import ProductCard from "../Reusable Components/ProductCart";
import { api } from "../Api/Axios";

function SearchBox() {
  const [Search, setSearch] = useState("");
  const [searchProduct, setSearchProduct] = useState([]);
  const { datas } = useFetch(`/products`);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // 🔹 Full page loader on navigation
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 700); // smooth page transition

    return () => clearTimeout(timer);
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products?name=${Search}`);
      setSearchProduct(res?.data?.Products || []);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!Search.trim()) {
      setSearchProduct([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchProduct();
    }, 500);

    return () => clearTimeout(timer);
  }, [Search]);



      if (pageLoading) {
    return (
      <div className="flex justify-center items-center p-8" >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b6925e]"></div>
      </div>
    );
  }


  return (
    <div
      className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1200px] mx-auto"
      
    >
      {/* Back link */}
      <div className="mb-4">
        <Link to="/" className="text-dark-600 hover:underline">
          ← Back to Home
        </Link>
      </div>

      {/* Search input */}
      <div className="mb-8">
        <input
          value={Search}
          type="text"
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded-lg p-3"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Search loader */}
      {loading && (
        <div className="flex justify-center py-10">
          <div className="h-8 w-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && (
        <>
          {Search && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">
                Search Results for "{Search}"
              </h3>

              {searchProduct.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {searchProduct.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600">
                  No products found for "{Search}"
                </p>
              )}
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">
              {Search ? "You May Also Like" : "Popular Products"}
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {datas?.slice(40, 48).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SearchBox;
