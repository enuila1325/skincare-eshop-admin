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
  Collapse,
  Box,
  Chip,
  Button,
} from "@mui/material";
import { api } from "../api/appService";

function OrderRow({ order, onStatusChange }) {
  const [open, setOpen] = useState(false);

  const statusColors = {
    pending_payment: "warning",
    pending_review: "info",
    confirmed: "success",
    delivered: "success",
    cancelled: "error",
  };

  return (
    <>
      <TableRow>
        {/* Expand toggle */}
        <TableCell>
          <Button size="small" onClick={() => setOpen(!open)}>
            {open ? "▲" : "▼"}
          </Button>
        </TableCell>

        <TableCell>{order.customerName}</TableCell>
        <TableCell>{order.phone}</TableCell>
        <TableCell>{order.address}</TableCell>
        <TableCell>L. {order.total}</TableCell>
        <TableCell>{order.paymentMethod === "transfer" ? "Transferencia" : "Contra entrega"}</TableCell>

        {/* Proof image */}
        <TableCell>
          {order.proofImage ? (
            <img
              src={order.proofImage}
              alt="comprobante"
              style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6, cursor: "pointer" }}
              onClick={() => window.open(order.proofImage, "_blank")}
            />
          ) : (
            <Typography variant="caption" color="text.secondary">—</Typography>
          )}
        </TableCell>

        <TableCell>
          <Select
            size="small"
            value={order.status}
            onChange={(e) => onStatusChange(order._id, e.target.value)}
          >
            <MenuItem value="pending_payment">Pendiente Pago</MenuItem>
            <MenuItem value="pending_review">En revisión</MenuItem>
            <MenuItem value="confirmed">Confirmado</MenuItem>
            <MenuItem value="delivered">Entregado</MenuItem>
            <MenuItem value="cancelled">Cancelado</MenuItem>
          </Select>
        </TableCell>
      </TableRow>

      {/* Expanded product details */}
      <TableRow>
        <TableCell colSpan={8} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Productos del pedido
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {order.items.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      padding: "8px",
                      border: "1px solid #eee",
                      borderRadius: "8px",
                    }}
                  >
                    {/* Variant image */}
                    <img
                      src={item.selectedImage || item.product?.images?.[0] || item.product?.image}
                      alt={item.product?.name}
                      style={{
                        width: 56,
                        height: 56,
                        objectFit: "cover",
                        borderRadius: 6,
                        flexShrink: 0,
                      }}
                    />

                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {item.product?.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        L. {item.price} × {item.quantity} = L. {item.price * item.quantity}
                      </Typography>
                    </Box>

                    <Chip
                      size="small"
                      label={`Variedad ${(item.variantIndex ?? 0) + 1}`}
                      color={statusColors[order.status] || "default"}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await api.getOrders();
    setOrders(data);
  };

  const handleStatusChange = async (id, status) => {
    await api.updateOrderStatus(id, status);
    loadOrders();
  };

  return (
    <>
      <Typography variant="h5">Pedidos</Typography>

      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Cliente</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Pago</TableCell>
            <TableCell>Comprobante</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((o) => (
            <OrderRow
              key={o._id}
              order={o}
              onStatusChange={handleStatusChange}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
}