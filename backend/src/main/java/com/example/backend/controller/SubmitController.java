package com.example.backend.controller;

import com.example.backend.dto.GradeRequestDTO;
import com.example.backend.model.CompletedExam;
import com.example.backend.model.Question;
import com.example.backend.model.UserAnswer;
import com.example.backend.repository.CompletedExamRepository;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.UserAnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/submit")
public class SubmitController {
    @Autowired
    private CompletedExamRepository completedRepo;

    @Autowired
    private UserAnswerRepository answerRepo;
    @Autowired
    private QuestionRepository questionRepo;
    String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"));


    @GetMapping("/review/{completedId}")
    public List<UserAnswer> getReview(@PathVariable Long completedId) {
        return answerRepo.findByCompletedExamId(completedId);
    }

    @PostMapping("/grade")
    public Map<String, Object> gradeExam(@RequestBody GradeRequestDTO request) {
        String examId = request.getExamId();
        String userId = request.getUserId();
        Map<String, Object> answers = request.getAnswers();
        long timeTaken = request.getTimeTaken();

        List<Question> questions = questionRepo.findByExamId(examId);

        double totalScore = 0;
        int correct = 0;
        int total = questions.size();
        List<Map<String, Object>> details = new ArrayList<>();
        List<UserAnswer> savedAnswers = new ArrayList<>();

        LocalDateTime end = LocalDateTime.now();
        LocalDateTime start = end.minusSeconds(timeTaken);
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

        CompletedExam completed = new CompletedExam();
        completed.setUserId(userId);
        completed.setExamId(examId);
        completed.setStartTime(start.format(fmt));
        completed.setEndTime(end.format(fmt));
        completedRepo.save(completed);

        for (Question q : questions) {
            String qid = q.getQuestionId();
            Object userAns = answers.get(qid);
            if (userAns == null) continue;

            String type = q.getType();
            boolean isCorrect = false;
            double questionScore = 0;
            Map<String, Object> detail = new HashMap<>();
            detail.put("questionId", qid);

            try {
                ObjectMapper mapper = new ObjectMapper();

                if ("Part_1".equals(type)) {
                    List<Map<String, Object>> choices = mapper.readValue(q.getChoicesJson(), List.class);
                    String correctLabel = choices.stream()
                            .filter(c -> Boolean.TRUE.equals(c.get("correct")))
                            .map(c -> (String) c.get("label"))
                            .findFirst().orElse(null);

                    if (userAns instanceof String && userAns.equals(correctLabel)) {
                        isCorrect = true;
                        questionScore = 0.25;
                    }
                    detail.put("correct", isCorrect);
                }

                else if ("Part_2".equals(type)) {
                    List<Map<String, Object>> choices = mapper.readValue(q.getChoicesJson(), List.class);
                    Map<String, Boolean> submitted = (Map<String, Boolean>) userAns;
                    Map<String, Boolean> resultMap = new HashMap<>();

                    int matched = 0;

                    for (Map<String, Object> choice : choices) {
                        String label = (String) choice.get("label");
                        boolean expected = Boolean.TRUE.equals(choice.get("correct"));
                        boolean actual = Boolean.TRUE.equals(submitted.get(label));
                        if (expected == actual) matched++;
                        resultMap.put(label, expected == actual);
                    }

                    isCorrect = (matched == 4);
                    switch (matched) {
                        case 1 -> questionScore = 0.1;
                        case 2 -> questionScore = 0.25;
                        case 3 -> questionScore = 0.5;
                        case 4 -> questionScore = 1.0;
                        default -> questionScore = 0;
                    }

                    detail.put("correctOptions", resultMap);
                }

                else if ("Part_3".equals(type)) {
                    String correctAnswer = q.getAnswer();
                    if (userAns instanceof Map) {
                        StringBuilder userAnswer = new StringBuilder();
                        Map<String, String> digitMap = (Map<String, String>) userAns;
                        for (int i = 0; i < digitMap.size(); i++) {
                            userAnswer.append(digitMap.get(String.valueOf(i)));
                        }
                        if (correctAnswer != null && correctAnswer.equals(userAnswer.toString())) {
                            isCorrect = true;
                            questionScore = 0.5;
                        }
                    }
                    detail.put("correct", isCorrect);
                }

                totalScore += questionScore;
                if (isCorrect) correct++;
                details.add(detail);

                UserAnswer userAnswerEntity = new UserAnswer();
                userAnswerEntity.setQuestionId(qid);
                userAnswerEntity.setUserId(userId);
                userAnswerEntity.setCorrect(isCorrect);
                userAnswerEntity.setCompletedExamId(completed.getId());
                userAnswerEntity.setAnswerJson(mapper.writeValueAsString(userAns));
                savedAnswers.add(userAnswerEntity);

            } catch (Exception e) {
                System.out.println("Lỗi khi chấm câu " + qid + ": " + e.getMessage());
            }
        }

        answerRepo.saveAll(savedAnswers);

        double finalScore = Math.min(10.0, totalScore);
        completed.setScore(finalScore);
        completed.setCorrect(correct);
        completed.setTotal(total);
        completedRepo.save(completed);

        Map<String, Object> result = new HashMap<>();
        result.put("correct", correct);
        result.put("total", total);
        result.put("score", finalScore);
        result.put("startTime", start.format(fmt));
        result.put("endTime", end.format(fmt));
        result.put("details", details);
        result.put("completedId", completed.getId());

        return result;
    }



}