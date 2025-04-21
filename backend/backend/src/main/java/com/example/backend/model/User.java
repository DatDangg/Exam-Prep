package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
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
