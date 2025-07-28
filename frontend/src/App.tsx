import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./Layout/PublicLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Private from "./pages/Private";
import Trash from "./pages/Trash";
import Profile from "./pages/Profile";
import CreateNote from "./pages/New";

function App() {
  return (
    <BrowserRouter>
      <Routes>

  
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

    
        <Route path="/create" element={<CreateNote />} />

  
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Private />} />         
          <Route path="trash" element={<Trash />} />      
          <Route path="profile" element={<Profile />} />   
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
