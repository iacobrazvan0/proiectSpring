package org.example.proiectspring.repository;

import org.example.proiectspring.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // Poți adăuga metode personalizate dacă este necesar
    User findByUsername(String username);
}

