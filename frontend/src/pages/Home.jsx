import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUserTie, FaBook } from "react-icons/fa";

const Home = () => {
  return (
    <div style={containerStyle}>
      <div style={backdropStyle}></div>
      <div style={contentStyle}>
        <Link
          to="/similarity-search"
          style={clickableStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FaSearch size={40} style={iconStyle} />
          <div style={textStyle}>
            <div style={titleStyle}>Finding Similar Cases</div>
            Quickly search for cases similar to yours.
          </div>
        </Link>
        <Link
          to="/legal-assist"
          style={clickableStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FaUserTie size={40} style={iconStyle} />
          <div style={textStyle}>
            <div style={titleStyle}>Legal Assistant</div>
            Access your personal legal assistant for help.
          </div>
        </Link>
        <Link
          to="/legal-citations"
          style={clickableStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FaBook size={40} style={iconStyle} />
          <div style={textStyle}>
            <div style={titleStyle}>Legal Citations</div>
            Find accurate legal citations for your documents.
          </div>
        </Link>
      </div>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "92vh",
  backgroundColor: "#202025",
  background: "url(/court_bg.jpg) no-repeat center center/cover",
  position: "relative",
};

const backdropStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.45)",
  backdropFilter: "blur(3px)",
};

const contentStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  zIndex: 1,
};

const clickableStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "14rem",
  height: "13rem",
  backgroundColor: "#20202090",
  backdropFilter: "blur(14px)",
  borderRadius: "25px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  cursor: "pointer",
  transition: "transform 0.2s",
  margin: "0 1.2vw",
  padding: "2rem",
  textAlign: "center",
};

const textStyle = {
  marginTop: "10px",
  fontSize: "14.5px",
  color: "#ccc",
};

const titleStyle = {
  fontWeight: "600",
  marginBottom: "5px",
  color: "#fff",
};

const iconStyle = {
  color: "#fff",
};

export default Home;
