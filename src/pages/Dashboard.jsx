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
    <Container maxWidth="lg" className="mt-8 mb-8">
      <h1 className="text-2xl font-bold text-center mb-2">
        Dashboard
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Welcome back, {user.user?.name}! you logged in as {user.roles[0]}
     </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Total Products Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl">
          <div className="bg-blue-500 p-4">
            <h2 className="text-white text-xl font-bold">Total Products</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-gray-800">{statistics.product_count}</div>
                <div className="text-sm text-gray-500 mt-2">Products in inventory</div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingCart className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <div className="flex items-center text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0114 7z" clipRule="evenodd" />
                </svg>
                <span className="ml-1">Updated today</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Available Products Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl">
          <div className="bg-green-500 p-4">
            <h2 className="text-white text-xl font-bold">Available Products</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-gray-800">{statistics.available_products}</div>
                <div className="text-sm text-gray-500 mt-2">In stock and ready to ship</div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DashboardIcon className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="mt-6">
              <div className="text-sm text-gray-500 mb-1 flex justify-between">
                <span>Stock level</span>
                <span>{statistics.available_products > 0 ? 
                  Math.floor((statistics.available_products / statistics.product_count) * 100) : 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${statistics.available_products > 0 ? 
                    Math.floor((statistics.available_products / statistics.product_count) * 100) : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Total Users Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl">
          <div className="bg-purple-500 p-4">
            <h2 className="text-white text-xl font-bold">Total Users</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-gray-800">{statistics.total_users}</div>
                <div className="text-sm text-gray-500 mt-2">Registered accounts</div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <People className="h-8 w-8 text-purple-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Active users</span>
                </div>
                <div className="text-gray-500">{statistics.total_users}</div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </Container>
  );
};

export default Dashboard;
