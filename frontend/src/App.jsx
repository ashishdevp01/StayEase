import {Routes, Route, useLocation} from "react-router-dom";
import React from 'react';
import Home from "./pages/Home";
import Hotel from "./pages/Hotel";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Mybooking from "./pages/Mybooking";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { AppContext } from "./context/AppContext";
import OwnerLayout from "./pages/owner/OwnerLayout";
import AllHotel from "./pages/owner/AllHotel";
import RegisterHotel from "./pages/owner/RegisterHotel";
import AllRoom from "./pages/owner/AllRoom";
import AddRoom from "./pages/owner/AddRoom";
import Bookings from "./pages/owner/Bookings";
import { useContext } from "react";
import Loader from "./components/loader";

const App = () => {
  const ownerPath = useLocation().pathname.includes("owner");
  const { owner, user } = useContext(AppContext); // Destructure 'user' here

  return (
    <div className="w-full mx-auto">
      <Toaster />
      
      {!ownerPath && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotel />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/room/:id" element={<SingleRoom />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        
        {/* Protected My Bookings Route */}
        <Route 
          path="/my-bookings" 
          element={user ? <Mybooking /> : <Login />} 
        />

        <Route path="/loader/:nextUrl" element={<Loader />} />

        <Route
          path="/owner" element={owner ? <OwnerLayout /> : <Login />} >
          <Route index element={owner ? <AllHotel /> : <Login />} />
          <Route path="register-hotel" element={owner ? <RegisterHotel /> : <Login />} />
          <Route path="rooms" element={owner ? <AllRoom /> : <Login />} />
          <Route path="add-room" element={owner ? <AddRoom /> : <Login />} />
          <Route path="bookings" element={owner ? <Bookings /> : <Login />} />
        </Route>
      </Routes>
      
      {!ownerPath && <Footer />}
    </div>
  );
}

export default App;

