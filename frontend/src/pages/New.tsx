
import { Box, Button, Card, Paper, Stack, TextField, Typography } from '@mui/material'

function New() {
  return (
   
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #fce4ec, #e3f2fd)',
        p: 2,
      }}
    >
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, maxWidth: 550, width: '100%' }}>
        <Card sx={{ p: 4, borderRadius: 3 }}>
          <Stack spacing={3}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              Create New Note
            </Typography>
            <TextField label="Title" variant="outlined" required fullWidth />
            <TextField label="synopsis{supports markdown}" variant="outlined" required fullWidth />
            <TextField label="Content" variant="outlined" required multiline rows={4} fullWidth />

            <Button variant="contained" color="primary" fullWidth size="large">
              Save Note
            </Button>
          </Stack>
        </Card>
      </Paper>
    </Box>
  )
}

export default New

