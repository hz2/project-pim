import * as React from 'react';
import { Grid, Paper } from '@mui/material';
import dynamic from 'next/dynamic'
import Layout from '@/components/DashboardLayout'

const DynamicComponent = dynamic(() =>
  import('./postEditor'),
  { ssr: false }
)

function Home() {
  return (
    <Layout>
      <Paper>
      <DynamicComponent />
      </Paper>
    </Layout>
  )
}

export default Home
