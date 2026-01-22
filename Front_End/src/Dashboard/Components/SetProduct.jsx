import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../Api/Axios'

function SetProduct() {
    const navigate = useNavigate()
    const { itemId } = useParams()
    const [Product, setProduct] = useState({
        product_id: "",
        name: "",
        type: "",
        color: "",
        original_price: "",
        sale_price: "",
        discount_percentage: "",
        image_url: "",
        description: "",
        cost_price: "",
        isActive: true
    })

    useEffect(() => {
        if (itemId) {
            api.get(`/products/${itemId}`)
                .then((res) => setProduct(res.data || res))
                .catch(err => console.error("Failed loading product:", err))
        }
    }, [itemId])

    const HandleChange = (e) => {
        setProduct({ ...Product, [e.target.name]: e.target.value })
    }

    const HandleSubmit = (e) => {
        e.preventDefault()
        if (itemId) {
            api.put(`/products/${itemId}`, Product)
        } else {
            api.post("/products", Product)
        }
        navigate("/dashboard/products")
    }

    return (
        <div className="min-h-screen bg-[#faf8f4] p-4 lg:p-6 flex justify-center items-start">
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl w-full max-w-3xl border border-[#e6dfd3] p-4 lg:p-8">
                {/* Header */}
                <div className="text-center mb-6 lg:mb-8">
                    <h1 className="text-xl lg:text-2xl font-serif font-semibold text-[#4b3f2f] mb-2">
                        {itemId ? "Update Product" : "Add New Product"}
                    </h1>
                    <p className="text-sm text-[#7a6a55]">
                        {itemId ? "Edit existing product details" : "Create a new product for your catalog"}
                    </p>
                </div>

                <form onSubmit={HandleSubmit} className="space-y-4 lg:space-y-6">
                    {/* Image Preview */}
                    {Product.image_url && (
                        <div className="flex justify-center mb-4">
                            <div className="relative">
                                <img
                                    src={Product.image_url}
                                    alt={Product.name || "Product preview"}
                                    className="w-32 h-32 lg:w-40 lg:h-40 object-cover rounded-lg border-2 border-[#e6dfd3] shadow-sm"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/160?text=No+Image"
                                    }}
                                />
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#4b3f2f] text-white text-xs px-2 py-1 rounded-full">
                                    Preview
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Product ID */}
                    <div>
                        <label className="block text-[#4b3f2f] text-sm font-medium mb-2">Product ID *</label>
                        <input
                            type="text"
                            name="product_id"
                            value={Product.product_id}
                            onChange={HandleChange}
                            className="w-full px-3 py-2 lg:py-2.5 border border-[#e6dfd3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bba17a] focus:border-[#bba17a] transition text-[#4b3f2f] placeholder:text-[#b9a98a]"
                            placeholder="Enter unique product ID"
                            required
                        />
                    </div>

                    {/* Name & Type */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[#4b3f2f] text-sm font-medium mb-2">Product Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={Product.name}
                                onChange={HandleChange}
                                className="w-full px-3 py-2 lg:py-2.5 border border-[#e6dfd3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bba17a] focus:border-[#bba17a] transition text-[#4b3f2f] placeholder:text-[#b9a98a]"
                                placeholder="Enter product name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[#4b3f2f] text-sm font-medium mb-2">Product Type *</label>
                            <input
                                type="text"
                                name="type"
                                value={Product.type}
                                onChange={HandleChange}
                                className="w-full px-3 py-2 lg:py-2.5 border border-[#e6dfd3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bba17a] focus:border-[#bba17a] transition text-[#4b3f2f] placeholder:text-[#b9a98a]"
                                placeholder="e.g., Handbag, Wallet, etc."
                                required
                            />
                        </div>
                    </div>

                    {/* Color */}
                    <div>
                        <label className="block text-[#4b3f2f] text-sm font-medium mb-2">Color *</label>
                        <input
                            type="text"
                            name="color"
                            value={Product.color}
                            onChange={HandleChange}
                            className="w-full px-3 py-2 lg:py-2.5 border border-[#e6dfd3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bba17a] focus:border-[#bba17a] transition text-[#4b3f2f] placeholder:text-[#b9a98a]"
                            placeholder="Enter product color"
                            required
                        />
                    </div>

                    {/* Prices */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-[#4b3f2f] text-sm font-medium mb-2">Original Price (₹) *</label>
                            <input
                                type="number"
                                name="original_price"
                                value={Product.original_price}
                                onChange={HandleChange}
                                className="w-full px-3 py-2 lg:py-2.5 border border-[#e6dfd3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bba17a] focus:border-[#bba17a] transition text-[#4b3f2f] placeholder:text-[#b9a98a]"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[#4b3f2f] text-sm font-medium mb-2">Sale Price (₹) *</label>
                            <input
                                type="number"
                                name="sale_price"
                                value={Product.sale_price}
                                onChange={HandleChange}
                                className="w-full px-3 py-2 lg:py-2.5 border border-[#e6dfd3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bba17a] focus:border-[#bba17a] transition text-[#4b3f2f] placeholder:text-[#b9a98a]"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[#4b3f2f] text-sm font-medium mb-2">Cost Price (₹) *</label>
                            <input
                                type="number"
                                name="cost_price"
                                value={Product.cost_price}
                                onChange={HandleChange}
                                className="w-full px-3 py-2 lg:py-2.5 border border-[#e6dfd3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bba17a] focus:border-[#bba17a] transition text-[#4b3f2f] placeholder:text-[#b9a98a]"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>

                    {/* Discount & Image URL */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[#4b3f2f] text-sm font-medium mb-2">Discount Percentage (%)</label>
                            <input
                                type="number"
                                name="discount_percentage"
                                value={Product.discount_percentage}
                                onChange={HandleChange}
                                className="w-full px-3 py-2 lg:py-2.5 border border-[#e6dfd3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bba17a] focus:border-[#bba17a] transition text-[#4b3f2f] placeholder:text-[#b9a98a]"
                                placeholder="0"
                                min="0"
                                max="100"
                                step="0.01"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[#4b3f2f] text-sm font-medium mb-2">Image URL *</label>
                            <input
                                type="text"
                                name="image_url"
                                value={Product.image_url}
                                onChange={HandleChange}
                                className="w-full px-3 py-2 lg:py-2.5 border border-[#e6dfd3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bba17a] focus:border-[#bba17a] transition text-[#4b3f2f] placeholder:text-[#b9a98a]"
                                placeholder="https://example.com/image.jpg"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-[#4b3f2f] text-sm font-medium mb-2">Description *</label>
                        <textarea
                            name="description"
                            value={Product.description}
                            onChange={HandleChange}
                            rows={4}
                            className="w-full px-3 py-2 lg:py-2.5 border border-[#e6dfd3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bba17a] focus:border-[#bba17a] transition text-[#4b3f2f] placeholder:text-[#b9a98a] resize-none"
                            placeholder="Enter detailed product description..."
                            required
                        />
                    </div>

                    {/* Status Toggle - Only for update */}
                    {itemId && (
                        <div className="flex items-center justify-between p-4 bg-[#f7f3ee] rounded-lg border border-[#e6dfd3]">
                            <div>
                                <div className="text-sm font-medium text-[#4b3f2f]">Product Status</div>
                                <div className="text-xs text-[#7a6a55]">
                                    {Product.isActive ? "Product is visible to customers" : "Product is hidden from customers"}
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setProduct({ ...Product, isActive: !Product.isActive })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    Product.isActive ? 'bg-green-500' : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        Product.isActive ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4 lg:pt-6">
                        <button
                            type="submit"
                            className="flex-1 sm:flex-none bg-[#4b3f2f] text-white px-6 lg:px-8 py-3 rounded-lg hover:bg-[#3e3325] transition-all font-medium shadow-sm"
                        >
                            {itemId ? "Update Product" : "Add Product"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard/products")}
                            className="flex-1 sm:flex-none bg-gray-100 text-[#4b3f2f] px-6 lg:px-8 py-3 rounded-lg hover:bg-gray-200 transition-all font-medium border border-[#e6dfd3]"
                        >
                            Cancel
                        </button>
                    </div>

                    {/* Required fields note */}
                    <div className="text-center">
                        <p className="text-xs text-[#7a6a55]">* Required fields</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SetProduct