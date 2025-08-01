import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../Api/Axios";
import { Box, Typography, CircularProgress, Alert, Paper } from "@mui/material";
import ReactMarkdown from "react-markdown";

const ViewNote = () => {
  const { id } = useParams<{ id: string }>();
  const [ setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [Title, setTitle] = useState<any>(null);
  const [Synopsis, setSynopsis] = useState<any>(null);
  const [Content, setContent] = useState<any>(null);

  const location = useLocation();
  const NoteId = location.state;
  const NoteId2 = JSON.parse(JSON.stringify(NoteId));
  
  useEffect(() => {
    const fetchNote = async () => {

      
      try {
        const res = await axiosInstance.get(`note/notesID/${NoteId2}`);
        const Title =JSON.parse(JSON.stringify(res.data.note.title));
        const Synopsis = JSON.parse(JSON.stringify(res.data.note.synopsis));
        const Content = JSON.parse(JSON.stringify(res.data.note.content));
        setTitle(Title);
        setSynopsis(Synopsis);
        setContent(Content);
        
        setNote(Title);
      } catch (err) {
        setError("Note not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) return <CircularProgress sx={{ mt: 4, mx: "auto", display: "block" }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Title:{Title}
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
       Synopsis: {Synopsis}
      </Typography>

      <Paper elevation={3} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
        <ReactMarkdown>{Content}</ReactMarkdown>
      </Paper>
    </Box>
  );
};

export default ViewNote;

