import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Snackbar,
  Alert,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axiosInstance from "../Api/Axios";

interface Note {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const Trash: React.FC = () => {
  const [trashNotes, setTrashNotes] = useState<Note[]>([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

  const fetchTrash = async () => {
    try {
      const res = await axiosInstance.get("/note/trash");
      if (Array.isArray(res.data)) {
        setTrashNotes(res.data);
      } else {
        setTrashNotes([]);
      }
    } catch (err) {
      console.error("Error fetching trashed notes:", err);
      setError(true);
      setMessage("Failed to load trash.");
    }
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  const handleRestore = async (id: string) => {
    try {
      await axiosInstance.delete(`/note/restore/${id}`);
      setTrashNotes((prev) => prev.filter((note) => note.id !== id));
      setMessage("Note restored successfully.");
      setError(false);
    } catch (err) {
      console.error("Restore failed:", err);
      setMessage("Failed to restore note.");
      setError(true);
    }
  };

  const handleAskDelete = (note: Note) => {
    setNoteToDelete(note);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!noteToDelete) return;
    try {
      await axiosInstance.delete(`/note/permanent/${noteToDelete.id}`);
      setTrashNotes((prev) => prev.filter((note) => note.id !== noteToDelete.id));
      setMessage("Note permanently deleted.");
      setError(false);
    } catch (err) {
      console.error("Delete failed:", err);
      setMessage("Failed to delete note.");
      setError(true);
    } finally {
      setConfirmOpen(false);
      setNoteToDelete(null);
    }
  };

  return (
    <Container  sx={{ mt: 1 }}>
    
    <Alert severity="info" sx={{ mb: 2 }}>
  Items in trash will be permanently deleted after 30 days.
</Alert>

      {trashNotes.length === 0 ? (
        <Typography>No items in trash.</Typography>
      ) : (
        <Grid container spacing={2}>
          {trashNotes.map((note) => (
            <Grid>
              <Card>
                <CardContent>
                  <Typography variant="h6">{note.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {note.synopsis}
                  </Typography>
                  
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleRestore(note.id)}
                  >
                    Restore
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleAskDelete(note)}
                  >
                    Delete Permanently
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={() => setMessage("")}
      >
        <Alert
          onClose={() => setMessage("")}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete this note? This action cannot be undone.
          </DialogContentText>
          <Typography fontWeight="bold" mt={1}>
            {noteToDelete?.title}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Trash;
