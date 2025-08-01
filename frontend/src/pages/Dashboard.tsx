import {
  Box,
  Typography,
  Drawer,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  AppBar,
  Toolbar,
  CssBaseline,
  IconButton,
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

import {
  Delete,
  Notes,
  Lock,
  ChevronLeft,
  ChevronRight,
  NoteAdd,
  Logout,
  Lightbulb,
  Person,
} from "@mui/icons-material";

import { teal } from "@mui/material/colors";
import { useState,useEffect} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import cookie from "js-cookie";

const drawerWidthOpen = 220;
const drawerWidthClosed = 70;
const value1= cookie.get('name');
const Dashboard = () => {
  const [user] = useState<{ name: string }>({ name: "" });
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [aiOpen, setAiOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    function security() {
      const sec = cookie.get("name");
      if (!sec) {
        navigate("/login");
      }
    }
    
    security();

    return () => {}; 
  }, [navigate]);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    { text: "My Notes", icon: <Notes />, path: "/dashboard" },
    { text: "Create Note", icon: <NoteAdd />, path: "/dashboard/create" },
    { text: "Private", icon: <Lock />, path: "/dashboard/private" },
    { text: "Trash", icon: <Delete />, path: "/dashboard/trash" },
    { text: "Profile", icon: <Person />, path: "/dashboard/profile" },
    { text: "Logout", icon: <Logout />, action: handleLogout },
  ];

  const actions = [
    { icon: <NoteAdd />, name: "Create Note", onClick: () => navigate("/dashboard/create") },
    { icon: <Delete />, name: "Trash", onClick: () => navigate("/dashboard/trash") },
    { icon: <Lightbulb />, name: "AI Assistant", onClick: () => setAiOpen(true) },
    { icon: <Logout />, name: "Logout", onClick: handleLogout },
  ];

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f1fafa", minHeight: "100vh" }}>
      <CssBaseline />

  
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: teal[600],
          width: `calc(100% - ${drawerOpen ? drawerWidthOpen : drawerWidthClosed}px)`,
          ml: `${drawerOpen ? drawerWidthOpen : drawerWidthClosed}px`,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            Notely
          </Typography>
          <Typography variant="body1" sx={{ color: "#fff" }}>
            Welcome back, {value1} 👋
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
          "& .MuiDrawer-paper": {
            width: drawerOpen ? drawerWidthOpen : drawerWidthClosed,
            overflowX: "hidden",
            transition: "width 0.3s",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
      
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: 1,
            bgcolor: teal[100],
            minHeight: 64,
          }}
        >
          {drawerOpen && (
            <Typography variant="h6" sx={{ color: teal[700] }}>
              Menu
            </Typography>
          )}
          <IconButton onClick={toggleDrawer} size="small">
            {drawerOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Toolbar>

        
        <List sx={{ flexGrow: 1 }}>
          {menuItems.map((item) => (
            <Tooltip
              title={item.text}
              placement="right"
              key={item.text}
              disableHoverListener={drawerOpen}
            >
              <ListItemButton
                onClick={() =>
                  item.action ? item.action() : navigate(item.path)
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {drawerOpen && <ListItemText primary={item.text} />}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>

       
        <Box sx={{ p: 2, borderTop: "1px solid #ccc" }}>
          <Box display="flex" alignItems="center" gap={2}>
           <Avatar sx={{ width: 40, height: 40 }}>
            {value1 ? value1[0].toUpperCase() : ''} </Avatar>
            {drawerOpen && (
              <Box>
                <Typography fontWeight="bold">{user.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {value1 || ''}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>

      
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet />
      </Box>

    
      <SpeedDial
        ariaLabel="Dashboard Actions"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>

  
      <Dialog open={aiOpen} onClose={() => setAiOpen(false)}>
        <DialogTitle>AI Assistant</DialogTitle>
        <DialogContent>
          <Typography>This feature is coming soon: AI summarization, chat, and suggestions.</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
