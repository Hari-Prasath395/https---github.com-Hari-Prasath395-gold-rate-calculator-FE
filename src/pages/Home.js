import React from "react";

import LiveGoldPrice from "../components/LiveGoldPrice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <LiveGoldPrice />
      <Footer />
    </div>
  );
};

export default Home;
