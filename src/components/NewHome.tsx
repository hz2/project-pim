import { Box, Container, Link, SvgIcon, Typography, createSvgIcon } from "@mui/material";
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
            title: 'POST 1 Title',
            date: '2023-07',
        },
        {
            title: 'POST 2 Title',
            date: '2023-07',
        },
        {
            title: 'POST 3 Title',
            date: '2023-07',
        },
        {
            title: 'POST 4 Title',
            date: '2023-07',
        },
    ])

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


    const dateToYM = (date: string) => {
        const dateObj = new Date(date);
        return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`

    }

    return (
        <div >
            <Container sx={{ bgcolor: "#625f63", p: "50px" }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", width: "80%" }}>
                    {
                        statusList.map((x, i) => <Box key={i + '_statuslist'} sx={{
                            color: "#fff",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <div className="title">{x.title}</div>
                            <div className="date">{x.date}</div>
                            {/* <div className="content" dangerouslySetInnerHTML={{ __html: x.content }}></div>
                            <div className="content" >{dateToYM(x.created_at)}</div> */}

                        </Box>)
                    } </Box>
            </Container>
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
                <h2>Get Connected</h2>
                <Typography >Don&apos;t just stand on the sidelines—be part of 0xc8 ‘s vision. Collaborate, brainstorm, or simply exchange ideas. Let’s unleash our creative potential together.</Typography>
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
                    title="Footer"
                    description="Something here to give the footer a purpose!"
                />
            </Container>
        </div >
    );
};

export default NewHome;
