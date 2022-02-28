import React from "react";
import { Outlet,Navigate } from "react-router-dom";
import { getCurrentUser } from "../../services/userService";

export default function Index() {
  const auth = getCurrentUser();
  const render = auth?<Outlet /> : <Navigate to="/auth/login" />;
  return (
    <div className=" container pt-5">
      {render}
    </div>
  );
}
