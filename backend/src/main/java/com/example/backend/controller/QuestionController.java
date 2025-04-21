package com.example.backend.controller;

import com.example.backend.model.Question;
import com.example.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepo;

    // Add question
    @PostMapping("/add/{examId}")
    public Question addQuestionToExam(@PathVariable String examId, @RequestBody Question question) {
        String id = "Q" + UUID.randomUUID().toString().replace("-", "").substring(0, 8);
        question.setQuestionId(id);
        question.setExamId(examId); // 👈 gán luôn examId từ URL
        return questionRepo.save(question);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable String id) {
        questionRepo.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }

    @PutMapping("/{questionId}")
    public Question updateQuestion(@PathVariable String questionId, @RequestBody Question updated) {
        return questionRepo.findById(questionId).map(q -> {
            q.setType(updated.getType());
            q.setQuestionContent(updated.getQuestionContent());
            q.setExplanation(updated.getExplanation());
            q.setChoicesJson(updated.getChoicesJson());
            q.setAnswer(updated.getAnswer());
            return questionRepo.save(q);
        }).orElseThrow(() -> new RuntimeException("Không tìm thấy câu hỏi"));
    }


    // Get questions by exam
    @GetMapping("/by-exam/{examId}")
    public List<Question> getQuestionsByExamId(@PathVariable String examId) {
        return questionRepo.findByExamId(examId);
    }
}
