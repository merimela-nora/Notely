import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../Api/Axios";
import { Box, Typography, CircularProgress, Alert, Paper } from "@mui/material";
import ReactMarkdown from "react-markdown";

const ViewNote = () => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<any>(null);
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

// import { useParams, useNavigate, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axiosInstance from "../Api/Axios";
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   Snackbar,
//   Alert,
//   Avatar,
// } from "@mui/material";

// const ViewNote = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [entry, setEntry] = useState({
//     title: "",
//     synopsis: "",
//     content: "",
//     author: {
//       firstName: "John",
//       lastName: "Doe",
//     },
//   });

//   const [loading, setLoading] = useState(true);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const fetchEntry = async () => {
//       try {
//         const res = await axiosInstance.get(`/note/notes/${id}`);
//         alert(res.data);
//         setEntry(res.data);
//       } catch (err) {
//         console.error("Error loading note:", err);

//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEntry();
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEntry({ ...entry, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axiosInstance.patch(`/note/notes/${id}`, {
//         title: entry.title,
//         synopsis: entry.synopsis,
//         content: entry.content,
//       });
//       setSuccess(true);
//       setTimeout(() => navigate("/dashboard/private"), 2000);
//     } catch (err) {
//       console.error("Update failed:", err);
//     }
//   };

//   if (loading) return <Typography sx={{ p: 4 }}>Loading...</Typography>;

//   const initials = `${entry.author.firstName[0]}${entry.author.lastName[0]}`;

//   return (
//     <Container maxWidth="md" sx={{ mt: 6 }}>
//       <Typography variant="h4" fontWeight="bold" gutterBottom>
//         View Notes
//       </Typography>

//       <Stack direction="row" alignItems="center" spacing={1} mb={3}>
//         <Avatar sx={{ bgcolor: "teal" }}>{initials}</Avatar>
//         <Typography variant="subtitle2">
//           {entry.author.firstName} {entry.author.lastName}
//         </Typography>
//       </Stack>

//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="Title"
//           name="title"
//           value={entry.title}
//           onChange={handleChange}
//           margin="normal"
//           required
//         />
//         <TextField
//           fullWidth
//           label="Synopsis"
//           name="synopsis"
//           value={entry.synopsis}
//           onChange={handleChange}
//           margin="normal"
//           required
//         />
//         <TextField
//           fullWidth
//           label="Content"
//           name="content"
//           value={entry.content}
//           onChange={handleChange}
//           margin="normal"
//           multiline
//           rows={8}
//           required
//         />

//         <Stack direction="row" spacing={2} mt={3}>
//           <Button variant="contained" color="primary" type="submit">
//             Save Changes
//           </Button>
//           <Button
//             component={Link}
//             to="/dashboard/private"
//             variant="outlined"
//             color="secondary"
//           >
//             Cancel
//           </Button>
//         </Stack>
//       </form>

//       <Snackbar open={success} autoHideDuration={3000}>
//         <Alert severity="success">Note updated successfully!</Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default ViewNote;
