import http from "./httpService";
import jwtDecode from 'jwt-decode';

const apiEndpoint = "http://localhost:3000/api/auth";

export function register(user) {
  return http.post(apiEndpoint + "/signup", {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}

export function login(user) {
  return http.post(apiEndpoint + "/signin", {
    email: user.email,
    password: user.password,
  });
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem('token');
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}