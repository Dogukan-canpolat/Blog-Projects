import { useState } from "react";
import api from "../services/api";
import "../styles/registerPage.css"; // CSS dosyasını ayrı yazacağız
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "AUTHOR", // varsayılan değer
    fullName: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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
      const res = await api.post("/users/register", formData);
      setMessage("Kayıt başarılı! Giriş yapabilirsiniz.");
      console.log("Kayıt başarılı:", res.data);
    } catch (err) {
       console.log("Register Hatası:", err.response?.data);
    setError(err.response?.data?.username || err.response?.data?.message || "Bir hata oluştu.");
    }
  };

  return (
    <div className="register-container">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Kullanıcı Adı"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
        type="text"
        name="fullName"
        placeholder="Ad Soyad"
        value={formData.fullName}
        onChange={handleChange}
        required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="AUTHOR">Yazar</option>
          <option value="GUEST">Misafir</option>
        </select>
        <button type="submit">Kayıt Ol</button>
      </form>
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Zaten hesabınız var mı? <Link to="/login">Giriş Yap</Link>
    </p>
      {error && <p className="error-msg">{error}</p>}
      {message && <p className="success-msg">{message}</p>}
    </div>
  );
};

export default RegisterPage;