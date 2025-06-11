import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./pages/Home/Home";
import Plants from "./pages/Plants/Plants";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";

const basename = process.env.NODE_ENV === "production" ? "/MSCPlant" : "";

const App = () => {
  return (
    <BrowserRouter basename={basename}>
      <div className="app-wrapper">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plants" element={<Plants />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
