import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRoute from './components/AuthRoute'; 
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Unauthorized from './pages/Unauthorized';
import Layout from './components/Layout';
import Products from './pages/Products';
import { CategoryProvider } from './context/CategoryContext';
import Categories from './pages/Categories';
import ProductProvider from './context/ProductContext';
import ShowProduct from './pages/showProduct';
import UserProducts from './pages/UserProducts'
import CardProvider from './context/CardContext';
function App() {
  return (
    <Router>
      <AuthProvider>
        <CategoryProvider>
          <ProductProvider>
            <CardProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            
          
            <Route element={<AuthRoute />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            
            <Route path="unauthorized" element={<Unauthorized />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute roles={['product_manager', 'super_admin']} />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            
            <Route element={<ProtectedRoute roles={['super_admin']} />}>
              {/* <Route path="categories" element={<div>Categories Management</div>} /> */}
              <Route path="categories" element={<Categories/>}/>
            </Route>
           
            <Route element={<ProtectedRoute roles={['super_admin','product_manager']} />}>
              <Route path="products" element={<Products/>}/>
            </Route>
          {/* client and guest */}
          <Route element={<ProtectedRoute roles={['client']} />}>
              <Route path="client/products" element={<UserProducts/>}/>
            </Route>
            <Route path="guest/products"  element={<UserProducts/>}/>
            {/*  */}
            <Route element={<ProtectedRoute roles={['product_manager', 'super_admin']} />}>
              <Route path="products" element={<Products/>} />
            </Route>
            {/* show product */}
            <Route path="products/:id" element={<ShowProduct/>} />
          </Route>
          <Route path="*" element={<div>404</div>} />
        </Routes>
        </CardProvider>
        </ProductProvider>
        </CategoryProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;