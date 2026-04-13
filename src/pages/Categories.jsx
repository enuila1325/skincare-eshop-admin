import { useEffect, useState } from "react";
import { api } from "../api/appService";
import { Typography, TextField, Button, Box, Card, CardMedia, CardContent, CardActions } from "@mui/material";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");

  const load = () => api.getCategories().then(setCategories);

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;
    await api.createCategory({ name, image });
    setName("");
    setImage("");
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta categoría?")) return;
    await api.deleteCategory(id);
    load();
  };

  const startEdit = (c) => {
    setEditingId(c._id);
    setEditName(c.name);
    setEditImage(c.image || "");
  };

  const handleUpdate = async (id) => {
    await api.updateCategory(id, { name: editName, image: editImage });
    setEditingId(null);
    load();
  };

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 3 }}>Categorías</Typography>

      {/* Create form */}
      <Box sx={{
        display: "flex",
        gap: 2,
        mb: 4,
        p: 2,
        border: "1px solid #eee",
        borderRadius: 2,
        alignItems: "center",
        flexWrap: "wrap",
      }}>
        <TextField
          size="small"
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          size="small"
          label="URL de imagen"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          sx={{ flex: 1, minWidth: 200 }}
        />
        {image && (
          <img src={image} alt="preview" style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }} />
        )}
        <Button variant="contained" onClick={handleCreate}>Crear</Button>
      </Box>

      {/* Category grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 2 }}>
        {categories.map((c) => (
          <Card key={c._id} sx={{ borderRadius: 2, border: "1px solid #eee", boxShadow: "none" }}>

            {/* Image */}
            {editingId === c._id ? (
              <Box sx={{ p: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="URL imagen"
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                />
                {editImage && (
                  <img src={editImage} alt="preview" style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 6, marginTop: 8 }} />
                )}
              </Box>
            ) : (
              c.image && (
                <CardMedia
                  component="img"
                  height="120"
                  image={c.image}
                  alt={c.name}
                  sx={{ objectFit: "cover" }}
                />
              )
            )}

            <CardContent sx={{ pb: 0 }}>
              {editingId === c._id ? (
                <TextField
                  fullWidth
                  size="small"
                  label="Nombre"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              ) : (
                <Typography fontWeight={600}>{c.name}</Typography>
              )}
            </CardContent>

            <CardActions sx={{ justifyContent: "flex-end" }}>
              {editingId === c._id ? (
                <>
                  <Button size="small" color="success" variant="contained" onClick={() => handleUpdate(c._id)}>
                    Guardar
                  </Button>
                  <Button size="small" onClick={() => setEditingId(null)}>
                    Cancelar
                  </Button>
                </>
              ) : (
                <>
                  <Button size="small" variant="outlined" onClick={() => startEdit(c)}>
                    Editar
                  </Button>
                  <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(c._id)}>
                    Eliminar
                  </Button>
                </>
              )}
            </CardActions>
          </Card>
        ))}
      </Box>
    </div>
  );
}