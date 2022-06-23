import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';

interface MainProps {
  posts: ReadonlyArray<{
    content: string
    title: string
    tags: string
    categories: string
    updated: string
  }>;
  title: string;
}

export default function Main(props: MainProps) {
  const { posts, title } = props;
  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts?.map((x) => (
        <>
          <h1>{x.title}</h1>
          <p>
            <em>{x.updated}</em> |
            <em>{x.categories}</em> |
            <em>{x.tags}</em>
          </p>
          <Markdown className="markdown" key={x.content?.substring(0, 40)}>
            {x.content}
          </Markdown>
        </>
      ))}
    </Grid>
  );
}
