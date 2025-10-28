import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import './App.css';
import './index.css';
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Users from "./pages/Users";
import GoldRates from "./pages/GoldRates";
import Movies from "./pages/Movies";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Router> {/* Handles all routing*/}
      <div className="flex flex-col min-h-screen">
        <Navbar /> {/*always visible*/}
        <main className="flex-grow">
          <Routes> 
            <Route path="/" element={<Home />} />
             <Route path="/weather" element={<Weather />} />
            <Route path="/users" element={<Users />} />
           <Route path="/gold" element={<GoldRates />} /> 
           <Route path="/movies" element={<Movies />} /> 
            <Route path="/about" element={<About />} />   
            <Route path="/contact" element={<Contact />} />
          </Routes> 
        </main>
        <Footer /> //always viisble
      </div>
    </Router>
  );
}








