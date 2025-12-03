import { Outlet } from "react-router";
import Navbar from "../components/molecules/Navbar";
import Footer from "../components/molecules/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
