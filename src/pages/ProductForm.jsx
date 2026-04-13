import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../api/appService";

export default function ProductForm({ editingProduct, onFinish }) {
  const isEdit = Boolean(editingProduct);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    images: [""],
    stock: "",
    featured: false,
    subcategory: "",
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    api.getCategories().then(setCategories);
    api.getSubCategories().then(setSubcategories);
  }, []);

  // CARGAR PRODUCTO EN FORM AL EDITAR
  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        price: editingProduct.price || "",
        description: editingProduct.description || "",
        images: editingProduct.images?.length ? editingProduct.images : [editingProduct.image || ""],
        stock: editingProduct.stock || "",
        featured: editingProduct.featured || false,
        subcategory: editingProduct.subcategory?._id || "",
      });

      setSelectedCategory(
        editingProduct.subcategory?.category?._id || ""
      );
    }
  }, [editingProduct]);

  const filteredSubs = subcategories.filter(
    (s) => s.category?._id === selectedCategory
  );

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // 🔥 CREATE / UPDATE
  const handleSubmit = async () => {
    if (isEdit) {
      await api.updateProduct(editingProduct._id, form);
    } else {
      console.log("Producto creado:", form);
      const res = await api.createProduct(form);
      console.log("Respuesta del servidor:", res.json());
    }

    setForm({
      name: "",
      price: "",
      description: "",
      images: [""],
      stock: "",
      featured: false,
      subcategory: "",
    });

    setSelectedCategory("");
    onFinish();
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {isEdit ? "Editar Producto" : "Crear Producto"}
      </Typography>

      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "1fr 1fr" }}>
        <TextField
          label="Nombre"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <TextField
          label="Precio"
          type="number"
          value={form.price}
          onChange={(e) => handleChange("price", e.target.value)}
        />

        <TextField
          label="Stock"
          type="number"
          value={form.stock}
          onChange={(e) => handleChange("stock", e.target.value)}
        />

        {/* IMAGES */}
        <Box sx={{ gridColumn: "1 / -1" }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Imágenes (URLs)</Typography>
          {form.images.map((url, index) => (
            <Box key={index} sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                label={`Imagen ${index + 1}`}
                value={url}
                onChange={(e) => {
                  const updated = [...form.images];
                  updated[index] = e.target.value;
                  setForm({ ...form, images: updated });
                }}
              />
              {form.images.length > 1 && (
                <Button
                  color="error"
                  onClick={() => {
                    const updated = form.images.filter((_, i) => i !== index);
                    setForm({ ...form, images: updated });
                  }}
                >
                  ✕
                </Button>
              )}
            </Box>
          ))}
          <Button
            size="small"
            onClick={() => setForm({ ...form, images: [...form.images, ""] })}
          >
            + Agregar variante
          </Button>
        </Box>

        {/* CATEGORY */}
        <TextField
          select
          label="Categoría"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            handleChange("subcategory", "");
          }}
        >
          {categories.map((c) => (
            <MenuItem key={c._id} value={c._id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>

        {/* SUBCATEGORY */}
        <TextField
          select
          label="Subcategoría"
          value={form.subcategory}
          onChange={(e) => handleChange("subcategory", e.target.value)}
        >
          {filteredSubs.map((s) => (
            <MenuItem key={s._id} value={s._id}>
              {s.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* DESCRIPTION */}
      <TextField
        label="Descripción"
        multiline
        rows={3}
        fullWidth
        sx={{ mt: 2 }}
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      {/* FEATURED */}
      <FormControlLabel
        control={
          <Checkbox
            checked={form.featured}
            onChange={(e) =>
              handleChange("featured", e.target.checked)
            }
          />
        }
        label="Producto destacado"
      />
      <br />
      <Button variant="contained" sx={{ mt: 2, width: "10vw" }} onClick={handleSubmit}>
        {isEdit ? "Actualizar" : "Guardar"}
      </Button>

      {isEdit && (
        <Button
          sx={{ mt: 2, ml: 2 }}
          onClick={() => onFinish()}
        >
          Cancelar edición
        </Button>
      )}
    </Box>
  );
}