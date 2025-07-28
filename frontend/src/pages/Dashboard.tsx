import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  CssBaseline,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  Divider,
  Tooltip,
  ThemeProvider,
  createTheme,
  Card,
  CardContent,
} from "@mui/material";
import {
  Add,
  Delete,
  Notes,
  Lightbulb,
  NoteAdd,
  ChevronLeft,
  ChevronRight,
  Person,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import { useState, useMemo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const drawerWidthOpen = 220;
const drawerWidthClosed = 70;

const fakePinnedNotes = [
  { id: 1, title: "Math Revision", body: "Remember to finish calculus exercises." },
  { id: 2, title: "UI Ideas", body: "Dashboard layout: consider sidebar improvements." },
];

const DashboardContent = ({ toggleTheme, darkMode }: any) => {
  const [user] = useState({ name: "Claire" });
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const menuItems = [
    { text: "Private", icon: <Notes />, path: "/dashboard" },
    { text: "Trash", icon: <Delete />, path: "/dashboard/trash" },
  ];

  return (
    <Box sx={{ display: "flex", bgcolor: darkMode ? "#121212" : "#f1fafa", minHeight: "100vh" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: teal[600],
          transition: "width 0.3s",
          width: `calc(100% - ${drawerOpen ? drawerWidthOpen : drawerWidthClosed}px)`,
          ml: `${drawerOpen ? drawerWidthOpen : drawerWidthClosed}px`,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Welcome back, {user.name} 👋</Typography>
          <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <IconButton onClick={toggleTheme} sx={{ color: "#fff" }}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      
      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? drawerWidthOpen : drawerWidthClosed,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          "& .MuiDrawer-paper": {
            width: drawerOpen ? drawerWidthOpen : drawerWidthClosed,
            overflowX: "hidden",
            transition: "width 0.3s",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            bgcolor: darkMode ? "#1e1e1e" : "#fff",
          },
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: 2,
            bgcolor: teal[100],
            minHeight: 64,
          }}
        >
          {drawerOpen && (
            <Typography variant="h6" sx={{ color: teal[700] }}>
              Notely
            </Typography>
          )}
          <IconButton onClick={toggleDrawer} size="small">
            {drawerOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Toolbar>

        <Box>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{ px: 2 }}
              >
                <Tooltip title={!drawerOpen ? item.text : ""} placement="right">
                  <ListItemIcon sx={{ color: teal[500], minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>
                {drawerOpen && <ListItemText primary={item.text} />}
              </ListItem>
            ))}
          </List>
        </Box>

      
        <Box sx={{ p: 2 }}>
          <Divider />
          <ListItem
            button
            onClick={() => navigate("/dashboard/profile")}
            selected={location.pathname === "/dashboard/profile"}
            sx={{ mt: 1 }}
          >
            <Tooltip title={!drawerOpen ? "Profile" : ""} placement="right">
              <ListItemIcon sx={{ color: teal[400] }}>
                <Person />
              </ListItemIcon>
            </Tooltip>
            {drawerOpen && (
              <ListItemText
                primary={
                  <Box>
                    <Typography fontWeight="bold">{user.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      My Profile
                    </Typography>
                  </Box>
                }
              />
            )}
          </ListItem>
        </Box>
      </Drawer>

     
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
        }}
      >
       
        <Box>
          <Typography variant="h6" mb={2} fontWeight="bold">
            📌 Pinned Notes
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            {fakePinnedNotes.map((note) => (
              <Card key={note.id} sx={{ width: 280, bgcolor: darkMode ? "#2c2c2c" : "#ffffff" }}>
                <CardContent>
                  <Typography fontWeight="bold">{note.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {note.body}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        <Box mt={4}>
          <Outlet />
        </Box>
      </Box>

      <SpeedDial
  ariaLabel="Dashboard Actions"
  sx={{ position: "fixed", bottom: 16, right: 16 }}
  icon={<Add />}
>
  <SpeedDialAction
    icon={<NoteAdd />}
    tooltipTitle="New Note"
    onClick={() => navigate("/create")}
  />
  <SpeedDialAction
    icon={<Lightbulb />}
    tooltipTitle="AI Assistant"
  />
</SpeedDial>


    </Box>
  );
};


const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <DashboardContent darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} />
    </ThemeProvider>
  );
};

export default Dashboard;

