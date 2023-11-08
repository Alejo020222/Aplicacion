import { Outlet } from "react-router-dom";
import HeaderAppBar from "../components/HeaderAppBar";

const Layout = () => {
  return (
    <>
      <HeaderAppBar />
      <Outlet />
    </>
  );
};

export default Layout;
