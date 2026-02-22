import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/appService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleSubmit = async () => {
    if (editingId) {
      await updateProduct(editingId, form);
      setEditingId(null);
    } else {
      await createProduct(form);
    }

    setForm({ name: "", price: "", category: "", image: "" });
    loadProducts();
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm(product);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <Box>
      <Typography variant="h5">Administrar Productos</Typography>

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <TextField
          label="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <TextField
          label="Precio"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <TextField
          label="Categoría"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <TextField
          label="Imagen URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <Button variant="contained" onClick={handleSubmit}>
          {editingId ? "Actualizar" : "Crear"}
        </Button>
      </Box>

      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((p) => (
            <TableRow key={p._id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>L {p.price}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(p)}>Editar</Button>
                <Button color="error" onClick={() => handleDelete(p._id)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}