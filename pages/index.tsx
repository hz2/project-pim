import * as React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { Backdrop, CircularProgress, Container } from '@mui/material';

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem('access_token')
    if (!token) {
      router.push('/sign-in')
    } else {
      router.push('/front')
    }
  }, [])
  return (
    <Container >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        onClick={()=>false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default Home;
