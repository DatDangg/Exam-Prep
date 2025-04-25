package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "app_user")  // 👈 đổi tên bảng để tránh conflict
public class User {
    @Id
    private String userId;
    private String username;
    private String email;
    private String password;
    private String role;
    private String accountType;
    private String phoneNumber;
    private String creationDate;
}
