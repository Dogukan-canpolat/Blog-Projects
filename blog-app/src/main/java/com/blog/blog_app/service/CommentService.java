package com.blog.blog_app.service;


import com.blog.blog_app.Repositories.CommentRepository;
import com.blog.blog_app.Repositories.PostRepository;
import com.blog.blog_app.Repositories.UserRepository;
import com.blog.blog_app.model.Comment;
import com.blog.blog_app.model.Post;
import com.blog.blog_app.model.user;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    //Yorum Oluştur
    public Comment createComment(Comment comment) {
        // id'lerden gerçek User ve Post nesnelerini alıyoruz
        user author = userRepository.findById(comment.getAuthor().getId())
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        Post post = postRepository.findById(comment.getPost().getId())
                .orElseThrow(() -> new RuntimeException("Post bulunamadı"));

        // gelen comment'e author ve post'u setliyoruz
        comment.setAuthor(author);
        comment.setPost(post);

        // veritabanına kaydet
        return commentRepository.save(comment);
    }
    // Tüm yorumları getir
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }
    // Belirli bir post'un yorumlarını getir
    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }
}
