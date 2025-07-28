package com.blog.blog_app.Repositories;

import com.blog.blog_app.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
    // Şimdilik ekstra Metoda Gerek yok !!
}
