import React, { useMemo, useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

function OrderStatusChart({ data = {} }) {
  const [isMobile, setIsMobile] = useState(false);
  const [chartWidth, setChartWidth] = useState(380);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    checkMobile();
    updateChartSize();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('resize', updateChartSize);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', updateChartSize);
    };
  }, []);

  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const updateChartSize = () => {
    const width = Math.min(380, window.innerWidth - 80);
    setChartWidth(width);
  };

  // Enhanced luxury palette with gradients
  const palette = {
    Pending: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    Shipped: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    Delivered: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    Cancelled: "linear-gradient(135deg, #a8c0ff 0%, #3f4c6b 100%)",
  };

  const solidColors = {
    Pending: "#667eea",
    Shipped: "#f093fb", 
    Delivered: "#4facfe",
    Cancelled: "#a8c0ff",
  };

  // numeric-safe values
  const values = {
    Pending: Number(data.Pending || 0),
    Shipped: Number(data.Shipped || 0),
    Delivered: Number(data.Delivered || 0),
    Cancelled: Number(data.Cancelled || 0),
  };

  const total = Object.values(values).reduce((s, v) => s + v, 0);

  const chartData = [
    { id: 0, value: values.Pending, label: "Pending", color: solidColors.Pending, gradient: palette.Pending },
    { id: 1, value: values.Shipped, label: "Shipped", color: solidColors.Shipped, gradient: palette.Shipped },
    { id: 2, value: values.Delivered, label: "Delivered", color: solidColors.Delivered, gradient: palette.Delivered },
    { id: 3, value: values.Cancelled, label: "Cancelled", color: solidColors.Cancelled, gradient: palette.Cancelled },
  ];

  const legend = useMemo(
    () =>
      chartData.map((d) => ({
        ...d,
        percent: total > 0 ? ((d.value / total) * 100).toFixed(0) : "0",
      })),
    [total]
  );

  const LegendItem = ({ color, gradient, label, value, percent }) => (
    <div 
      className={`flex items-center justify-between gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
        isMobile ? 'py-2' : ''
      }`}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(250,250,252,0.8))",
        border: "1px solid rgba(255,255,255,0.3)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="flex items-center gap-3 flex-1">
        <div
          style={{
            background: gradient,
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
          className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-xl flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-110`}
        >
          <div className="w-3 h-3 bg-white rounded-full opacity-90" />
        </div>

        <div className="flex-1 min-w-0">
          <div className={`${isMobile ? 'text-sm' : 'text-base'} font-bold text-[#2d3748] truncate`}>
            {label}
          </div>
          <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-[#718096] font-medium`}>
            {value} orders
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <div className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-[#2d3748]`}>
          {percent}%
        </div>
        <div className="text-xs text-[#a0aec0] font-medium">of total</div>
      </div>
    </div>
  );

  // Enhanced mobile-friendly pie chart
  const MobilePieChart = () => {
    const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);
    let currentPercent = 0;

    return (
      <div className="relative" style={{ width: chartWidth, height: chartWidth }}>
        <div 
          className="absolute inset-0 rounded-full border-8 border-white/30 shadow-2xl"
          style={{
            boxShadow: "0 20px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          {chartData.map((item, index) => {
            if (item.value === 0) return null;
            
            const percent = (item.value / totalValue) * 100;
            const rotation = currentPercent * 3.6;
            currentPercent += percent;

            return (
              <div
                key={item.id}
                className="absolute inset-0 rounded-full transition-all duration-500 hover:opacity-90"
                style={{
                  background: `conic-gradient(
                    ${solidColors[item.label]} 0% ${percent}%, 
                    transparent ${percent}% 100%
                  )`,
                  transform: `rotate(${rotation}deg)`,
                  filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
                }}
              />
            );
          })}
        </div>
        
        {/* Enhanced center badge */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105"
          style={{
            width: chartWidth * 0.35,
            height: chartWidth * 0.35,
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))",
            boxShadow: "0 15px 35px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
            border: "2px solid rgba(255,255,255,0.5)",
          }}
        >
          <div className="text-xs font-semibold text-[#718096] uppercase tracking-wider">Total</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-[#2d3748] to-[#4a5568] bg-clip-text text-transparent">
            {total}
          </div>
          <div className="text-xs text-[#a0aec0] font-medium mt-1">Orders</div>
        </div>
      </div>
    );
  };

  const chartSize = isMobile ? chartWidth : 400;
  const innerRadius = isMobile ? chartWidth * 0.2 : 85;
  const outerRadius = isMobile ? chartWidth * 0.45 : 160;

  return (
    <div
      className="w-full mx-auto rounded-2xl lg:rounded-3xl p-6 lg:p-8 transition-all duration-500 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)",
        border: "1px solid rgba(255,255,255,0.4)",
        boxShadow: `
          0 25px 50px rgba(0,0,0,0.08),
          inset 0 1px 0 rgba(255,255,255,0.6),
          ${isHovered ? '0 35px 60px rgba(0,0,0,0.12)' : '0 15px 35px rgba(0,0,0,0.06)'}
        `,
        backdropFilter: "blur(20px)",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {/* Enhanced Header */}
      <div className={`flex items-center justify-between mb-6 ${isMobile ? 'flex-col gap-4 items-start' : ''}`}>
        <div className="flex items-center gap-4">
         
          <div>
            <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold bg-gradient-to-r from-[#2d3748] to-[#4a5568] bg-clip-text text-transparent`}>
              Order Analytics
            </h3>
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-[#718096] mt-1`}>
              Real-time order status distribution
            </p>
          </div>
        </div>
        
        <div
          className="flex items-center gap-3 px-4 py-2 rounded-2xl transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))",
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            border: "1px solid rgba(255,255,255,0.4)",
          }}
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-bold text-[#2d3748]">{total} Total Orders</span>
        </div>
      </div>

      <div className={`flex ${isMobile ? 'flex-col' : 'flex-col lg:flex-row'} items-center gap-6 lg:gap-8`}>
        {/* Enhanced Legend column */}
        <div className={`w-full ${isMobile ? 'order-2' : 'lg:w-48'} grid gap-3 lg:gap-4`}>
          {legend.map((l) => (
            <LegendItem
              key={l.id}
              color={l.color}
              gradient={l.gradient}
              label={l.label}
              value={l.value}
              percent={l.percent}
            />
          ))}
        </div>

        {/* Enhanced Chart column */}
        <div className={`flex-1 flex justify-center items-center relative ${isMobile ? 'order-1' : ''}`}>
          {isMobile ? (
            <MobilePieChart />
          ) : (
            <div style={{ width: chartSize, height: chartSize, position: "relative" }}>
              {/* Outer glow effect */}
              <div
                style={{
                  position: "absolute",
                  inset: -10,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
                  filter: "blur(20px)",
                  opacity: isHovered ? 0.6 : 0.3,
                  transition: "opacity 0.3s ease",
                }}
              />

              <PieChart
                series={[
                  {
                    innerRadius: innerRadius,
                    outerRadius: outerRadius,
                    paddingAngle: 8,
                    cornerRadius: 20,
                    data: chartData.map(item => ({
                      ...item,
                      color: solidColors[item.label],
                    })),
                  },
                ]}
                width={chartSize}
                height={chartSize}
                slotProps={{
                  legend: { position: "none" },
                  pie: {
                    onClick: (event, pieItem, item) => {
                      console.log('Pie segment clicked:', item);
                    },
                  },
                }}
              />

              {/* Enhanced center badge */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-all duration-500 hover:scale-110 cursor-pointer"
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))",
                  boxShadow: `
                    0 20px 40px rgba(0,0,0,0.15),
                    inset 0 1px 0 rgba(255,255,255,0.8),
                    inset 0 -1px 0 rgba(0,0,0,0.05)
                  `,
                  border: "2px solid rgba(255,255,255,0.6)",
                }}
              >
                <div className="text-sm font-semibold text-[#718096] uppercase tracking-wider mb-1">
                  Orders
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-[#2d3748] to-[#4a5568] bg-clip-text text-transparent">
                  {total}
                </div>
                <div className="text-xs text-[#a0aec0] font-medium mt-2">Live Overview</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced decorative footer */}
      <div className="mt-8 flex flex-col items-center">
        <div className="flex items-center gap-4 text-xs text-[#a0aec0] font-medium">
          <span>🔄 Real-time Updates</span>
          <div className="w-1 h-1 bg-[#a0aec0] rounded-full" />
          <span>📊 Interactive Analytics</span>
          <div className="w-1 h-1 bg-[#a0aec0] rounded-full" />
          <span>⚡ Live Data</span>
        </div>
        
        {!isMobile && (
          <div className="mt-4 flex justify-center">
            <div
              style={{
                width: 200,
                height: 8,
                borderRadius: 999,
                background: "linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c)",
                boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
                opacity: isHovered ? 1 : 0.7,
                transition: "opacity 0.3s ease",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderStatusChart;