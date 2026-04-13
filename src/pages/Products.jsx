import { useEffect, useState } from "react";
import { api } from "../api/appService";
import ProductForm from "./ProductForm";
import { Typography, Card, CardContent, Box, Button } from "@mui/material";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

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

      {products.map((p) => (
        <Card key={p._id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography>{p.name}</Typography>
            <Typography variant="body2">
              L. {p.price}
            </Typography>
            <Typography variant="body2">
              {p.subcategory?.name} - {p.subcategory?.category?.name}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Button onClick={() => handleEdit(p)}>
                Editar
              </Button>
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