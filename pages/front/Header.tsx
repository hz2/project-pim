import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

interface HeaderProps {
  sections: ReadonlyArray<{
    title?: string;
    url: string;
  }>;
  title?: string;
}

export default function Header(props: HeaderProps) {
  const { sections, title } = props;

  const [hasToken, setHasToken] = React.useState(false)

  React.useEffect(() => {
    const token = sessionStorage.getItem('access_token')
    setHasToken(Boolean(token))
  }, [])

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        {
          hasToken ?
            <Link href="/dashboard" color="secondary">
              <Button variant="outlined" size="small">
                Admin
              </Button>
            </Link> :
            <Link href="/sign-in" color="secondary">
              <Button variant="outlined" size="small">
                Sign in
              </Button>
            </Link>
        }
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections?.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}
