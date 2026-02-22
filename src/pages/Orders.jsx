import { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
} from "@mui/material";
import { getOrders, updateOrderStatus } from "../api/appService";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  const handleStatusChange = async (id, status) => {
    await updateOrderStatus(id, status);
    loadOrders();
  };

  return (
    <>
      <Typography variant="h5">Pedidos</Typography>

      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((o) => (
            <TableRow key={o._id}>
              <TableCell>{o.customerName}</TableCell>
              <TableCell>L {o.total}</TableCell>
              <TableCell>
                <Select
                  value={o.status}
                  onChange={(e) =>
                    handleStatusChange(o._id, e.target.value)
                  }
                >
                  <MenuItem value="pending_payment">
                    Pendiente Pago
                  </MenuItem>
                  <MenuItem value="pending_review">
                    En revisión
                  </MenuItem>
                  <MenuItem value="confirmed">Confirmado</MenuItem>
                  <MenuItem value="delivered">Entregado</MenuItem>
                  <MenuItem value="cancelled">Cancelado</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}