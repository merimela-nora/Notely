import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Avatar,
  Stack,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: teal[600],
    },
    background: {
      default: "#e0f2f1",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

const testimonials = [
  {
    name: "Alice W.",
    role: "Freelance Writer",
    text: "Notely has changed how I capture ideas. The simplicity and speed keep me focused.",
  },
  {
    name: "James K.",
    role: "Student",
    text: "I use Notely every day for class notes and personal journaling. Love the interface!",
  },
  {
    name: "Fatima M.",
    role: "Entrepreneur",
    text: "Finally, a note app that feels like it was made for actual thinking. I'm in love with it!",
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background: "linear-gradient(to bottom right, #e0f2f1, #fce4ec)",
          py: 8,
          px: 2,
          minHeight: "100vh",
        }}
      >
        <Container>
          <Paper
            elevation={4}
            sx={{
              borderRadius: 4,
              p: { xs: 4, md: 6 },
              backgroundColor: "background.paper",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                gap: 5,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h3"
                  fontWeight={700}
                  gutterBottom
                  sx={{ color: "primary.main" }}
                >
                  Welcome to Notely
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ maxWidth: 500 }}
                >
                  Jot your thoughts, organize your mind, and never lose a bright
                  idea again. Built for clarity, speed, and peace of mind.
                </Typography>

                <Box mt={5} display="flex" flexWrap="wrap" gap={2}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ px: 4, py: 1.5, borderRadius: 2, fontWeight: 600 }}
                    onClick={() => navigate("/register")}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      borderColor: teal[600],
                      color: teal[600],
                      "&:hover": {
                        backgroundColor: teal[50],
                      },
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </Button>
                </Box>
              </Box>

              <Box sx={{ flex: 1, maxWidth: 500 }}>
                <Box
                  component="img"
                  src="https://source.unsplash.com/featured/?notebook,desk"
                  alt="Notely Illustration"
                  sx={{
                    width: "100%",
                    borderRadius: 4,
                    boxShadow: 6,
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </Container>

    
        <Container sx={{ mt: 10 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            color="primary"
          >
            What Our Users Say
          </Typography>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            mt={4}
            justifyContent="center"
            alignItems="stretch"
          >
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                elevation={4}
                sx={{
                  flex: 1,
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "#ffffff",
                  borderTop: `4px solid ${teal[600]}`,
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: teal[500] }}>
                      {testimonial.name[0]}
                    </Avatar>
                    <Box>
                      <Typography fontWeight="bold">{testimonial.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography variant="body1" color="text.primary">
                    “{testimonial.text}”
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Landing;
