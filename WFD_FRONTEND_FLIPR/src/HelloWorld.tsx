import React from 'react';
import { Button, Typography } from '@mui/material';

const HelloWorld: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography variant="h4">Hello, MUI!</Typography>
      <Button variant="contained" color="primary" onClick={() => alert('Button Clicked!')}>
        Click Me
      </Button>
    </div>
  );
};

export default HelloWorld;