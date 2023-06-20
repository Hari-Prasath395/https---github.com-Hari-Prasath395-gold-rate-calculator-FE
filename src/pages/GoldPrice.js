import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const GoldPrice = () => {
  const [goldRate, setGoldRate] = useState(null);
  const [selectedMetal, setSelectedMetal] = useState("XAU");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [date, setDate] = useState("");

  const handleMetalChange = (event) => {
    setSelectedMetal(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const myHeaders = new Headers();
      myHeaders.append("x-access-token", "goldapi-7s7c78rlizoheid-io");
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `https://www.goldapi.io/api/${selectedMetal}/${selectedCurrency}/`,
        requestOptions
      );
      const data = await response.json();
      const timestamp = data.timestamp;
      const date = new Date(timestamp * 1000).toDateString();

      setGoldRate(data);
      setDate(date);
    } catch (error) {
      console.error("Error fetching gold price:", error);
    }
  };

  const renderGoldRateTable = () => {
    if (!goldRate || !goldRate.price_gram_22k.toFixed(2)) {
      return null;
    }

    return (
      <table className="table table-bordered">
        <thead className="bg-warning">
          <tr>
            <th>Per GMS(22ct)</th>
            <th>Per KG(22ct)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {selectedCurrency === "INR"
                ? `₹${goldRate.price_gram_22k.toFixed(2)}`
                : `$${goldRate.price_gram_22k.toFixed(2)}`}
            </td>
            <td>
              {selectedCurrency === "INR"
                ? `₹${(goldRate.price_gram_22k * 1000).toFixed(2)}`
                : `$${(goldRate.price_gram_22k * 1000).toFixed(2)}`}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const renderCaratGoldRatesTable = () => {
    if (!goldRate) {
      return null;
    }

    const weights = [1, 2, 5, 8, 10, 20, 50, 100];

    return (
      <div>
        <table className="table">
          <thead className="bg-warning">
            <tr>
              <th colSpan="2">24 CARAT GOLD RATES</th>
            </tr>
          </thead>
          <tbody>
            {weights.map((weight) => (
              <tr key={`24k-${weight}`}>
                <td>{weight} Gram</td>
                <td>
                  {selectedCurrency === "INR"
                    ? `₹${(goldRate.price_gram_24k * weight).toFixed(2)}`
                    : `$${(goldRate.price_gram_24k * weight).toFixed(2)}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="table">
          <thead className="bg-warning">
            <tr>
              <th colSpan="2">22 CARAT GOLD RATES</th>
            </tr>
          </thead>
          <tbody>
            {weights.map((weight) => (
              <tr key={`22k-${weight}`}>
                <td>{weight} Gram</td>
                <td>
                  {selectedCurrency === "INR"
                    ? `₹${(goldRate.price_gram_22k * weight).toFixed(2)}`
                    : `$${(goldRate.price_gram_22k * weight).toFixed(2)}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="gold-price-container">
        <h5 className="text-center">Gold Rate Today - {date}</h5>
        <div className="row">
          <div className="col-6">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="metal">Choose Metal:</label>
                <select
                  className="form-control"
                  id="metal"
                  value={selectedMetal}
                  onChange={handleMetalChange}
                >
                  <option value="XAU">Gold (XAU)</option>
                  <option value="XAG">Silver (XAG)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="currency">Choose Currency:</label>
                <select
                  className="form-control"
                  id="currency"
                  value={selectedCurrency}
                  onChange={handleCurrencyChange}
                >
                  <option value="INR">Indian Rupee (INR)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="JPY">Japanese Yen (JPY)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="date">Date (optional):</label>
                <input type="date" className="form-control" id="date" />
              </div>
              <button type="submit" className="btn btn-warning">
                Get Gold Rate
              </button>
            </form>
          </div>
          <div className="col-6 mt-3">{renderGoldRateTable()}</div>
        </div>
        <hr />
        <div>
          <div className="row">
            <div className="col-8">
              <p>
                In India there is something special about gold - It not only is
                valuable but it symbolizes wealth, prosperity and success. Gold
                jewellery is continuing to gain in popularity with both men and
                women. People are not only buying Gold rings, watches,
                necklaces' for their friends, family or themselves, but for
                investment. Investors are always looking to buy any form of gold
                especially gold bars, coins and bullion.
              </p>
              <p>
                Today's gold price in India is ₹4,770 per Gram (22ct), which is
                a general price and isn't region/city specific. The gold price
                in India varies across regions/cities due to various factors
                including market conditions (both locally and internationally),
                the general availability of gold, market demand and additional
                charges such as local and state government taxes and
                transportation costs.
              </p>
              <p>
                Our Live Gold Rates are designed for anyone who interested in
                the value of their gold or the gold rate in general. The gold
                rates we provide are presented in local currency, and are
                obtained dynamically through our trusted sources including the
                Multi Commodity Exchange of India to deliver consistent,
                up-to-date and no dealer markup gold rates.
              </p>
            </div>
            <div className="col-4">
              <table className="table">
                <thead className="bg-warning">
                  <tr>
                    <th colSpan="2">Top Gold Rates</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>24k Gold Items</td>
                    <td>
                      {selectedCurrency === "INR"
                        ? `₹${goldRate?.price_gram_24k.toFixed(2)}`
                        : `$${goldRate?.price_gram_24k.toFixed(2)}`}
                    </td>
                  </tr>
                  <tr>
                    <td>22k Gold Items</td>
                    <td>
                      {selectedCurrency === "INR"
                        ? `₹${goldRate?.price_gram_22k.toFixed(2)}`
                        : `$${goldRate?.price_gram_22k.toFixed(2)}`}
                    </td>
                  </tr>
                  <tr>
                    <td>21k Gold Items</td>
                    <td>
                      {selectedCurrency === "INR"
                        ? `₹${goldRate?.price_gram_21k.toFixed(2)}`
                        : `$${goldRate?.price_gram_21k.toFixed(2)}`}
                    </td>
                  </tr>
                  <tr>
                    <td>20k Gold Items</td>
                    <td>
                      {selectedCurrency === "INR"
                        ? `₹${goldRate?.price_gram_20k.toFixed(2)}`
                        : `$${goldRate?.price_gram_20k.toFixed(2)}`}
                    </td>
                  </tr>
                  <tr>
                    <td>18k Gold Items</td>
                    <td>
                      {selectedCurrency === "INR"
                        ? `₹${goldRate?.price_gram_18k.toFixed(2)}`
                        : `$${goldRate?.price_gram_18k.toFixed(2)}`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col">{renderCaratGoldRatesTable()}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GoldPrice;
