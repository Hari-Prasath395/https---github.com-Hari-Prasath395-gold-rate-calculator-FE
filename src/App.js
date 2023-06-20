import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import RequestPasswordReset from "./pages/RequestPasswordReset";
import PasswordResetPage from "./pages/PasswordResetPage";
import Home from "./pages/Home";
import GoldPrice from "./pages/GoldPrice";
import ContactUsForm from "./pages/ContactUsForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/login"} element={<Login />} />
        <Route
          path="/request-password-reset"
          element={<RequestPasswordReset />}
        />
        <Route
          path="/password-reset-success/:userId/:resetString"
          element={<PasswordResetPage />}
        />
        <Route path="/home" element={<Home />}></Route>
        <Route path="/gold-price" element={<GoldPrice />}></Route>
        <Route path="/contact-us" element={<ContactUsForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;


