import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Api/Axios";
import ReactMarkdown from "react-markdown";
import cookie from "js-cookie";

interface NotePayload {
  title: string;
  synopsis: string;
  content: string;
  userId: any;
}
const UserId = cookie.get('id');
alert(UserId);

const Create: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<NotePayload>({
    title: "",
    synopsis: "",
    content: "",
    userId: UserId
  });

  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.synopsis || !form.content) {
      setMessage("All fields are required.");
      setError(true);
      return;
    }

    try {
      await axiosInstance.post("/note/createNotes", form);
      setMessage("Note created successfully!");
      setError(false);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error("Create failed:", err);
      setMessage("Failed to create note.");
      setError(true);
    }
  };

  return (
    <Container sx={{ mt: 1}}>
      <Typography variant="h4" gutterBottom>
        Create New Note
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Synopsis"
          name="synopsis"
          value={form.synopsis}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Content (supports markdown)"
          name="content"
          value={form.content}
          onChange={handleChange}
          fullWidth
          required
          multiline
          rows={8}
          margin="normal"
        />
         

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
        >
          Create Note
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        Live Preview
      </Typography>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 1,
          padding: 2,
          backgroundColor: "#f9f9f9",
          minHeight: "150px",
        }}
      >
        <ReactMarkdown>{form.content}</ReactMarkdown>
      </Box>

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
    </Container>
  );
};

export default Create;
