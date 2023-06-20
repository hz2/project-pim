import { Box, Container, Link, Typography } from "@mui/material";
import Footer from "./Footer";


const footerItem = {
    display: "inline-block",
    width: "80px",
    height: "80px",
    bgcolor: "rgb(242, 242, 242)"
}

const NewHome = () => {
    return (
        <Container >
            <Container sx={{ px: "20px", py: "40px", color: "rgb(98, 95, 99)", textAlign: "center" }}>
                <h2>Get Connected</h2>
                <Typography >Don't just stand on the sidelines—be part of 0xc8 ’s vision. Collaborate, brainstorm, or simply exchange ideas. Let’s unleash our creative potential together.</Typography>
                <Typography sx={{ bgcolor: "#625f63", fontFamily: "monospace", borderRadius: "8px", my: "25px", py: "10px", px: "20px", display: "inline-block", color: "#fff" }}>Contact</Typography>
            </Container>
            <Container sx={{ display: 'grid', placeItems: "center", px: "20px", py: "40px" }}>
                <Box sx={{ display: "flex" }}>
                    <Box sx={footerItem}>
                        <svg viewBox="0 0 200 200" fill="none" >
                            <path d="M200 100L0 0V200L200 100Z" fill="rgb(98, 95, 99)"></path>
                        </svg>
                    </Box>
                    <Box sx={footerItem}>
                        <svg viewBox="0 0 200 200" fill="none" >
                            <path fillRule="evenodd" clipRule="evenodd" d="M150 100C177.614 100 200 77.6142 200 50C200 22.3858 177.614 0 150 0C122.386 0 100 22.3858 100 50C100 77.6142 122.386 100 150 100ZM50 200C77.6142 200 100 177.614 100 150C100 122.386 77.6142 100 50 100C22.3858 100 0 122.386 0 150C0 177.614 22.3858 200 50 200Z" fill="rgb(114, 114, 126)"></path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100ZM150 200C177.614 200 200 177.614 200 150C200 122.386 177.614 100 150 100C122.386 100 100 122.386 100 150C100 177.614 122.386 200 150 200Z" fill="rgb(98, 95, 99)"></path>
                        </svg>
                    </Box>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Box sx={footerItem}>
                        <svg viewBox="0 0 200 200" fill="none" >
                            <rect width="100" height="100" fill="rgb(98, 95, 99)"></rect>
                            <rect x="100" y="100" width="100" height="100" fill="rgb(114, 114, 126)"></rect>
                        </svg>
                    </Box>
                    <Box sx={footerItem}>
                        <svg viewBox="0 0 200 200" fill="none" >
                            <path fillRule="evenodd" clipRule="evenodd" d="M200 200V0C89.543 0 0 89.5431 0 200H200Z" fill="rgb(98, 95, 99)"></path>
                        </svg>
                    </Box>
                </Box>
                <Footer
                    title="Footer"
                    description="Something here to give the footer a purpose!"
                />
            </Container>
        </Container>
    );
};

export default NewHome;
