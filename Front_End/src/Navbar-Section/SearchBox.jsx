// SearchBox.jsx — Product search UI
// - Reads product list via useFetch("/products")
// - Filters client-side by `Search` input (case-insensitive)
// - Shows matching ProductCard components and a fallback "You May Also Like"
// - Removed AOS to prevent animation conflicts with search functionality

import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/UseFetch";
import ProductCard from "../Reusable Components/ProductCart";

function SearchBox() {
  // local search state (controlled input)
  const [Search, setSearch] = useState("");

  // fetch all products (custom hook)
  const { datas } = useFetch("/products");

  // filter products by name (case-insensitive)
  const FilteredDatas = datas?.filter((value) =>
    value.name.toLowerCase().includes(Search.toLowerCase())
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1200px] mx-auto">
      {/* Back link */}
      <div className="mb-4">
        <Link to="/" className="text-dark-600 hover:underline text-sm sm:text-base">
          ← Back to Home
        </Link>
      </div>

      {/* Search input (updates local state) */}
      <div className="mb-8">
        <input
          value={Search}
          type="text"
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-dark-400 focus:border-dark-400 outline-none"
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
        />
      </div>

      {/* Results grid */}
      <div>
        {/* Search results */}
        {Search && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">
              Search Results for "{Search}"
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FilteredDatas?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* No results message */}
        {Search && FilteredDatas?.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600 mb-4">No products found for "{Search}"</p>
          </div>
        )}

        {/* Fallback recommendations when no search OR always show popular items */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">
            {Search ? "You May Also Like" : "Popular Products"}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {datas?.slice(40, 48).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;