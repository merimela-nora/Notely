import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import NoteCard from "../components/NotesCard";
import axiosInstance from "../Api/Axios";
import { Note} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";



interface Note {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const res = await axiosInstance.get("/note/notes");
      if (Array.isArray(res.data)) {
        const NoteId  = JSON.parse(JSON.stringify(res.data));
        setNotes(res.data);
      } else {
        console.error("Unexpected data:", res.data);
        setNotes([]);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/note/delete/${id}`);
      setNotes((prev) => prev.filter((note) => note.id !== id));
      setMessage("Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/note/notes/${id}/edit`);
  };


  return (
    <Box sx={{ mt: 2, px: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        📝 My Notes
      </Typography>

      {notes.length === 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          No notes found. Create your first one!
        </Alert>
      )}

      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid>
            <NoteCard
              id={note.id}
              title={note.title}
              content={note.content}
              tags={[]} 
              onDelete={() => handleDelete(note.id)}
              onEdit={() => handleEdit(note.id)}
             
        
           />
          <IconButton onClick={function viewNote() 
            { navigate('/dashboard/view', { state: note.id })}}
            ><Note/>
            </IconButton>
           
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={() => setMessage("")}
      >
        <Alert
          onClose={() => setMessage("")}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Notes;
