package com.example.backend.controller;

import com.example.backend.model.CompletedExam;
import com.example.backend.model.Exam;
import com.example.backend.model.Question;
import com.example.backend.repository.CompletedExamRepository;
import com.example.backend.repository.ExamRepository;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.model.User;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exams")
public class ExamController {
    @Autowired
    private ExamRepository examRepo;
    @Autowired
    private QuestionRepository questionRepo;
    @Autowired
    private CompletedExamRepository completedRepo;
    @Autowired
    private UserRepository userRepo;

    @PostMapping("/create")
    public Exam createExam(@RequestBody Exam exam) {
        String id = "EXAM" + (examRepo.count() + 1);
        exam.setExamId(id);
        exam.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss")));
        return examRepo.save(exam);
    }

    @PutMapping("/{examId}")
    public Exam updateExam(@PathVariable String examId, @RequestBody Exam updatedExam) {
        return examRepo.findById(examId).map(exam -> {
            if (updatedExam.getExamName() != null)
                exam.setExamName(updatedExam.getExamName());

            exam.setLocked(updatedExam.isLocked());

            // ✅ Thêm updatedAt
            exam.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss")));

            return examRepo.save(exam);
        }).orElseThrow(() -> new RuntimeException("Exam not found"));
    }

    @GetMapping("/{examId}/detail")
    public Map<String, Object> getExamDetail(@PathVariable String examId) {
        Exam exam = examRepo.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        List<Question> questions = questionRepo.findByExamId(examId);

        Map<String, Object> result = new HashMap<>();
        result.put("examName", exam.getExamName());
        result.put("questionCount", questions.size());
        result.put("questions", questions);

        return result;
    }

    @GetMapping("/completed")
    public List<Map<String, Object>> getUsersCompletedExam(
            @RequestParam String examId,
            @RequestParam(required = false) String userId) {

        List<CompletedExam> completed;

        // Nếu có userId thì lọc theo cả 2, không thì chỉ lấy theo examId
        if (userId != null && !userId.isEmpty()) {
            completed = completedRepo.findByExamIdAndUserId(examId, userId);
        } else {
            completed = completedRepo.findByExamId(examId);
        }

        return completed.stream().map(c -> {
            Map<String, Object> m = new HashMap<>();
            User u = userRepo.findById(c.getUserId()).orElse(null);
            m.put("completedId", c.getId());
            m.put("username", u != null ? u.getUsername() : "Unknown");
            m.put("userId", c.getUserId());
            m.put("score", c.getScore());
            m.put("startTime", c.getStartTime());
            m.put("endTime", c.getEndTime());
            return m;
        }).toList();
    }

    @GetMapping("/summary")
    public List<Map<String, Object>> getExamSummaries() {
        List<Exam> exams = examRepo.findAll();

        return exams.stream().map(exam -> {
            Map<String, Object> m = new HashMap<>();
            m.put("examId", exam.getExamId());
            m.put("examName", exam.getExamName());
            long count = questionRepo.countByExamId(exam.getExamId());
            m.put("questionCount", count);
            m.put("attemptCount", exam.getAttemptCount()); // 👈 đã có
            m.put("locked", exam.isLocked()); // 👈 thêm cái này
            return m;
        }).toList();
    }



    @DeleteMapping("/{examId}")
    public ResponseEntity<?> deleteExam(@PathVariable String examId) {
        if (!examRepo.existsById(examId)) {
            return ResponseEntity.status(404).body("Không tìm thấy đề thi");
        }

        // Xóa câu hỏi liên quan trước (nếu cần)
        questionRepo.deleteAll(questionRepo.findByExamId(examId));

        // Xóa completed exam liên quan (nếu có)
        completedRepo.deleteAll(completedRepo.findByExamId(examId));

        // Sau cùng xóa đề
        examRepo.deleteById(examId);

        return ResponseEntity.ok("Đã xóa đề thi và các dữ liệu liên quan");
    }


    @GetMapping
    public List<Exam> getAllExams() {
        return examRepo.findAll();
    }
}
