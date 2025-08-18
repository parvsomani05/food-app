import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Componets/Navbar";
import HomePage from "./Pages/HomePage";
import Footer from "./Componets/Footer";
import ShopPage from "./Pages/ShopPage";
import NewsPage from "./Pages/NewsPage";
import ContactPage from "./Pages/ContactPage";
import AboutPage from "./Pages/AboutPage";
import LoginPage from "./Pages/login";
import RegistrationPage from "./Pages/register";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminPanel from "./Pages/AdminPanel";
import CheckoutPage from "./Pages/CheckoutPage";
import CartPage from "./Pages/CartPage";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <>
      {/* <Navbar/> */}
      <Router>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegistrationPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/News" element={<NewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
          </Routes>
          <Footer />
        </CartProvider>
      </Router>
    </>
  );
}

export default App;
