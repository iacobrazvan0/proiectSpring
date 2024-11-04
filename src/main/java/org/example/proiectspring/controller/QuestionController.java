package org.example.proiectspring.controller;

import org.example.proiectspring.model.Question;
import org.example.proiectspring.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;

    private Question currentQuestion;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/next")
    public Question getNextQuestion() {
        currentQuestion = questionService.getRandomQuestion();
        return currentQuestion;
    }

    @PostMapping("/submitAnswer")
    public ResponseEntity<String> submitAnswer(@RequestParam String answer) {
        boolean isCorrect = questionService.checkAnswer(currentQuestion, answer);
        return ResponseEntity.ok(isCorrect ? "Correct!" : "Incorrect!");
    }
}

