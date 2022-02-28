import  { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    localStorage.removeItem("token");
    window.location = "/auth/login";
  }, []);

  return null;
}
