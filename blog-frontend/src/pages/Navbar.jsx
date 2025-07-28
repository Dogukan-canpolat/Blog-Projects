import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import { ThemeContext } from "../context/TheneContext";
import { useContext } from "react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);


  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          BlogApp
        </Link>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <span className="username">👤 {user.username}</span>
            <button onClick={handleLogout} className="btn logout">
              Çıkış Yap
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">Giriş Yap</Link>
            <Link to="/register" className="btn">Kayıt Ol</Link>
          </>
        )}
        <button
  className="btn"
  onClick={() => setDarkMode((prev) => !prev)}
>
  {darkMode ? "🌞 Light" : "🌙 Dark"}
</button>
      </div>
    </nav>
  );
};

export default Navbar;
