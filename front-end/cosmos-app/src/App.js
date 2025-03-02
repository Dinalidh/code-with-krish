import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Orders from './pages/orders';
import Customers from './pages/customers'
import Product from './pages/product';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/order-management">Order Management</Link>
            <Link to="/customer-management">Customer Management</Link>
            <Link to="/product-management">Product Management</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/order-management" element={<Orders />} />
        <Route path="/customer-management" element={<Customers />} />
        <Route path="/product-management" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
