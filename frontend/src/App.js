import './App.css';
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import Cart from './pages/cart/Cart';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Bill from './pages/bill/Bill';
import Customer from './pages/customer/Customer';

function App() {
  return (
    <div className="w-full bg-[#eee] h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRouter>
              <Products />
            </ProtectedRouter>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRouter>
              <Cart />
            </ProtectedRouter>
          }
        />
        <Route
          path="/bill"
          element={
            <ProtectedRouter>
              <Bill />
            </ProtectedRouter>
          }
        />
        <Route
          path="/customer"
          element={
            <ProtectedRouter>
              <Customer />
            </ProtectedRouter>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

export function ProtectedRouter({ children }) {
  if (localStorage.getItem('auth')) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
