import * as React from 'react';
import { Box, Button, Grid, Paper } from '@mui/material';
import dynamic from 'next/dynamic'
import Layout from '@/components/DashboardLayout'
import { _get } from '@/utils/service';
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

function Post() {
  
  const [value, setValue] = React.useState('');
  const [list, setList] = React.useState<[]>([])
  // const { dispatch } = React.useContext(UserContext)

  const getList = () => {
    _get('/sys/post').then(res => {
      console.log('eeee', res);

    })
  }

  React.useEffect(() => {
    getList()
  }, [])


  const saveArticle = () => {
    console.log('saveArticle');

  }


  return (
    <Layout>
      <Paper className='post-page'>
        <Box component="span" sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" sx={{ mr: 2 }} onClick={saveArticle}>Publish</Button>
          <Button variant="contained" color="warning" onClick={saveArticle}>Draft</Button>
        </Box>
        <Editor />
        {/* <ReactQuill theme="snow"
          modules={modules}
          formats={formats} value={value} onChange={setValue}
          style={{
            padding: '0 10px',
            height: '600px'
          }}
        /> */}
      </Paper>
    </Layout>
  )
}

export default Post
