import { useEffect, useState } from "react";
import { api } from "../api/appService";
import ProductForm from "./ProductForm";
import { Typography, Card, CardContent, Box, Button, TextField } from "@mui/material";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterText, setFilterText] = useState("");

  const load = () => {
    api.getProducts().then(setProducts);
  };

  const handleDelete = async (id) => {
    await api.deleteProduct(id);
    load();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleFinish = () => {
    setEditingProduct(null);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Productos
      </Typography>

      <ProductForm
        onCreated={load}
        editingProduct={editingProduct}
        onFinish={handleFinish}
      />

      <TextField
        label="Buscar producto"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      {filteredProducts.length === 0 && filterText && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          No se encontraron productos con ese nombre.
        </Typography>
      )}

      {filteredProducts.map((p) => (
        <Card key={p._id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography>{p.name}</Typography>
            <Typography variant="body2">L. {p.price}</Typography>
            <Typography variant="body2">
              {p.subcategory?.name} - {p.subcategory?.category?.name}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Button onClick={() => handleEdit(p)}>Editar</Button>
              <Button onClick={() => handleDelete(p._id)} color="error">
                Eliminar
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  );
}