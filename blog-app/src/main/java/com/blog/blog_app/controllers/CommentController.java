package com.blog.blog_app.controllers;

import com.blog.blog_app.model.Comment;
import com.blog.blog_app.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    // Yeni yorum ekle
    @PostMapping
    public Comment createComment(@RequestBody Comment comment) {
        return commentService.createComment(comment);
    }

    // Tüm yorumları getir
    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    // Belirli bir yazının yorumlarını getir
    @GetMapping("/post/{postId}")
    public List<Comment> getCommentsByPostId(@PathVariable Long postId) {
        return commentService.getCommentsByPostId(postId);
    }

}
