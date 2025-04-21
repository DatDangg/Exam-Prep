package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;

import java.util.List;

@Data
@Entity
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

    // Setter custom cho choices
    @JsonProperty("choices")
    public void setChoices(List<Object> choices) {
        try {
            this.choicesJson = new com.fasterxml.jackson.databind.ObjectMapper()
                    .writeValueAsString(choices);
        } catch (Exception e) {
            this.choicesJson = "[]"; // fallback
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



    // Getters/setters cho các field còn lại (hoặc dùng Lombok)
}
