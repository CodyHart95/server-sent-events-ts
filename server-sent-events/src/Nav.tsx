import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router";

export interface NavPage {
    name: string;
    location: string;
}

const pages: NavPage[] = [
    {
        name: "Message Stream",
        location: "/"
    },
    {
        name: "Instant Message",
        location: "/message"
    }
]

const Nav = () => {
    const navigate = useNavigate();
    const onNavClick = (page: NavPage) => {
        navigate(page.location);
    };

    return (
        <Box sx={{display: "flex", backgroundColor: "#218aff"}}>
            {
                pages.map((page) => (
                    <Button sx={{color: "white", width: "200px"}} onClick={() => onNavClick(page)}>{page.name}</Button>
                ))
            }
        </Box>
    )
}

export default Nav;