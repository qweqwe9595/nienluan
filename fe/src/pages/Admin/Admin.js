import { Outlet } from "react-router-dom";
import Sidebar from "../../component/admin/Sidebar";
import "./Admin.scss";

function Admin() {
  return (
    <>
      <Sidebar />
      <div className="md:ml-64">
        <Outlet />
      </div>
    </>
  );
}

export default Admin;
