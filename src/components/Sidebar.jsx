import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ drawerWidth }) {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e0e0e0",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Admin Panel
        </Typography>
      </Box>

      <List>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/products")}>
          <ListItemText primary="Productos" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/orders")}>
          <ListItemText primary="Pedidos" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}