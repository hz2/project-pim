import * as React from 'react';
import { Box, Button, Grid, Paper } from '@mui/material';
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css';
import './post.less';
import Layout from '@/components/DashboardLayout'
import { _get } from '@/utils/service';
import { padding } from '@mui/system';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

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
      <Paper>
        <Box component="span" sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" sx={{ mr: 2 }} onClick={saveArticle}>Publish</Button>
          <Button variant="contained" color="warning" onClick={saveArticle}>Draft</Button>
        </Box>
        <ReactQuill theme="snow"
          modules={modules}
          formats={formats} value={value} onChange={setValue}
          style={{
            padding: '0 10px',
            height: '600px'
          }}
        />
      </Paper>
    </Layout>
  )
}

export default Post