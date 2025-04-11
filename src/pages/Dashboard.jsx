import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Typography, Container, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import { Dashboard as DashboardIcon, ShoppingCart, People, BarChart } from '@mui/icons-material';
import api from '../api/axios';
import Products from './Products';
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({
    product_count: 0,
    available_products: 0,
    total_users: 0,
  });
  const { user } = useAuth();
  console.log(user);

  useEffect(() => {
    console.log("User data in Dashboard:", {
      user,
      hasRequiredRoles: user?.user?.roles?.some(role =>
        ['product_manager', 'super_admin'].includes(role.name)
      )
    });
  }, [user]);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('v1/admin/dashboard');
        setStatistics({
          product_count: data.product_count || 0,
          available_products: data.available_products || 0,
          total_users: data.total_users || 0,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center', color: 'text.secondary' }}>
        Welcome back, {user.user?.name}! Role: {user.roles[0]}
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
              color: '#fff',
              boxShadow: 6,
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography gutterBottom sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  Total Products
                </Typography>
                <ShoppingCart sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2 }}>
                {statistics.product_count}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #388e3c, #66bb6a)',
              color: '#fff',
              boxShadow: 6,
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography gutterBottom sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  Available Products
                </Typography>
                <DashboardIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2 }}>
                {statistics.available_products}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #d32f2f, #ef5350)',
              color: '#fff',
              boxShadow: 6,
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography gutterBottom sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  Total Users
                </Typography>
                <People sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2 }}>
                {statistics.total_users}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
