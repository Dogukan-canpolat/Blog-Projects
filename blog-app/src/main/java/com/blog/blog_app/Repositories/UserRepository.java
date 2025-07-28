package com.blog.blog_app.Repositories;

import com.blog.blog_app.model.user;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface UserRepository extends JpaRepository<user, Long>{
    // Kullanıcıyı username'e göre bulmak için ekstra method
    Optional<user> findByUsername(String username);
    Optional<user> findByUsernameAndPassword(String username, String password);
}
