import React, { useEffect, useState } from "react";
import { api } from "../../Api/Axios";
import { BarChart, LineChart } from "@mui/x-charts";

export default function BagTypeChart() {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [chartType, setChartType] = useState("bar"); // "bar", "line"
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  async function fetchProducts() {
    try {
      setIsLoading(true);
      const res = await api.get("/products");
      const products = Array.isArray(res?.data?.Products) ? res?.data?.Products : [];

      const counts = {};
      products.forEach((p) => {
        const type = p.type || "Unknown";
        counts[type] = (counts[type] || 0) + 1;
      });

      const sorted = Object.entries(counts)
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count);

      setLabels(sorted.map((i) => i.type));
      setData(sorted.map((i) => i.count));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const totalProducts = data.reduce((sum, count) => sum + count, 0);

  const renderBarChart = () => (
    <BarChart
      height={isMobile ? 320 : 440}
      xAxis={[{ 
        scaleType: "band", 
        data: labels,
        tickLabelStyle: {
          fontSize: isMobile ? 10 : 12,
          fontWeight: 600,
          fill: '#4b3f2f'
        }
      }]}
      yAxis={[{
        tickLabelStyle: {
          fontSize: isMobile ? 10 : 12,
          fontWeight: 600,
          fill: '#4b3f2f'
        }
      }]}
      series={[
        {
          data: data,
          label: "Count",
          valueFormatter: (v) => v.toString(),
          color: '#b6925e'
        },
      ]}
      slotProps={{
        bar: {
          style: {
            fill: "url(#premium-gradient)",
            transition: "all 0.3s ease",
            transformOrigin: "center bottom",
            rx: 6,
          },
        },
        barLabel: {
          position: "top",
          fontSize: isMobile ? 10 : 12,
          fontWeight: 700,
          fill: '#4b3f2f'
        },
      }}
      margin={{
        left: isMobile ? 50 : 70,
        right: isMobile ? 20 : 40,
        top: isMobile ? 50 : 70,
        bottom: isMobile ? 70 : 90,
      }}
    />
  );

  const renderLineChart = () => (
    <LineChart
      height={isMobile ? 320 : 440}
      xAxis={[{ 
        scaleType: "band", 
        data: labels,
        tickLabelStyle: {
          fontSize: isMobile ? 10 : 12,
          fontWeight: 600,
          fill: '#4b3f2f'
        }
      }]}
      series={[
        {
          data: data,
          label: "Count",
          valueFormatter: (v) => v.toString(),
          color: '#b6925e',
          curve: 'natural'
        },
      ]}
      slotProps={{
        line: {
          style: {
            strokeWidth: 3,
          },
        },
      }}
      margin={{
        left: isMobile ? 50 : 70,
        right: isMobile ? 20 : 40,
        top: isMobile ? 50 : 70,
        bottom: isMobile ? 70 : 90,
      }}
    />
  );

  const ChartButton = ({ type, icon, label }) => (
    <button
      onClick={() => setChartType(type)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
        chartType === type
          ? 'bg-gradient-to-r from-[#b6925e] to-[#d6b98d] text-white shadow-lg'
          : 'bg-white/80 text-[#4b3f2f] hover:bg-white hover:shadow-md border border-[#e6dfd3]'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b6925e]"></div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 lg:p-6">
      <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Premium Header */}
        <div className="bg-gradient-to-r from-[#f7f3ee] to-[#fffaf5] border-b border-[#e6dfd3] p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
              
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[#4b3f2f] to-[#b6925e] bg-clip-text text-transparent">
                    Product Analytics
                  </h2>
                  <p className="text-[#7a6a55] text-sm mt-1">
                    Distribution across {labels.length} bag types • {totalProducts} total products
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-[#4b3f2f]">{totalProducts}</div>
                <div className="text-xs text-[#7a6a55]">Total Products</div>
              </div>
              <div className="w-px h-8 bg-[#e6dfd3]"></div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#4b3f2f]">{labels.length}</div>
                <div className="text-xs text-[#7a6a55]">Categories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Type Selector */}
        <div className="px-6 py-4 bg-white/50 border-b border-[#e6dfd3]">
          <div className="flex flex-wrap gap-3">
            <ChartButton type="bar" label="Bar Chart" />
            <ChartButton type="line"  label="Line Chart" />
          </div>
        </div>

        {/* Chart Container */}
        <div className="p-6">
          {labels.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#f7f3ee] to-[#fffaf5] rounded-full flex items-center justify-center border border-[#e6dfd3]">
                <span className="text-3xl">📦</span>
              </div>
              <h3 className="text-xl font-semibold text-[#4b3f2f] mb-2">No Data Available</h3>
              <p className="text-[#7a6a55]">Product data will appear here once available</p>
            </div>
          ) : (
            <div className="relative">
              {chartType === "bar" && renderBarChart()}
              {chartType === "line" && renderLineChart()}
              
              {/* Gradient Definitions */}
              <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                  <linearGradient id="premium-gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#b6925e" />
                    <stop offset="50%" stopColor="#d6b98d" />
                    <stop offset="100%" stopColor="#f1e8dc" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
        </div>

        {/* Legend & Footer */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#f7f3ee] to-[#fffaf5] border-t border-[#e6dfd3]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-[#b6925e] to-[#d6b98d] rounded"></div>
                <span className="text-sm text-[#4b3f2f]">Product Count</span>
              </div>
              <div className="text-xs text-[#7a6a55]">
                Updated just now
              </div>
            </div>
            <div className="text-xs text-[#7a6a55] font-medium">
              Miraggio Analytics • Premium Dashboard
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}