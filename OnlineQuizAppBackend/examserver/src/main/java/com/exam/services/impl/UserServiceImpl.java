package com.exam.services.impl;

import java.util.Set;

import com.exam.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repository.RoleRepository;
import com.exam.repository.UserRepository;
import com.exam.services.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		// Check if the user already exists
		User existingUser = this.userRepository.findByUsername(user.getUsername());
		if (existingUser != null) {
			throw new Exception("Username already exists");
		}

		// Save the roles before the user
		for (UserRole userRole : userRoles) {
			Role role = userRole.getRole();  // Get the role

			// If the role doesn't exist in the database, create and save it
			if (role.getRoleId() == null || !roleRepository.existsByRoleName(role.getRoleName())) {
				role.setRoleName(role.getRoleName().toUpperCase()); // Ensure the role name is uppercase
				roleRepository.save(role); // Save the role
			}
		}

		// Add the roles to the user
		user.getUserRole().addAll(userRoles);

		// Save the user
		User savedUser = this.userRepository.save(user);

		// Save UserRoles, it will be saved due to cascading
		for (UserRole userRole : userRoles) {
			userRole.setUser(savedUser);  // Associate user with the role
		}

		return savedUser;
	}

	public User findUser(String username) {
		return this.userRepository.findByUsername(username);
	}

	public void deleteUser(Long id) {
		this.userRepository.deleteById(id);
	}
}
