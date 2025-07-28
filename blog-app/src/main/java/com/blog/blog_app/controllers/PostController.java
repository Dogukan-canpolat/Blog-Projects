package com.blog.blog_app.controllers;


import com.blog.blog_app.dto.PostDto;
import com.blog.blog_app.model.Post;
import com.blog.blog_app.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    // Yeni post ekler
    @PostMapping("/add")
    public Post createPost(@Valid @RequestBody PostDto post){
        return postService.createPost(post);
    }

    // Tüm postları listeler
    @GetMapping
    public List<Post> getAllPosts(){
        return postService.getAllPost();
    }

    // Belirli ID'deki postu döner
    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id){
        return postService.getPostById(id);
    }

}
