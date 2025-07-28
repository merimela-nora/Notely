import { Outlet } from "react-router-dom";
import Header1 from "../components/Header1";


function UserLayout() {
  return (
    <div>
      <Header1/>
      <Outlet />
    </div>
  );
}

export default UserLayout;