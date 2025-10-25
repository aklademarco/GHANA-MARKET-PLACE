import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Collections from "./pages/Collections"; 


const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <Routes>
        <Route path="/" element= {<Home/>} />
        <Route path="/about" element= {<About/>} />
        <Route path="/cart" element= {<Cart/>} />
        <Route path="/collections" element={<Collections/>} />
        <Route path="/contact" element= {<Contact/>} />
        <Route path="/login" element= {<Login/>} />
        <Route path="/orders" element= {<Orders/>} />
        <Route path="/place-order" element= {<PlaceOrder/>} />
        <Route path="/product/:productId" element= {<Product/>} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
