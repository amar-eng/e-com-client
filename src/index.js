import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import App from './App';
import './styles/main.scss';
import reportWebVitals from './reportWebVitals';
import { Home } from './pages/Home';
import { ExploreScents } from './pages/ExploreScents';
import { PricingPlans } from './pages/PricingPlans';
import { Cart } from './pages/Cart';
import store from './store';
import { ProductDetails } from './pages/ProductDetails';
import { LoginPage } from './pages/LoginPage';
import { Register } from './pages/Register';
import { Shipping } from './pages/Shipping';
import { PrivateRoute } from './layouts/PrivateRoute';
import { Payment } from './pages/Payment';
import { PlaceOrder } from './pages/PlaceOrder';
import { OrderDetails } from './pages/OrderDetails';
import { Profile } from './pages/profile/Profile';
import { OrderList } from './pages/Admin/OrderList';
import { Account } from './pages/profile/Account';
import { AdminRoute } from './layouts/AdminRoute';
import { MyOrders } from './pages/profile/MyOrders';
import { ProductList } from './pages/Admin/ProductList';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/explore-scents" element={<ExploreScents />} />
      <Route path="/pricing-plans" element={<PricingPlans />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/explore-scents/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="order/:id" element={<OrderDetails />} />
        <Route path="my-profile" element={<Profile />} />
        <Route path="my-account" element={<Account />} />
        <Route path="my-orders" element={<MyOrders />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderList />} />
        <Route path="/admin/productlist" element={<ProductList />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
