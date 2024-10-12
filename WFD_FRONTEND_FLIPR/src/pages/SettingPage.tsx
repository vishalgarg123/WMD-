import React from 'react';
import { Box, Typography, Button, Switch, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Card, CardContent, Divider } from '@mui/material';
import { Save } from '@mui/icons-material';

const SettingsPage: React.FC = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {/* User Preferences Section */}
      <Card variant="outlined" sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>User Preferences</Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select defaultValue="English">
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Hindi">Hindi</MenuItem>
                  {/* Add more language options */}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select defaultValue="USD">
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="INR">INR</MenuItem>
                  {/* Add more currency options */}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography>Customize Dashboard Layout</Typography>
              <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                Change Layout
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Security Settings Section */}
      <Card variant="outlined" sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Security Settings</Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField type="password" label="Update Password" fullWidth />
              <Button variant="contained" color="secondary" startIcon={<Save />} sx={{ mt: 2 }}>
                Update
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography>Enable Two-Factor Authentication (2FA)</Typography>
              <Switch color="primary" />
            </Grid>

            <Grid item xs={12}>
              <Typography>Manage Connected Devices</Typography>
              <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                View Devices
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Notification Settings Section */}
      <Card variant="outlined" sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Notification Settings</Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Receive Email Notifications</Typography>
              <Switch color="primary" />
            </Grid>

            <Grid item xs={12}>
              <Typography>Receive SMS Notifications</Typography>
              <Switch color="primary" />
            </Grid>

            <Grid item xs={12}>
              <Typography>Choose Notification Frequency</Typography>
              <Select defaultValue="Daily" fullWidth>
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettingsPage;
