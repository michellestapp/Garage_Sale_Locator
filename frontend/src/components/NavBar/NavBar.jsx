import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Garage Sale Locator</b>
          </Link>
        </li>
        <li>{user? (
            <button onClick = {() => navigate("/mySalesPage")}>My Sales</button>)
          : ( " ")}
        </li>
        <li>{user? (
            <button onClick = {() => navigate("/garage_sales")}>Post New Sale</button>)
          : ( " ")}
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
