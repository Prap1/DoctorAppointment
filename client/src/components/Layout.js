import React from "react";
import "../style/Layout.css";
import { adminMenu, userMenu } from '../data/Data'

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Doctor Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  // rendering menu list
  const sidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <>
      <div className="main">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="navbar-brand">
            <h6>DOC APP</h6>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="mr-auto header-content" style={{ cursor: "pointer" }}>
              <div className="card">
              <Badge
                count={user && user.notifcation.length}
                onClick={() => {
                  navigate("/notification");
                }}
              >
                <span className="fa-stack fa-1x">
                  <i className="fa-solid fa-bell fa-stack-1x"></i>
                </span>
              </Badge>
              </div>

              <Link to="/profile" className="nav-link">{user?.name}</Link>
            </div>
            <ul className="navbar-nav">
              {sidebarMenu.map((menu, index) => {
                const isActive = location.pathname === menu.path;
                return (
                  <li key={index} className={`nav-item ${isActive ? "active" : ""}`}>
                    <Link to={menu.path} className="nav-link">
                      <i className={`fa ${menu.icon}`}></i>{menu.name}
                    </Link>
                  </li>
                );
              })}
              <li className="nav-item" onClick={handleLogout}>
                <span className="nav-link logout-btn">Logout</span>
              </li>
            </ul>
          </div>
        </nav>
        <div className="content">{children}</div>
      </div>
    </>
  );
};

export default Layout;
