
// Footer.tsx
import React from 'react';
import { Box, Typography, Link, Grid, Container } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const FooterPage: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1e1e1e',
        color: '#ffffff',
        paddingTop: '30px',
        paddingBottom: '20px',
        boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Wallet Management Dashboard
            </Typography>
            <Typography variant="body2">
              Manage your finances efficiently. Track your expenses, manage transactions, and stay on top of your financial health.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/terms" underline="hover" color="inherit" sx={{ display: 'block', marginBottom: '8px' }}>
              Terms of Service
            </Link>
            <Link href="/privacy" underline="hover" color="inherit" sx={{ display: 'block' }}>
              Privacy Policy
            </Link>
          </Grid>

          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <Link href="https://facebook.com" color="inherit" sx={{ marginRight: '15px' }}>
                <Facebook fontSize="large" />
              </Link>
              <Link href="https://twitter.com" color="inherit" sx={{ marginRight: '15px' }}>
                <Twitter fontSize="large" />
              </Link>
              <Link href="https://instagram.com" color="inherit" sx={{ marginRight: '15px' }}>
                <Instagram fontSize="large" />
              </Link>
              <Link href="https://linkedin.com" color="inherit">
                <LinkedIn fontSize="large" />
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          color="inherit"
          textAlign="center"
          sx={{ paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.2)', marginTop: '20px' }}
        >
          © {new Date().getFullYear()} Wallet Management Dashboard. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default FooterPage;
