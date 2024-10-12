import React from 'react';
import { Box, Grid, Paper, Typography, List, ListItem, ListItemText, Table, TableHead, TableRow, TableCell, TableBody, Divider } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const DashboardPage: React.FC = () => {
  return (
    <Box sx={{ p: 4, backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Grid container spacing={4}>
        {/* Balance Summary Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={5} sx={{ p: 3, borderRadius: 5, backgroundColor: '#3f51b5', color: 'white' }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', mb: 2 }}>
              <AccountBalanceWalletIcon sx={{ mr: 1 }} /> Balance Summary
            </Typography>
            <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.3)' }} />
            <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <span>Cash</span> <span>$500</span>
            </Typography>
            <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <span>Bank Account</span> <span>$1,500</span>
            </Typography>
            <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <span>Credit Card</span> <span>$2,000</span>
            </Typography>
          </Paper>
        </Grid>

        {/* Recent Transactions Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={5} sx={{ p: 3, borderRadius: 5, backgroundColor: '#ffffff' }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', mb: 2, color: '#673ab7' }}>
              <AttachMoneyIcon sx={{ mr: 1 }} /> Recent Transactions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Type</strong></TableCell>
                  <TableCell><strong>Amount</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>2024-10-09</TableCell>
                  <TableCell>Deposit</TableCell>
                  <TableCell>$500</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2024-10-08</TableCell>
                  <TableCell>Expense</TableCell>
                  <TableCell>$200</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        {/* Notifications Section */}
        <Grid item xs={12}>
          <Paper elevation={5} sx={{ p: 3, borderRadius: 5, backgroundColor: '#ff7043', color: 'white' }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', mb: 2 }}>
              <NotificationsActiveIcon sx={{ mr: 1 }} /> Notifications
            </Typography>
            <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.5)' }} />
            <List>
              <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItemText primary="Low balance on Cash Wallet!" />
                <Typography variant="body2" color="error"><strong>Alert</strong></Typography>
              </ListItem>
              <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.3)' }} />
              <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItemText primary="Upcoming bill: Credit Card payment due in 5 days" />
                <Typography variant="body2" color="primary"><strong>Reminder</strong></Typography>
              </ListItem>
              <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.3)' }} />
              <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItemText primary="Unusual activity: Large deposit detected" />
                <Typography variant="body2" color="warning.main"><strong>Notice</strong></Typography>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;

