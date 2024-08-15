import React from "react";
import { adminMenu, userMenu } from "./../Data/data";
import Bell from "./bell.png"

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  // logout funtion
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };


  const teacherMenu = [
    {
      name: "Home",
      path: "/",
      icon: "🏠︎",
    },
    {
      name: "Appointments",
      path: "/teacher-appointments",
      icon: " ☰ ",
    },

    {
      name: "Profile",
      path: `/teacher/profile/${user?._id}`,
      icon: "📄",
    },
  ];
  
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? teacherMenu
    : userMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h4>Learn Bridge</h4>
             <p>Where Students and Teachers Connect and Grow !!</p>
        </div>
        <hr />
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`} key={menu.id}>
                      <p>{menu.icon}</p>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                 <p>↪</p>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge count={user && user.notifcation.length} 
                onClick={() => {
                    navigate("/notification");
                  }}>
                <img className="bell"src={Bell}/>
                </Badge>

                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;


















