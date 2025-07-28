import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api
      .get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Postlar alınamadı:", err));
  }, []);

  return (
    <div className="home-container">
      <h2>📚 Paylaşılan Yazılar</h2>
      {JSON.parse(localStorage.getItem("user"))?.role === "AUTHOR" && (
  <div style={{ textAlign: "right", marginBottom: "1rem" }}>
    <Link to="/new-post" className="btn new-post-btn">+ Yeni Post</Link>
  </div>
    )}
      {posts.length === 0 ? (
        <p>Henüz yazı yok.</p>
      ) : (
        posts.map((post) => (
          <div className="post-card" key={post.id}>
            <Link to={`/posts/${post.id}`} className="post-link">
            <h3>{post.title}</h3>
            </Link>
            <p>{post.content.slice(0, 120)}...</p>
            <p className="author">✍️ {post.author?.username}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default HomePage;
