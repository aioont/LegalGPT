import React from "react";
import { Link, useLocation } from "react-router-dom";

const options = [
  { id: "home", label: "Home", route: "home"},  
  { id: "legal-assist", label: "Legal Assist", route: "legal-assist" },
  { id: "similarity-search", label: "Similarity Search", route: "similarity-search" },
  { id: "legal-citations", label: "Legal Citations", route: "legal-citations" },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out bg-black text-white w-64 z-50`}
    >
      <button onClick={toggleSidebar} className="text-center p-2 text-[1.4em] transition-all hover:bg-gray-800 rounded-md mt-2 ml-4 h-[2.3em] w-[2.3em] active:bg-slate-900">
        &times; {/* Close icon */}
      </button>
      <div className="p-4 flex flex-col space-y-4">
        {options.map((option) => (
          <Link to={`/${option.route}`} key={option.id} onClick={toggleSidebar}>
            <button className={`w-full py-4 px-4 text-center rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${
                location.pathname === `/${option.route}`
                  ? "text-black bg-gray-300 font-semibold"
                  : "bg-gray-800 text-white"
              }`}
            >
              {option.label}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
