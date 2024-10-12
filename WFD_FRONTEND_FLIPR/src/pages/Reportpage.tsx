// src/pages/ReportingAnalytics.tsx
import React from 'react';
import { Box, Grid, Typography, Card, CardContent, Divider, IconButton } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

// Register chart elements for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ReportingAnalytics: React.FC = () => {

  // Example chart data for Spending Insights
  const spendingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Spending',
        data: [500, 400, 450, 600, 700, 800],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // Example chart data for Income vs Expenses
  const incomeVsExpensesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [1500, 1400, 1600, 1700, 1800, 1900],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: [800, 900, 750, 950, 1100, 1200],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <Box sx={{ padding: '2rem', backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" gutterBottom>Reporting & Analytics</Typography>

      <Grid container spacing={3}>
        
        {/* Spending Insights Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <IconButton>
                  <ShowChartIcon color="primary" />
                </IconButton>
                <Typography variant="h6" color="primary">Spending Insights</Typography>
              </Box>
              <Divider />
              <Box mt={2}>
                <Line data={spendingData} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Income vs Expenses Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <IconButton>
                  <AttachMoneyIcon color="secondary" />
                </IconButton>
                <Typography variant="h6" color="secondary">Income vs Expenses</Typography>
              </Box>
              <Divider />
              <Box mt={2}>
                <Line data={incomeVsExpensesData} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Budgeting Tools Section */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <IconButton>
                  <AccountBalanceWalletIcon color="success" />
                </IconButton>
                <Typography variant="h6" color="success">Budgeting Tools</Typography>
              </Box>
              <Divider />
              <Typography variant="body1" mt={2}>Set and track budgets for different categories.</Typography>
              {/* Future Implementation */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportingAnalytics;


