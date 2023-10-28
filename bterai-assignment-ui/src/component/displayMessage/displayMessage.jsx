import React from 'react';
import { Container, Paper, Typography, Button, Box } from '@mui/material';

const DisplayMessage = ( { message =""   }) => {
  return (

    <Box
    sx={{
        my: 8,
        mt : 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
     
        <Typography variant="h4" gutterBottom>
          {message}
        </Typography>
    </Box>
  );
};

export default DisplayMessage;
