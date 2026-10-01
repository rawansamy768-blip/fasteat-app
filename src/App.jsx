  import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import MealList from './pages/MealList';
import MealDetails from './pages/MealDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<MealList />} />
        <Route path="/meal/:id" element={<MealDetails />} />
      </Routes>
    </Router>
  );
}

export default App;