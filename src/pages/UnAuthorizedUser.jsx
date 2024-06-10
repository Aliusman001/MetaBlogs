import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function UnAuthorizedUser() {
  const user = useSelector((store) => store.account.user);
  const navigate = useNavigate();

  useEffect(() => {
    const localuser = JSON.parse(localStorage.getItem("user"));
    if (user?.username || localuser?.username) {
      navigate("/");
    }
  }, []);
  return <Outlet />;
}

export default UnAuthorizedUser;
