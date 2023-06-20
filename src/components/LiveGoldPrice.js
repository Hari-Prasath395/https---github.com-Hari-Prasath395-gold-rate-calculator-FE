
import React, { useState, useEffect } from 'react';
import { BiWifi } from 'react-icons/bi';
import "./LiveGoldPrice.css";
import PriceChart from './PriceChart';


const LiveGoldPrice = () => {
  const [caratValue, setCaratValue] = useState('24');
  const [weightGrams, setWeightGrams] = useState(0);
  const [goldRate, setGoldRate] = useState(0);

  const handleCaratChange = (e) => {
    setCaratValue(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeightGrams(Number(e.target.value));
  };

  const calculateGoldRate = (e) => {
    e.preventDefault();
    fetchGoldData();
  };

  useEffect(() => {
    fetchGoldPrice();
  }, []);

  const fetchGoldData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('x-access-token', 'goldapi-7s7c78rlizoheid-io');
      myHeaders.append('Content-Type', 'application/json');

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch('https://www.goldapi.io/api/XAU/INR', requestOptions);
      const data = await response.json();
      const priceGram = data[`price_gram_${caratValue}k`];
      setGoldRate(priceGram * weightGrams);
    } catch (error) {
      console.error('Error fetching gold data:', error);
    }
  };

  const fetchGoldPrice = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('x-access-token', 'goldapi-7s7c78rlizoheid-io');
      myHeaders.append('Content-Type', 'application/json');

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch('https://www.goldapi.io/api/XAU/INR', requestOptions);
      const data = await response.json();
      const price = data.price;

      setGoldRate(price);
    } catch (error) {
      console.error('Error fetching gold price:', error);
    }
  };

  return (
    <div className="bg-light p-3">
      <h6>
        <BiWifi size={20} style={{ marginRight: '5px' }} />
        Live Gold Price - INR {goldRate ? goldRate.toFixed(2) : 'Loading...'} 
      </h6>
      <hr />
      <div>
        <h5 className="title">Gold Calculator</h5>
      </div>
      <div className="row">
        <div className="col-8">
          <div >
            <div>
              <form onSubmit={calculateGoldRate}>
                <div className="form-group">
                  <label htmlFor="carat">Carat Value:</label>
                  <select className="form-control" id="carat" value={caratValue} onChange={handleCaratChange}>
                    <option value="24">24</option>
                    <option value="22">22</option>
                    <option value="18">18</option>
                    <option value="14">14</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="weight">Weight in Grams:</label>
                  <div className="input-group">
                    <input type="text" className="form-control" id="weight" value={weightGrams} onChange={handleWeightChange} />
                    <div className="input-group-append">
                      <span className="input-group-text">grams</span>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-warning">
                  Calculate
                </button>
                <div className="mt-3">
                  <h6>Price in INR:</h6>
                  <h1>{goldRate ? goldRate.toFixed(2) : 'Loading...'}</h1>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-4">
          <img
            className="jewel"
            src="https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Gold Image"
          />
        </div>
      </div>
      <hr/>
      <div className='col-md-10'>
        <h5 >Variations Chart</h5>
      <PriceChart/>
      </div>
     
      <div>
        <h5 className="info">How does it work?</h5>
        <p>
          This gold calculator uses real-time Indian gold prices to calculate the value of your gold. If you know how much your gold weighs and its purity (carat), enter the value into the calculator then click 'calculate' to receive an instant estimation of how much your gold is
          worth. This calculator provides you an idea on what price you could get for your gold if you were to sell it in India. The selling price will vary depending on time and location.
        </p>
      </div>
      <div>
        <h5 className="info">About our live gold price</h5>
        <p>
          The Live Gold Price we use to help you estimate the current Karat Value of your Gold is sourced from multiple, trusted gold price services from India and across the world. The current live gold price is 160,429.00 (ozt). This price is a general price only and is not
          location-specific (e.g., Chennai, Mumbai, Delhi, Bangalore, Kerala, Hyderabad). For the latest gold prices for India and locations within India, visit Gold Price Live India.
        </p>
      </div>
      <div>
        <h5 className="info">Sell gold India</h5>
        <p>
          There are many great places that buy gold items in India! Gold buyers purchase all types of gold items including rings, bracelets, earrings, necklaces, and other scrap gold. Click here to find your closest Gold Buyer now. If you want to contact us in relation to the gold price or
          anything
        </p>
      </div>
      
    </div>
  );
};

export default LiveGoldPrice;


