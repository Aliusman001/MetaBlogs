import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Loader from "../usefullComponents/Loader";

function AppLayout() {
  const { state } = useNavigation();
  if (state === "loading") {
    return <Loader />;
  }
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
