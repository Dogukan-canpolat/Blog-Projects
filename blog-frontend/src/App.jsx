import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./pages/Navbar";
import HomePage from "./pages/HomePage";
import NewPost from "./pages/NewPost";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        {/* Root sayfayı /login'e yönlendiriyoruz */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
