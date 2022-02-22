import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Index from "./components/contacts/Index";
import Create from "./components/contacts/Create";
import Edit from "./components/contacts/Edit";
import List from "./components/contacts/List";
import Authentication from "./components/auth/Authentication";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import PageNotFound from "./components/common/errors/PageNotFound";
import Nav from "./components/common/layouts/Nav";
import Logout from "./components/auth/Logout";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setCurrentUser(user);
    } catch (ex) {}
  }, []);

  return (
      <div className="App">
        <Nav currentUser={currentUser}/>
        <Routes>
          <Route path="contacts" element={<Index />}>
            <Route path="create" element={<Create />} />
            <Route path="edit/:id" element={<Edit />} />
            <Route index element={<List />} />
          </Route>
          <Route
            path="/auth"
            element={<Authentication />}
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />
            <Route index element={<Login />} />
          </Route>
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Index />}/>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
  );
}
export default App;
