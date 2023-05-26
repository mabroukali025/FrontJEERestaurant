import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-primary">
      <nav className="container-fluid">
        <ul className="navbar-nav me-auto mb-2">
          <li className="nav-item">
            <NavLink className="nav-link " to="/" activeClassName="active">
              Ville
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/zone" activeClassName="active">
              Zone
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/zoneByVille" activeClassName="active">
              Zone par ville
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/RestaurantForm" activeClassName="active">
              Restaurant
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/SerieForm" activeClassName="active">
              Serie
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/SpecialiteForm" activeClassName="active">
              Specialite
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <p className="text-center p-3">© {new Date().getFullYear()} Mon application</p>
    </footer>
  );
};

export { Header, Footer };