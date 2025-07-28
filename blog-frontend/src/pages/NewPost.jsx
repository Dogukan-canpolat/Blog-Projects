import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/newPost.css";

const NewPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    authorId: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "AUTHOR") {
      alert("Bu sayfaya sadece yazarlar erişebilir!");
      navigate("/login");
    } else {
      setFormData((prev) => ({
        ...prev,
        authorId: user.id,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/posts/add", formData);
      navigate("/");
    } catch (err) {
      console.error("Post eklenemedi:", err);
      alert("Bir hata oluştu.");
    }
  };

  return (
    <div className="new-post-container">
      <h2>📝 Yeni Post Oluştur</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Başlık"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="İçerik"
          value={formData.content}
          onChange={handleChange}
          required
        />
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default NewPost;
