import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import UnAuthorizedPage from "./UnAuthorizedPage";

function AuthorizedPage() {
  const user = useSelector((store) => store.account.user);

  if (!user?.username) {
    return <UnAuthorizedPage />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthorizedPage;
