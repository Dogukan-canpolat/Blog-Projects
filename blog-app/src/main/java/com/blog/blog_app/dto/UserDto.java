package com.blog.blog_app.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserDto {

    @NotBlank(message = "Kullanıcı adı boş olamaz")
    private String username;

    @NotBlank(message = "Şifre boş olamaz")
    private String password;

    @NotBlank(message = "FullName boş olamaz")
    private String FullName;

    private String role; // boş gelirse default olarak "AUTHOR" atanacak
}
