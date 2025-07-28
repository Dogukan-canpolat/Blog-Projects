package com.blog.blog_app.service;


import com.blog.blog_app.Repositories.UserRepository;
import com.blog.blog_app.dto.UserDto;
import com.blog.blog_app.model.user;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public user register(UserDto userDto) {
        user User = user.builder()
                .username(userDto.getUsername())
                .password(userDto.getPassword())
                .role(userDto.getRole() != null ? userDto.getRole() : "AUTHOR")
                .FullName(userDto.getFullName())
                .build();

        return userRepository.save(User);
    }

    public user login(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password)
                .orElseThrow(() -> new RuntimeException("Kullanıcı adı veya şifre hatalı!"));
    }

    //Yeni kullanıcı ekler
    public user createUser(user User){
        return userRepository.save(User);
    }

    //Tüm kullanıcıları döner
    public List<user> getAllUser(){
        return userRepository.findAll();
    }

    //ID ile kullanıcı Döner
    public user getUserByİd(Long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı: "+ id));
    }
}
