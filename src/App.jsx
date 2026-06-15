import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home";

import Adhesion from "./pages/Adhesion";
import Archives from "./pages/Archives";


export default function App() {
  return (
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen transition-colors">
          <Navbar/>

          <Routes>
              <Route path="/" element={<Home/>}/>

              <Route path="/adhesion" element={<Adhesion/>} />
              <Route path="/archives" element={<Archives/>} />
              <Route path="*" element={<Home />} />
          </Routes>

          <Footer/>
      </div>
  );
}


