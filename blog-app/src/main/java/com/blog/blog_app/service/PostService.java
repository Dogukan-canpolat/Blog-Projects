package com.blog.blog_app.service;

import com.blog.blog_app.Repositories.PostRepository;
import com.blog.blog_app.Repositories.UserRepository;
import com.blog.blog_app.dto.PostDto;
import com.blog.blog_app.model.Post;
import com.blog.blog_app.model.user;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor //constructor injection otomatik yapılır
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public Post createPost(PostDto postDto){
        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        user author = userRepository.findById(postDto.getAuthorId())
                .orElseThrow(() -> new RuntimeException("Yazar bulunamadı!"));
        post.setCreatedAt(LocalDateTime.now());
        post.setAuthor(author);

        return postRepository.save(post);
    }

    public List<Post> getAllPost(){
        return postRepository.findAll();
    }

    public Post getPostById(Long id){
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post Bulunamadı:" + id));
    }
}
