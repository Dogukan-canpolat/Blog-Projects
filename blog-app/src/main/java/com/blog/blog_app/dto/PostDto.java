package com.blog.blog_app.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDto {

    @NotBlank(message = "Başlık boş olamaz")
    @Size(min = 3, max = 100, message = "Başlık 3 ile 100 karakter arasında olmalı")
    private String title;

    @NotBlank(message = "İçerik boş olamaz")
    @Size(min = 10, message = "İçerik en az 10 karakter olmalı")
    private String content;

    private Long authorId; // kullanıcı ID'si, kontrol service katmanında yapılacak
}

