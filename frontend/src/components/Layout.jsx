import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaSearch, FaUserTie, FaBook } from "react-icons/fa";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const getPageTitle = () => {
      switch (location.pathname) {
        case "/similarity-search":
          return "Similarity Search - LegalGPT";
        case "/legal-assist":
          return "Legal Assist - LegalGPT";
        case "/legal-citations":
          return "Legal Citations - LegalGPT";
        default:
          return "LegalGPT";
      }
    };

    document.title = getPageTitle();
  }, [location]);

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/similarity-search":
        return (
          <div className="inline-flex">
            <FaSearch className={navIconStyle} />
            <span className="pr-9">Similarity Search</span>
          </div>
        );
      case "/legal-assist":
        return (
          <div className="inline-flex">
            <FaUserTie className={navIconStyle} />
            <span className="pr-9">Legal Assist</span>
          </div>
        );
      case "/legal-citations":
        return (
          <div className="inline-flex">
            <FaBook className={navIconStyle} />
            <span className="pr-9">Legal Citations</span>
          </div>
        );
      default:
        return <span className="pr-9">LegalGPT</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-grow flex flex-col">
        <nav className="bg-black p-4 h-[8vh] flex justify-between items-center shadow-md shadow-slate-500">
          <button
            className="text-white text-[1.2em] pb-2 pt-1 w-[2em] h-[2em] transition-all hover:bg-gray-800 rounded-md active:bg-white active:text-black"
            onClick={toggleSidebar}
          >
            &#9776; {/* Hamburger icon */}
          </button>
          <div className="text-white text-center ml-[2em] text-[1.6rem] font-bold">
            {getPageTitle()}
          </div>
          <div>
            <img src="/logo.png" alt="LegalGPT Logo" className="h-8 mr-2" />
          </div>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

const navIconStyle = "text-white text-[.8em] mt-3 mr-3";

export default Layout;
