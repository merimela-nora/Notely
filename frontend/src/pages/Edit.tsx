
import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Snackbar, Alert } from '@mui/material';
import axiosInstance from '../Api/Axios';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState({ title: '', synopsis: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await axiosInstance.get(`/note/notesID/${id}`);
        setNote(res.data.note);
      } catch (error) {
        console.error("Failed to fetch entry:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  const handleChange = (e:any) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await axiosInstance.patch(`/note/update/${id}`, note);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500); 
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mt: 1 }}>
      <Typography variant="h4" gutterBottom>Edit Note</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={note.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Synopsis"
          name="synopsis"
          value={note.synopsis}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Content (Markdown Supported)"
          name="content"
          value={note.content}
          onChange={handleChange}
          multiline
          rows={8}
          margin="normal"
          required
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Save Changes
        </Button>
      </form>

      <Snackbar open={success} autoHideDuration={3000}>
        <Alert severity="success">Entry updated successfully!</Alert>
      </Snackbar>
    </Container>
  );
};

export default Edit;

