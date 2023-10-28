import React from 'react';
import { Container, Paper, Typography, Button, Box } from '@mui/material';

const RegistrationBox = ( { handleRegistration }) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const paperStyle = {
    padding: '16px',
    textAlign: 'center',
  };

  const buttonStyle = {
    margin: '8px',
  };

  

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

    <Container style={containerStyle}>
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h5" gutterBottom>
          Are you want to register?
        </Typography>

        <Box display="flex" justifyContent="center">
          <Button variant="contained" color="primary" style={buttonStyle} onClick={( e)=> handleRegistration(true) } >
            Yes
          </Button>
          <Button variant="contained" color="secondary" style={buttonStyle} onClick={( e)=> handleRegistration(false) } >
            No
          </Button>
        </Box>
      </Paper>
    </Container>
    </Box>
  );
};

export default RegistrationBox;
