import React, { useMemo } from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import { LoginForm } from './components/LoginForm';
import { useGolfCanada } from './golfcanada/GolfCanadaContext';
import { UserProfile } from './components/UserProfile';

function App() {
  const { authToken, client} = useGolfCanada();

  const Component = useMemo(() => {
    return (
      authToken 
        ? <LoginForm onLogin={client?.login}></LoginForm> 
        : <UserProfile user={authToken?.user}></UserProfile>
    )
  }, [authToken])

  return (
    <Box sx={{
      width: 400,
      height: 400,
      margin: 1
    }}>
      <Stack 
        direction='column' 
        spacing={2}>
        { Component }
        <Typography fontSize={12} color={'grey'}>
          * Not affliated with Golf Canada, please direct any questions or comments
            to <Link href='https://github.com/kenjdavidson/golfcanada-chrome-ext' target='_blank'>github/kenjdavidson</Link> and 
            hopefully this doesn&apos;t get shut down.
        </Typography>
      </Stack>
    </Box>
  );
}

export default App;
