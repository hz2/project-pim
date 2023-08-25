import { Box, Container, Link, SvgIcon, Typography } from "@mui/material";
import Footer from "./Footer";
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import Public from '@mui/icons-material/Public';
import Share from '@mui/icons-material/Share';
import { Stack } from '@mui/material';
import styles from './NewHome.module.css';
import { footerItemList, shapeItemList } from "./NewHomeIcons";
import { useEffect, useState } from "react";

const Linkmap = [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Mastodon', rel: "me", icon: Share, link: "https://mastodon.social/@fzz" },
    { name: 'Mastodon', rel: "me", icon: Public, link: "https://mastodon.online/@hz1d", hidden: true },
    { name: 'Telegram', icon: TelegramIcon, link: "https://t.me/+Rndvi8-IksNhYTQx" },
]

interface IRow {
    [k: string]: string
}

const NewHome = () => {

    const [statusList, _setStatusList] = useState<IRow[]>([
        {
            title: 'Creative Design',
            text: 'Envision extraordinary digital landscapes with a user-first approach.'
        },
        {
            title: 'Philosophy & Humanities',
            text: 'Awaken your mind’s curiosity, embracing the questions that define us.'
        },
        {
            title: 'Abstract Construction',
            text: 'Unleash your programming prowess and shape the digital world around you.'
        },
        {
            title: 'Photographic Portfolio',
            text: 'Unveil your creativity with stunning visuals that tell a story.'
        },
    ])
    const [imgList, _setImgList] = useState<IRow[]>([
        {
            title: 'Craft Sophisticated  Fusion',
            img: 'https://m.0xc8.com/main/meta/JGf4udXgHGhkTRenAP8OdRIV34.jpg'
        },
        {
            title: 'Engage Your Mind and Soul',
            img: 'https://m.0xc8.com/main/meta/ctvsrEU2pO3iNdLPaPnHcOCfJrE.webp'
        }
    ])
    // JscafcN4Um9htcM2KkY6p29Cw4.jpg

    // const getTimeLine = () => {
    //     fetch('https://mastodon.social/api/v1/accounts/287193/statuses')
    //         .then(resp => resp.json())
    //         .then(r => {
    //             setStatusList(r || [])
    //         })
    // }
    // useEffect(() => {
    //     getTimeLine()
    // }, [])


    // const dateToYM = (date: string) => {
    //     const dateObj = new Date(date);
    //     return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`

    // }

    return (
        <div >
            <Box sx={{ backgroundImage: "url(https://m.0xc8.com/main/meta/BCPFd4Zjg8M2cBxc00XKr34icXQ.webp)", backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '95vh', mixBlendMode: 'luminosity', py: '40px', }}>
                <Box sx={{ fontSize: 48, fontWeight: 700, color: '#fff', textAlign: 'center', p: "20px" }}>
                    <p>Innovation demands bravery. Risk to challenge.</p>
                    <p>Revolutionize The Digital Voyage.</p>
                </Box>
            </Box>
            <Container sx={{ width: "80%", px: "10px", py: "40px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: "20px", pb: "40px" }}>
                    {
                        imgList.map((x, i) => <Box key={i + '_statuslist'} sx={{
                            width: "50%",
                        }}>

                            <Box
                                component="img"
                                sx={{
                                    aspectRatio: "1/1",
                                    width: "100%",
                                    objectFit: "cover",
                                    mixBlendMode: 'luminosity',
                                    overflow: "hidden",
                                    borderRadius: "20px",
                                }}
                                alt={x?.title}
                                src={x?.img}
                            />
                            <Typography sx={{ fontSize: "32px", fontWeight: 600, my: "12px" }}>{x.title}</Typography>
                        </Box>)
                    } </Box>
            </Container>
            <Box sx={{ bgcolor: "#625f63" }}>
                <Container sx={{ width: "80%", color: "#fff", px: "20px", py: "40px" }}>
                    <Typography sx={{ fontSize: 48, fontWeight: 800, py: "20px" }}>Capture the World</Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px", pb: "40px" }}>
                        {
                            statusList.map((x, i) => <Box key={i + '_statuslist'} sx={{
                                width: "45%",
                                minWidth: "350px",
                                pr: "40px"
                            }}>
                                <Typography sx={{ fontSize: "32px", fontWeight: 600, my: "12px" }}>{x.title}</Typography>
                                <Typography sx={{ fontSize: "16px", my: "10px" }} >{x.text}</Typography>
                            </Box>)
                        } </Box>
                </Container>
            </Box>
            <Container sx={{ display: 'grid', placeItems: "center", px: "20px", py: "40px" }}>
                {/* style="background:rgb(242, 242, 242);transform:rotate(0deg);display:block" */}
                <Box sx={{ display: "flex", flexWrap: "wrap", width: "80%" }}>
                    {
                        shapeItemList.map((El, i) => <SvgIcon key={i + '_shapeitem'} sx={{
                            width: 1 / 4,
                            height: 1 / 4,
                            bgcolor: "rgb(242, 242, 242)"
                        }}>{El}</SvgIcon>)
                    } </Box>
            </Container>
            <Container sx={{ px: "20px", py: "40px", color: "rgb(98, 95, 99)", textAlign: "center" }}>
                <h1>Get Connected</h1>
                <Typography sx={{ px: "60px" }}>Don&apos;t just stand on the sidelines —— be part of our vision. Collaborate, brainstorm, or simply exchange ideas. Let’s unleash our creative potential together.</Typography>
                {/* <Typography sx={{ }}>Contact</Typography> */}
                <Stack sx={{ pt: 2 }} direction="row" alignItems="center" flexWrap="wrap" justifyContent="center">
                    {
                        Linkmap.map((x, i) =>
                            <Link
                                variant="subtitle1"
                                color="text.secondary"
                                href={x.link || '#'}
                                key={x.link + '__' + i}
                                rel={x.rel}
                                target='_blank'
                                className={x.hidden ? styles.contactItemBtnHidden : styles.contactItemBtn}
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
                    title="Loosen up"
                    description="The unexamined life is not worth living"
                />
            </Container>
        </div >
    );
};

export default NewHome;
