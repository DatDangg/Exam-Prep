package com.example.backend.controller;

import com.example.backend.model.Question;
import com.example.backend.repository.ExamRepository;
import com.example.backend.repository.QuestionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private ExamRepository examRepo; // 👈 cần thêm cái này để gọi update

    private void updateExamTime(String examId) {
        examRepo.findById(examId).ifPresent(exam -> {
            exam.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss")));
            examRepo.save(exam);
        });
    }

    // Add question
    @PostMapping("/add/{examId}")
    public Question addQuestionToExam(@PathVariable String examId, @RequestBody Question question) {
        String id = "Q" + UUID.randomUUID().toString().replace("-", "").substring(0, 8);
        question.setQuestionId(id);
        question.setExamId(examId);

        Question saved = questionRepo.save(question);

        // ✅ Update updatedAt
        updateExamTime(examId);

        return saved;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable String id) {
        Question q = questionRepo.findById(id).orElse(null);
        if (q != null) {
            questionRepo.deleteById(id);
            updateExamTime(q.getExamId()); // ✅ Cập nhật updatedAt
        }
        return ResponseEntity.ok("Deleted");
    }


    @PutMapping("/update/{questionId}")
    public Question updateQuestion(@PathVariable String questionId, @RequestBody Question updated) {
        return questionRepo.findById(questionId).map(q -> {
            q.setType(updated.getType());
            q.setQuestionContent(updated.getQuestionContent());
            q.setExplanation(updated.getExplanation());
            q.setChoicesJson(updated.getChoicesJson());
            q.setAnswer(updated.getAnswer());

            Question saved = questionRepo.save(q);

            // ✅ Update updatedAt
            updateExamTime(q.getExamId());

            return saved;
        }).orElseThrow(() -> new RuntimeException("Không tìm thấy câu hỏi"));
    }

    // Get questions by exam
    @GetMapping("/by-exam/{examId}")
    public List<Question> getQuestionsByExamId(@PathVariable String examId) {
        return questionRepo.findByExamId(examId);
    }

    @GetMapping("/for-test/{examId}")
    public List<Map<String, Object>> getQuestionsForTest(@PathVariable String examId) {
        List<Question> questions = questionRepo.findByExamId(examId);

        return questions.stream().map(q -> {
            Map<String, Object> m = new HashMap<>();
            m.put("questionId", q.getQuestionId());
            m.put("question", q.getQuestionContent());
            m.put("type", q.getType());

            // Parse choicesJson thành List rồi xoá 'correct' & 'explain'
            try {
                ObjectMapper mapper = new ObjectMapper();
                List<Map<String, Object>> choices = mapper.readValue(q.getChoicesJson(), List.class);

                // Xoá "correct" và "explain" trước khi trả về
                choices.forEach(choice -> {
                    choice.remove("correct");
                    choice.remove("explain");
                });

                m.put("choices", choices);
            } catch (Exception e) {
                m.put("choices", List.of());
            }

            return m;
        }).toList();
    }

}
