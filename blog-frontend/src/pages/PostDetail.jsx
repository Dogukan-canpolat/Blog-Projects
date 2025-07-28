import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/PostDetail.css";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Post detayını çek
    api.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error("Post detay alınamadı:", err));

    // Yorumu çek
    api.get(`/comments/post/${id}`)
      .then(res => setComments(res.data))
      .catch(err => console.error("Yorumlar alınamadı:", err));
  }, [commentText]);

  if (!post) return <p className="loading">Yükleniyor...</p>;

  return (
    <div className="post-detail-container">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p className="author-line">✍️ {post.author?.username}</p>

      <hr />

      <h3>💬 Yorumlar</h3>
      {comments.length === 0 ? (
        <p>Henüz yorum yapılmamış.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="comment-box">
            <p>{comment.text}</p>
            <p className="comment-author">🗣️ {comment.author?.username}</p>
          </div>
        ))
      )}
      {user && (
  <form
    onSubmit={async (e) => {
      e.preventDefault();
      if (!commentText.trim()) return;

      const payload = {
          text: commentText,
          author: { id: user.id },
          post: { id: post.id }
      };

      try {
        console.log("Yorumu gönderiyoruz:", payload);
        await api.post("/comments", payload);
        setCommentText("");
        // Yorumu yeniden çek
        const res = await api.get(`/comments/post/${post.id}`);
        const yorumlar = Object.values(res.data); // ✅ diziye çevir
        console.log("Yorumlar güncellendi:", yorumlar);
        setComments(yorumlar);
      } catch (err) {
        console.error("Yorum eklenemedi:", err);
        alert("Yorum eklenemedi.");
      }
    }}
    className="comment-form"
  >
    <textarea
      value={commentText}
      onChange={(e) => setCommentText(e.target.value)}
      placeholder="Yorumunuzu yazın..."
      rows="3"
      required
    />
    <button type="submit">Yorum Yap</button>
  </form>
)}
    </div>
  );
};

export default PostDetail;
