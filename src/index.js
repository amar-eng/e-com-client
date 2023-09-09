import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import './styles/main.scss';
import reportWebVitals from './reportWebVitals';
import { Home } from './pages/Home';
import { ExploreScents } from './pages/ExploreScents';
import { PricingPlans } from './pages/PricingPlans';
import { Cart } from './pages/Cart';
import store from './store';
import { ProductDetails } from './pages/ProductDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route index={true} path="/explore-scents" element={<ExploreScents />} />
      <Route index={true} path="/pricing-plans" element={<PricingPlans />} />
      <Route
        index={true}
        path="/explore-scents/:id"
        element={<ProductDetails />}
      />
      <Route path="/cart" element={<Cart />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
