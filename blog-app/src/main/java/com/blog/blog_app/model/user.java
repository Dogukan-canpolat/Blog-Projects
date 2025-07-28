package com.blog.blog_app.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity // veritabanına tablo eklentisi String
@Table(name = "users") // veritabanında tablo ismi "users" olacak
@Data // getter, setter, toString vs. hepsini otomatik ekler
@NoArgsConstructor
@AllArgsConstructor
@Builder // nesne oluştururken .builder() şeklinde yazmamıza yarar
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // 🔥 bu satır önemli
public class user {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true) // nullable = false Sütun boş olamaz demek
    private String username;

    @Column(nullable = false)
    private String FullName;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // "AUTHOR" gibi roller burda tutulacak
}
