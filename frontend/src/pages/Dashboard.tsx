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
  Avatar,
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
} from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const drawerWidthOpen = 220;
const drawerWidthClosed = 70;

const Dashboard = () => {
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
    <Box sx={{ display: "flex", backgroundColor: "#f1fafa", minHeight: "100vh" }}>
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
        <Toolbar>
          <Typography variant="h6" noWrap>
            Welcome back, {user.name} 👋
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerOpen ? drawerWidthOpen : drawerWidthClosed,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          transition: "width 0.3s",
          "& .MuiDrawer-paper": {
            width: drawerOpen ? drawerWidthOpen : drawerWidthClosed,
            overflowX: "hidden",
            boxSizing: "border-box",
            transition: "width 0.3s",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
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
          transition: "margin 0.3s",
        }}
      >
        <Outlet />
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
          onClick={() => console.log("AI Assistant")}
        />
      </SpeedDial>
    </Box>
  );
};

export default Dashboard;
