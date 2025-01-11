package com.exam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exam.model.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exam.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    boolean existsByRoleName(String roleName);  // This method checks if a role exists by roleName

    Role findByRoleName(String roleName);
}
