import React, { useState } from "react";
import { register } from "../../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [err, setErr] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await register({
        email: form.email,
        password: form.password,
        name: form.name,
      });
      localStorage.setItem("token", response.headers['x-auth-token']);

      window.location ="/contacts";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        await setErr(ex.response.data.err);
        if (ex.response.data.err.message) {
          toast.error(ex.response.data.err.message);
          setErr({
            email: ex.response.data.err.message,
          });
        }
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={registerUser}>
        <h3>Sign Up</h3>
        <div className="form-group pb-3">
          <label>Full name</label>
          <input
            type="text"
            className={`form-control ${err.name ? "is-invalid" : ""}`}
            placeholder="Last name"
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
          <div className="invalid-feedback">{err.name}</div>
        </div>
        <div className="form-group pb-3">
          <label>Email address</label>
          <input
            type="email"
            className={`form-control ${err.email ? "is-invalid" : ""}`}
            placeholder="Enter email"
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
          />
          <div className="invalid-feedback">{err.email}</div>
        </div>
        <div className="form-group pb-5">
          <label>Password</label>
          <input
            type="password"
            className={`form-control ${err.password ? "is-invalid" : ""}`}
            placeholder="Enter password"
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
          />
          <div className="invalid-feedback">{err.password}</div>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="/login">sign in?</a>
        </p>
      </form>
    </>
  );
}
