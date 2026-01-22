import React from 'react'
import { useLocation } from 'react-router-dom'

function SetOrder() {
  const location = useLocation()
  const { userOrder } = location.state || {}
  
  const TotalOrder = userOrder?.flatMap(item => item.items) || []

  return (
    <div className="min-h-screen bg-[#faf8f4] p-4 lg:p-6 flex justify-center items-start">
      <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl w-full max-w-5xl border border-[#e6dfd3] p-4 lg:p-8">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-serif font-semibold text-[#4b3f2f] mb-3 lg:mb-4">
            Order Information
          </h1>
          <div className="text-sm bg-[#4b3f2f] text-white px-4 py-2 rounded-full shadow inline-block">
            Total Items: {TotalOrder.length}
          </div>
        </div>

        {!userOrder || userOrder.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f7f3ee] flex items-center justify-center">
              <svg className="w-8 h-8 text-[#b9a98a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-lg text-gray-500">No Orders Found</p>
            <p className="text-sm text-gray-400 mt-2">User hasn't placed any orders yet</p>
          </div>
        ) : (
          <div className="space-y-6 lg:space-y-8">
            {userOrder.map((order) => (
              <div key={order.id} className="bg-white rounded-xl border border-[#efe7db] shadow-sm p-4 lg:p-6">
                {/* Order Header */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 gap-3 lg:gap-4">
                  <div className="flex-1">
                    <h2 className="text-lg lg:text-xl font-semibold text-[#4b3f2f] mb-1">
                      Order ID: <span className="font-mono">{order.id}</span>
                    </h2>
                    <p className="text-sm text-[#7a6a55]">Order Date: {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#7a6a55]">
                      Total Quantity: <span className="font-medium text-[#4b3f2f]">{order.totalQuantity}</span>
                    </p>
                    <p className="text-sm text-[#7a6a55]">
                      Total Amount: <span className="font-semibold text-[#4b3f2f]">₹{order.totalAmount}</span>
                    </p>
                  </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto rounded-lg border border-[#f0e9dd]">
                  <table className="w-full text-sm text-[#4b3f2f]">
                    <thead className="bg-[#f7f3ee] text-left">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Product</th>
                        <th className="px-6 py-4 font-semibold">Details</th>
                        <th className="px-6 py-4 font-semibold text-right">Original Price</th>
                        <th className="px-6 py-4 font-semibold text-right">Sale Price</th>
                        <th className="px-6 py-4 font-semibold text-center">Quantity</th>
                        <th className="px-6 py-4 font-semibold text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0e9dd]">
                      {order.items.map((item, index) => (
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
                            <div className="line-through text-red-500 font-semibold">₹{item.original_price}</div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="text-green-600 font-semibold text-lg">₹{item.sale_price}</div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="text-2xl font-bold text-[#4b3f2f]">{item.Quantity || 1}</div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              item.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                              item.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                              item.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                              item.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Tablet Cards */}
                <div className="hidden md:block lg:hidden">
                  <div className="grid grid-cols-1 gap-4">
                    {order.items.map((item, index) => (
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
                              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                                item.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                item.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                item.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                item.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <div className="text-xs text-[#7a6a55]">Original</div>
                                <div className="text-red-500 line-through font-semibold">₹{item.original_price}</div>
                              </div>
                              <div>
                                <div className="text-xs text-[#7a6a55]">Sale Price</div>
                                <div className="text-green-600 font-semibold text-lg">₹{item.sale_price}</div>
                              </div>
                              <div>
                                <div className="text-xs text-[#7a6a55]">Quantity</div>
                                <div className="text-2xl font-bold text-[#4b3f2f]">{item.Quantity || 1}</div>
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
                  {order.items.map((item, index) => (
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
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                              item.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                              item.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                              item.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                              item.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                            <div>
                              <div className="text-[10px] text-[#7a6a55]">Original</div>
                              <div className="text-red-500 line-through font-semibold text-sm">₹{item.original_price}</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-[#7a6a55]">Sale</div>
                              <div className="text-green-600 font-semibold text-sm">₹{item.sale_price}</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-[#7a6a55]">Qty</div>
                              <div className="text-lg font-bold text-[#4b3f2f]">{item.Quantity || 1}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-[#e6dfd3]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="text-sm text-[#7a6a55]">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''} in this order
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-[#7a6a55]">Total Items</p>
                        <p className="text-lg font-semibold text-[#4b3f2f]">{order.totalQuantity}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-[#7a6a55]">Total Amount</p>
                        <p className="text-lg font-semibold text-[#4b3f2f]">₹{order.totalAmount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SetOrder