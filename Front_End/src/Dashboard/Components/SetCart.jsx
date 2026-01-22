import React from 'react'
import { useLocation } from 'react-router-dom'

function SetCart() {
    const location = useLocation()
    const { userCart } = location.state || {}
    
    return (
        <div className="min-h-screen bg-[#faf8f4] p-4 lg:p-6 flex justify-center items-start">
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl w-full max-w-5xl border border-[#e6dfd3] p-4 lg:p-8">
                {/* Header */}
                <div className="text-center mb-6 lg:mb-8">
                    <h1 className="text-2xl lg:text-3xl font-serif font-semibold text-[#4b3f2f] mb-3 lg:mb-4">
                        User Cart Collection
                    </h1>
                    <div className="text-sm bg-[#4b3f2f] text-white px-4 py-2 rounded-full shadow inline-block">
                        Total Items: {userCart?.length || 0}
                    </div>
                </div>

                {!userCart || userCart.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f7f3ee] flex items-center justify-center">
                            <svg className="w-8 h-8 text-[#b9a98a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21m-7.5-2.5h9" />
                            </svg>
                        </div>
                        <p className="text-lg text-gray-500">Cart is Empty</p>
                        <p className="text-sm text-gray-400 mt-2">No items found in user's cart</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden lg:block bg-white border border-[#e9e0d4] rounded-xl shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[800px]">
                                    <thead className="bg-[#f7f3ee] text-left">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold text-[#4b3f2f]">Product</th>
                                            <th className="px-6 py-4 font-semibold text-[#4b3f2f]">Details</th>
                                            <th className="px-6 py-4 font-semibold text-[#4b3f2f] text-right">Original Price</th>
                                            <th className="px-6 py-4 font-semibold text-[#4b3f2f] text-right">Sale Price</th>
                                            <th className="px-6 py-4 font-semibold text-[#4b3f2f] text-center">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#f0e9dd]">
                                        {userCart.map((item, index) => (
                                            <tr key={index} className="hover:bg-[#fcfbf9] transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-[#e6dfd3] flex-shrink-0">
                                                            <img 
                                                                src={item.image_url} 
                                                                alt={item.name} 
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.src = "https://via.placeholder.com/64?text=No+Image";
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="font-semibold text-[#4b3f2f] truncate">{item.name}</div>
                                                            <div className="text-sm text-[#7a6a55] mt-1">{item.type}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-[#7a6a55]">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium">Color:</span>
                                                            <span className="px-2 py-1 bg-gray-100 rounded text-xs">{item.color}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="text-red-600 line-through font-semibold">₹{item.original_price}</div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="text-green-600 font-semibold text-lg">₹{item.sale_price}</div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="text-2xl font-bold text-[#4b3f2f]">{item.Quantity}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Tablet Cards */}
                        <div className="hidden md:block lg:hidden">
                            <div className="grid grid-cols-1 gap-4">
                                {userCart.map((item, index) => (
                                    <div key={index} className="bg-white border border-[#e9e0d4] rounded-xl p-4 shadow-sm">
                                        <div className="flex items-start gap-4">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border border-[#e6dfd3] flex-shrink-0">
                                                <img 
                                                    src={item.image_url} 
                                                    alt={item.name} 
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = "https://via.placeholder.com/80?text=No+Image";
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-[#4b3f2f] text-lg truncate">{item.name}</h3>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-sm text-[#7a6a55]">{item.type}</span>
                                                            <span className="text-xs text-[#b9a98a]">•</span>
                                                            <span className="text-sm text-[#7a6a55]">{item.color}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="grid grid-cols-3 gap-4 text-center">
                                                    <div>
                                                        <div className="text-xs text-[#7a6a55]">Original</div>
                                                        <div className="text-red-600 line-through font-semibold">₹{item.original_price}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-[#7a6a55]">Sale Price</div>
                                                        <div className="text-green-600 font-semibold text-lg">₹{item.sale_price}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-[#7a6a55]">Quantity</div>
                                                        <div className="text-2xl font-bold text-[#4b3f2f]">{item.Quantity}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden space-y-3">
                            {userCart.map((item, index) => (
                                <div key={index} className="bg-white border border-[#e9e0d4] rounded-lg p-3 shadow-sm">
                                    <div className="flex items-start gap-3">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-[#e6dfd3] flex-shrink-0">
                                            <img 
                                                src={item.image_url} 
                                                alt={item.name} 
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/64?text=No+Image";
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-[#4b3f2f] text-sm line-clamp-2">{item.name}</h3>
                                                    <div className="text-xs text-[#7a6a55] mt-1">
                                                        {item.type} • {item.color}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                                                <div>
                                                    <div className="text-[10px] text-[#7a6a55]">Original</div>
                                                    <div className="text-red-600 line-through font-semibold text-sm">₹{item.original_price}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-[#7a6a55]">Sale</div>
                                                    <div className="text-green-600 font-semibold text-sm">₹{item.sale_price}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-[#7a6a55]">Qty</div>
                                                    <div className="text-lg font-bold text-[#4b3f2f]">{item.Quantity}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Footer */}
                        <div className="mt-6 pt-6 border-t border-[#e6dfd3]">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-[#7a6a55]">
                                <div>
                                    Showing {userCart.length} item{userCart.length !== 1 ? 's' : ''} in cart
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="font-semibold text-[#4b3f2f]">
                                            Total Value: ₹{userCart.reduce((sum, item) => sum + (item.sale_price * item.Quantity), 0)}
                                        </div>
                                        <div className="text-xs">
                                            Based on sale prices
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default SetCart