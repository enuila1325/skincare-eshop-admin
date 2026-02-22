import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";

const drawerWidth = 240;

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <Sidebar drawerWidth={drawerWidth} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: `${drawerWidth}px`,
            p: 4,
            backgroundColor: "#f5f7fa",
            minHeight: "100vh",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}