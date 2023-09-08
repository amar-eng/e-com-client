import { AppNavbar as Navbar } from './layouts/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { ExploreScents } from './pages/ExploreScents';
import { PricingPlans } from './pages/PricingPlans';
import { Cart } from './pages/Cart';
export const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore-scents" element={<ExploreScents />} />
          <Route path="/pricing-plans" element={<PricingPlans />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
