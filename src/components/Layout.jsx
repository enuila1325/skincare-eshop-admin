import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f9fafb" }}>
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4,
                    ml: "240px",
                }}
            >
                {children}
            </Box>
        </Box>
    );
}