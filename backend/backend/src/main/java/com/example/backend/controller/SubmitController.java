package com.example.backend.controller;

import com.example.backend.model.CompletedExam;
import com.example.backend.model.UserAnswer;
import com.example.backend.repository.CompletedExamRepository;
import com.example.backend.repository.UserAnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submit")
public class SubmitController {
    @Autowired
    private CompletedExamRepository completedRepo;

    @Autowired
    private UserAnswerRepository answerRepo;

    @PostMapping("/answers")
    public List<UserAnswer> submitAnswers(@RequestBody List<UserAnswer> answers) {
        return answerRepo.saveAll(answers);
    }

    @PostMapping("/exam")
    public CompletedExam completeExam(@RequestBody CompletedExam result) {
        return completedRepo.save(result);
    }

    @GetMapping("/result/{userId}")
    public List<CompletedExam> getUserResults(@PathVariable String userId) {
        return completedRepo.findAll().stream()
                .filter(e -> e.getUserId().equals(userId))
                .toList();
    }
}