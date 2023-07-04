import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import PageProvider from '@/components/PageProvider';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from '@/components/Footer';
import { _get, _req } from '@/utils/service';

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://m.0xc8.com/main/sample/dddepth-007.jpg',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Mastodon', rel: "me", icon: ShareTwoToneIcon, link: "https://mastodon.online/@hz1d" },
    { name: 'Telegram', icon: TelegramIcon, link: "https://t.me/+Rndvi8-IksNhYTQx" },
  ],
  links: [
    { title: 'GitLab Repo', url: 'https://git.zh.rs/' },
    { title: 'Rancher', url: 'https://c.0xc8.com/' },
    { title: 'Drone CI', url: 'https://drone.0xc8.com' }
  ],
};


interface IPost {
  updated: string;
  content: string;
  image: string;
  imageLabel: string;
  title: string;
}

interface IRemotePost {

  content: string
  title: string
  tags: string
  categories: string
  updated: string
}


const featuredPosts: IPost[] = [
  {
    title: 'Featured post',
    updated: 'Nov 12',
    content:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://m.0xc8.com/main/sample/dddepth-351.jpg',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    updated: 'Nov 11',
    content:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://m.0xc8.com/main/sample/dddepth-137.jpg',
    imageLabel: 'Image Text',
  },
];
export default function Blog() {
  const [posts, setPosts] = React.useState<IRemotePost[]>([])

  React.useEffect(() => {
    getList()

  }, [])

  const getList = () => {
    _get('/sys/post').then(res => {
      setPosts(res)
    })
  }
  return (
    <PageProvider>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="Posts" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
              menulinks={sidebar.links}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </PageProvider>
  );
}
