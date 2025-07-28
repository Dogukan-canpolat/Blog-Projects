package com.blog.blog_app.controllers;


import com.blog.blog_app.dto.UserDto;
import com.blog.blog_app.model.user;
import com.blog.blog_app.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {
    private final UserService userService;


    // Kayıt
    @PostMapping("/register")
    public user register(@Valid @RequestBody UserDto userDto) {
        return userService.register(userDto);
    }

    // Giriş
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        try {
            String username = loginData.get("username");
            String password = loginData.get("password");

            user User = userService.login(username, password);

            // Gerekli bilgileri JSON olarak dön
            Map<String, Object> response = new HashMap<>();
            response.put("id", User.getId());
            response.put("username", User.getUsername());
            response.put("role", User.getRole());

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
        }
    }

    //Yeni Kullanıcı ekle
    @PostMapping
    public user createUser(@RequestBody user User){
        return userService.createUser(User);
    }

    //Tüm kullanıcıları döner
    @GetMapping
    public List<user> getAllUser(){
        return userService.getAllUser();
    }

    // ID ile kullanıcıyı getirir
    @GetMapping("/{id}")
    public user getUserById(@PathVariable Long id) {
        return userService.getUserByİd(id);
    }

}
