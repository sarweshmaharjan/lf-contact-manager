import React from "react";
import { Outlet } from "react-router-dom";

export default function Authentication() {
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <Outlet />
      </div>
    </div>
  );
}
