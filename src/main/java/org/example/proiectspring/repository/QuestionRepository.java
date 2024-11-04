package org.example.proiectspring.repository;

import org.example.proiectspring.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
