import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const PriceChart = () => {
  const [priceData, setPriceData] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    
    fetchPriceData();
  }, []);

  const fetchPriceData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('x-access-token', 'goldapi-7s7c78rlizoheid-io');
      myHeaders.append('Content-Type', 'application/json');

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      const response = await fetch("https://www.goldapi.io/api/XAU/INR",requestOptions);
      const result = await response.json();
      setPriceData(result);
    } catch (error) {
      console.error('Error fetching price data:', error);
    }
  };

  useEffect(() => {
    if (priceData) {
      // Process and format the price data for the chart
      const chartLabels = ['Previous Close', 'Open', 'Low', 'High'];
      const chartData = [
        priceData.prev_close_price,
        priceData.open_price,
        priceData.low_price,
        priceData.high_price,
      ];

      
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

     
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartLabels,
          datasets: [{
            label: 'Price',
            data: chartData,
            backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [priceData]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default PriceChart;
