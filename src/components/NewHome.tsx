import { Box, Container, Link, SvgIcon, Typography, createSvgIcon } from "@mui/material";
import Footer from "./Footer";
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import Public from '@mui/icons-material/Public';
import Share from '@mui/icons-material/Share';
import { Stack } from '@mui/material';
import styles from './NewHome.module.css';
import { footerItemList } from "./NewHomeIcons";

const Linkmap = [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Mastodon', rel: "me", icon: Share, link: "https://mastodon.social/@fzz" },
    { name: 'Mastodon', rel: "me", icon: Public, link: "https://mastodon.online/@hz1d" },
    { name: 'Telegram', icon: TelegramIcon, link: "https://t.me/+Rndvi8-IksNhYTQx" },
]
const NewHome = () => {
    return (
        <Container >
            <Container sx={{ px: "20px", py: "40px", color: "rgb(98, 95, 99)", textAlign: "center" }}>
                <h2>Get Connected</h2>
                <Typography >Don&apos;t just stand on the sidelines—be part of 0xc8 ‘s vision. Collaborate, brainstorm, or simply exchange ideas. Let’s unleash our creative potential together.</Typography>
                {/* <Typography sx={{ }}>Contact</Typography> */}
                <Stack sx={{ pt: 2 }} direction="row" alignItems="center" justifyContent="center">
                    {
                        Linkmap.map(x =>
                            <Link
                                variant="subtitle1"
                                color="text.secondary"
                                href={x.link || '#'}
                                key={x.link}
                                rel={x.rel}
                                target='_blank'
                                className={styles.contactItemBtn}
                            >
                                <x.icon />
                                <Box component="span" sx={{ m: .8 }}>{x.name}</Box>
                            </Link>)
                    }  </Stack>
            </Container>
            <Container sx={{ display: 'grid', placeItems: "center", px: "20px", py: "40px" }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", width: "160px" }}>
                    {
                        footerItemList.map((El, i) => <SvgIcon key={i + '_footeritem'} sx={{
                            width: 1 / 2,
                            height: 1 / 2,
                            bgcolor: "rgb(242, 242, 242)"
                        }}>{El}</SvgIcon>)
                    } </Box>
                <Footer
                    title="Footer"
                    description="Something here to give the footer a purpose!"
                />
            </Container>
        </Container >
    );
};

export default NewHome;
