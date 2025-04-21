package com.example.backend.controller;

import com.example.backend.model.CompletedExam;
import com.example.backend.model.User;
import com.example.backend.dto.LoginRequest;
import com.example.backend.repository.CompletedExamRepository;
import com.example.backend.repository.ExamRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ExamRepository examRepo;

    @Autowired
    private CompletedExamRepository completedRepo;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        String idPrefix = user.getRole() != null && user.getRole().equals("admin") ? "ADMIN" : "EXAM";
        long count = userRepo.count();
        user.setUserId(idPrefix + (count + 1));

        if (user.getRole() == null) user.setRole("student");
        if (user.getAccountType() == null) user.setAccountType("Miễn phí");

        String createdAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"));
        user.setCreationDate(createdAt);

        return userRepo.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest login) {
        User found = userRepo.findByEmailAndPassword(login.getEmail(), login.getPassword());
        if (found == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Sai email hoặc mật khẩu");
        }

        // Ẩn password trước khi trả về
        found.setPassword(null);
        return ResponseEntity.ok(found);
    }


    @GetMapping("/{userId}")
    public Optional<User> getUserById(@PathVariable String userId) {
        return userRepo.findById(userId);
    }

    @GetMapping("/infor/{userId}")
    public Map<String, Object> getUserInfoWithExamCount(@PathVariable String userId) {
        Optional<User> optionalUser = userRepo.findById(userId);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User user = optionalUser.get();
        long examCount = user.getRole().equals("admin") ? examRepo.countByCreatedBy(userId) : 0;
        long completedExamCount = user.getRole().equals("student") ? completedRepo.countByUserId(userId) : 0;

        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("examCount", examCount);
        response.put("completedExamCount", completedExamCount);
        return response;
    }

    @GetMapping("/completed/{userId}")
    public List<Map<String, Object>> getCompletedExamsByUser(@PathVariable String userId) {
        List<CompletedExam> completedExams = completedRepo.findByUserId(userId);

        return completedExams.stream().map(completed -> {
            Map<String, Object> result = new HashMap<>();
            result.put("id", completed.getId());
            result.put("userId", completed.getUserId());
            result.put("examId", completed.getExamId());
            result.put("startTime", completed.getStartTime());
            result.put("endTime", completed.getEndTime());
            result.put("score", completed.getScore());

            // Lấy tên đề thi
            examRepo.findById(completed.getExamId()).ifPresent(exam -> {
                result.put("examName", exam.getExamName());
            });

            return result;
        }).toList();
    }

    @PutMapping("/update/{userId}")
    public User updateUser(@PathVariable String userId, @RequestBody User updatedUser) {
        return userRepo.findById(userId).map(user -> {
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            user.setPhoneNumber(updatedUser.getPhoneNumber());
            user.setAccountType(updatedUser.getAccountType());
            return userRepo.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("/check-email")
    public Map<String, Boolean> checkEmailExists(@RequestParam String email) {
        boolean exists = userRepo.findByEmail(email) != null;
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return response;
    }

}
