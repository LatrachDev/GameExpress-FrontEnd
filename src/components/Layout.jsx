import { Outlet, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import CartPanel from './CartPanel';

const Layout = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            E-Commerce
          </Typography>
          {isAuthenticated ? (
            <>
              {(user.roles[0] === "super_admin" || user.roles[0] === "product_manager") ? (
                <>
                  <Button sx={{ color: 'white' }} component={Link} to="/dashboard">
                    Dashboard
                  </Button>
                  <Button sx={{ color: 'white' }} component={Link} to="/products">
                    Products
                  </Button>
                  <Button sx={{ color: 'white' }} component={Link} to="/categories">
                    Categories
                  </Button>
                  <Button sx={{ color: 'white' }} onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : user.roles[0] === "client" ? (
                <>
                  <Button sx={{ color: 'white' }} component={Link} to="/guest/products">
                    Products
                  </Button>
                  <div className="inherit">
                    <CartPanel />
                  </div>
                  <Button sx={{ color: 'white' }} onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : null}
            </>
          ) : (
            <>
              <Button sx={{ color: 'white' }} component={Link} to="/guest/products">
                Products
              </Button>
              <Button sx={{ color: 'white' }} component={Link} to="/login">
                Login
              </Button>
              <Button sx={{ color: 'white' }} component={Link} to="/register">
                Register
              </Button>
              <div className="inherit">
                <CartPanel />
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
