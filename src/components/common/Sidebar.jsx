import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/Top.png";
import {
  LayoutGrid,
  Users,
  BookOpen,
  Bell,
  FileText,
  Calendar,
  BarChart3,
  ChevronRight,
} from "lucide-react";

function Sidebar({ collapsed, onToggleCollapse }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: "Dashboard", icon: "grid", path: "/home" },
    { name: "Users", icon: "users", path: "/users" },
    { name: "Bookings", icon: "book", path: "/bookings" },
    { name: "Notifications", icon: "bell", path: "/notifications" },
    {
      name: "Roles & Permissions",
      icon: "document",
      path: "/roles-permissions",
    },
    { name: "Subscriptions", icon: "calendar", path: "/subscriptions" },
    { name: "Reports", icon: "chart", path: "/reports" },
  ];

  const getIcon = (iconName) => {
    const icons = {
      grid: <LayoutGrid className="w-5 h-5" />,
      users: <Users className="w-5 h-5" />,
      book: <BookOpen className="w-5 h-5" />,
      bell: <Bell className="w-5 h-5" />,
      document: <FileText className="w-5 h-5" />,
      calendar: <Calendar className="w-5 h-5" />,
      chart: <BarChart3 className="w-5 h-5" />,
    };
    return icons[iconName] || null;
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-20" : "w-72"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Logo and Collapsible Button */}
        <div className="px-3 pt-6 pb-4 flex items-center justify-between">
          <div className="w-full">
            <img
              src={logo}
              alt="Flybuddy"
              className="w-full h-10 object-cover"
            />
          </div>

          {/* Collapsible Button - Sticking out from sidebar */}
          <div className="flex items-start z-10 -mr-6">
            <button
              onClick={onToggleCollapse}
              className="w-8 h-8 rounded-full hover:bg-gray-100 transition-colors bg-white border border-gray-200 shadow-sm flex items-center justify-center flex-shrink-0 cursor-pointer"
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4 text-gray-700" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-700 rotate-180" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={index}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? "bg-gray-100 text-gray-800"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                    title={collapsed ? item.name : ""}
                  >
                    <span className="flex-shrink-0">{getIcon(item.icon)}</span>
                    {!collapsed && (
                      <span className="ml-4 text-[15px] font-medium">
                        {item.name}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div
          className="px-4 py-4 border-t border-gray-200 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <div className="flex items-center">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-base flex-shrink-0"
              style={{ backgroundColor: "#B8C8E0" }}
            >
              R
            </div>
            {!collapsed && (
              <>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="text-xs text-gray-500 flex items-center">
                    Welcome 👋
                  </div>
                  <div className="text-[15px] font-semibold text-gray-900 truncate">
                    Ria
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
