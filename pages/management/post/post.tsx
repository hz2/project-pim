import * as React from 'react';
import { Grid, Paper } from '@mui/material';
import dynamic from 'next/dynamic'
import Layout from '@/components/DashboardLayout'
import { _get } from '@/utils/service';

const DynamicComponent = dynamic(() =>
  import('./postEditor'),
  { ssr: false }
)

function Post() {

  const [list, setList] = React.useState<[]>([])
  // const { dispatch } = React.useContext(UserContext)

  const getList = () => {
      _get('/sys/post').then(res => {
        console.log('eeee',res );
        
      })
  }

  React.useEffect(() => {
      getList()
  }, [])


  return (
    <Layout>
      <Paper>
      <DynamicComponent />
      </Paper>
    </Layout>
  )
}

export default Post
