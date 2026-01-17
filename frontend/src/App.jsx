import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Researchers from "./pages/Researchers";
import Journals from "./pages/Journals";
import Papers from "./pages/Papers";
import Equipment from "./pages/Equipment";
import ResearcherProfile from "./pages/ResearcherProfile";
import Office from "./pages/Office";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/researchers" element={<Researchers />} />
        <Route path="/journals" element={<Journals />} />
        <Route path="/papers" element={<Papers />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/researchers/:id" element={<ResearcherProfile />} />
        <Route path="/office" element={<Office />} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;
