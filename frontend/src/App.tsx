import { BrowserRouter, Routes, Route } from "react-router-dom";


import PublicLayout from "./Layout/PublicLayout";
import Dashboard from "./pages/Dashboard";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Notes from "./pages/Notes";
import Trash from "./pages/Trash";
import Edit from "./pages/Edit";
import Private from "./pages/Private";
import Profile from "./pages/Profile";
import CreateNote from "./pages/New";
import ViewNote from "./pages/ViewNote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
    
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Notes />} />
          <Route path="trash" element={<Trash />} />
          <Route path="create" element={<CreateNote />} />
          <Route path="private" element={<Private />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="view" element={<ViewNote />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
