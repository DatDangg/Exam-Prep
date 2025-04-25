package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
@Entity
@Data
public class Question {
    @Id
    private String questionId;

    private String examId;
    private String type;

    @JsonProperty("question")
    private String questionContent;

    @JsonProperty("explanation")
    private String explanation;

    @Lob
    private String choicesJson;

    private String answer;

    @ManyToOne
    @JoinColumn(name = "examId", referencedColumnName = "examId", insertable = false, updatable = false)
    private Exam exam;

    @JsonProperty("choices")
    public void setChoices(List<Object> choices) {
        try {
            this.choicesJson = new com.fasterxml.jackson.databind.ObjectMapper()
                    .writeValueAsString(choices);
        } catch (Exception e) {
            this.choicesJson = "[]";
        }
    }

    @JsonProperty("choices")
    public List<Object> getChoices() {
        try {
            return new com.fasterxml.jackson.databind.ObjectMapper()
                    .readValue(this.choicesJson, List.class);
        } catch (Exception e) {
            return List.of();
        }
    }
}
