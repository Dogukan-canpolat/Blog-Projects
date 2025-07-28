import { useState } from "react";
import api from "../services/api";
import "../Styles/LoginPage.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  setError("");
  setMessage("");

  try {
    const res = await api.post("/users/login", formData);
    localStorage.setItem("user", JSON.stringify(res.data));
    setMessage("Giriş başarılı!");
    navigate("/"); // 👈 BURASI! Girişten sonra anasayfaya yönlendiriyoruz
  } catch (err) {
    console.error("Login hatası:", err);
    setError(err.response?.data?.message || "Bir hata oluştu.");
  }
  };

  return (
    <div className="login-container" style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Kullanıcı Adı"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Giriş Yap</button>
      </form>
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Hesabınız yok mu? <Link to="/register">Kayıt Ol</Link>
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default LoginPage;
