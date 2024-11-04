package org.example.proiectspring.service;

import org.example.proiectspring.model.Question;
import org.example.proiectspring.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question getRandomQuestion() {
        List<Question> questions = questionRepository.findAll();
        return questions.isEmpty() ? null : questions.get(new Random().nextInt(questions.size()));
    }

    public boolean checkAnswer(Question question, String answer) {
        return question.getCorrectAnswer().equals(answer);
    }
}

