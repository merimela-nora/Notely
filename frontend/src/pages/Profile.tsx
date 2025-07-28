import {
  Typography,
  Stack,
  Paper,
  Card,
  TextField,
  Avatar,
  Box,
  Button,
} from "@mui/material";

function Profile() {
  return (
    <Stack
      direction="row"
      spacing={4}
      sx={{ mt: 1, px: 3, flexWrap: "wrap", justifyContent: "center" }}
    >
  
      <Paper
        elevation={6}
        sx={{
          flex: 1,
          minWidth: 300,
          maxWidth: 600,
          p: 4,
          borderRadius: 4,
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar
            sx={{
              width: 90,
              height: 90,
              bgcolor: "#1976d2",
              fontSize: 32,
              mb: 1,
            }}
          >
            CN
          </Avatar>

          <Button variant="outlined" component="label" size="small">
            Upload Image
            <input type="file" hidden accept="image/*" />
          </Button>

          <Typography variant="h5" fontWeight="bold" mt={2}>
            Profile Information
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Update your personal details
          </Typography>
        </Box>

        <Card
          sx={{
            p: 3,
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
            boxShadow: "0 3px 6px rgba(0,0,0,0.05)",
          }}
        >
          <TextField label="First Name" fullWidth margin="normal" />
          <TextField label="Last Name" fullWidth margin="normal" />
          <TextField label="Username" fullWidth margin="normal" />
          <TextField label="Email" fullWidth margin="normal" />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Update Info
          </Button>
        </Card>
      </Paper>

  
      <Paper
        elevation={6}
        sx={{
          flex: 1,
          minWidth: 300,
          maxWidth: 600,
          p: 4,
          borderRadius: 4,
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Update Password
        </Typography>
        <Card
          sx={{
            p: 3,
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
            boxShadow: "0 3px 6px rgba(0,0,0,0.05)",
          }}
        >
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            margin="normal"
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Change Password
          </Button>
        </Card>
      </Paper>
    </Stack>
  );
}

export default Profile;

