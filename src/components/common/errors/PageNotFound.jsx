import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return <div>
      <h1>Oops!! The page you are search does not exist. Page not found.</h1>
      <Link className="nav-link" to="/contacts" >Homepage</ Link>
  </div>;
}
