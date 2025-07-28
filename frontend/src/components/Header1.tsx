import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header1 = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={0}
      color="transparent"
      sx={{
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(12px)",
        py: 1,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              cursor: "pointer",
              letterSpacing: 1,
            }}
            onClick={() => navigate("/")}
          >
            Notely
          </Typography>

          
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                fontWeight: 500,
                color: "text.primary",
                "&:hover": { color: "primary.main" },
              }}
              onClick={() => navigate("/")}
            >
              Home
            </Button>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="primary"
              onClick={() => navigate("/login")}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Log In
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/register")}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header1;
