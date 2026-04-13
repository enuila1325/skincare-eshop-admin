import { useEffect, useState } from "react";
import { api } from "../api/appService";
import { Box, TextField, Button, MenuItem, Typography, Card, CardContent, CardActions } from "@mui/material";

export default function SubCategories() {
  const [subs, setSubs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const load = () => {
    api.getSubCategories().then(setSubs);
    api.getCategories().then(setCategories);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!name.trim() || !category) return;
    await api.createSubCategory({ name, category });
    setName("");
    setCategory("");
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta subcategoría?")) return;
    await api.deleteSubCategory(id);
    load();
  };

  const startEdit = (s) => {
    setEditingId(s._id);
    setEditName(s.name);
    setEditCategory(s.category?._id || "");
  };

  const handleUpdate = async (id) => {
    await api.updateSubCategory(id, { name: editName, category: editCategory });
    setEditingId(null);
    load();
  };

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 3 }}>Subcategorías</Typography>

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
          select
          size="small"
          label="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">Seleccionar categoría</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={handleCreate}>Crear</Button>
      </Box>

      {/* Subcategory grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 2 }}>
        {subs.map((s) => (
          <Card key={s._id} sx={{ borderRadius: 2, border: "1px solid #eee", boxShadow: "none" }}>
            <CardContent sx={{ pb: 0 }}>
              {editingId === s._id ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Nombre"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Categoría"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  >
                    {categories.map((c) => (
                      <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                    ))}
                  </TextField>
                </Box>
              ) : (
                <>
                  <Typography fontWeight={600}>{s.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {s.category?.name}
                  </Typography>
                </>
              )}
            </CardContent>

            <CardActions sx={{ justifyContent: "flex-end" }}>
              {editingId === s._id ? (
                <>
                  <Button size="small" color="success" variant="contained" onClick={() => handleUpdate(s._id)}>
                    Guardar
                  </Button>
                  <Button size="small" onClick={() => setEditingId(null)}>
                    Cancelar
                  </Button>
                </>
              ) : (
                <>
                  <Button size="small" variant="outlined" onClick={() => startEdit(s)}>
                    Editar
                  </Button>
                  <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(s._id)}>
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