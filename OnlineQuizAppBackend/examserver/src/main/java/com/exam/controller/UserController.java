package com.exam.controller;

import java.util.HashSet;
import java.util.Set;

import com.exam.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.helper.UserWithSameUsernameFoundException;
import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private BCryptPasswordEncoder bcryptPasswordEncorder;

	@Autowired
	private RoleRepository roleRepository;
	@PostMapping("/")
	public ResponseEntity<?> createNewUser(@RequestBody User theUser) throws Exception {
		// Verifică dacă utilizatorul există deja
		User existingUser = this.userService.findUser(theUser.getUsername());
		if (existingUser != null) {
			return ResponseEntity.badRequest().body("User already exists!");
		}

		// Setează profilul și criptează parola
		theUser.setProfile("default.png");
		theUser.setPassword(this.bcryptPasswordEncorder.encode(theUser.getPassword()));

		// Preia rolul din JSON-ul trimis de frontend (ca string simplu)
		String roleName = theUser.getRole();  // Modificat aici să preia direct 'role' ca string

		// Căutăm rolul în tabela Role pe baza numelui rolului
		Role role = roleRepository.findByRoleName(roleName.toUpperCase());

		// Dacă rolul nu există, îl creăm și îl salvăm în tabel
		if (role == null) {
			role = new Role();
			role.setRoleName(roleName.toUpperCase());  // Atribuim rolul corect
			role = roleRepository.save(role);  // Salvăm rolul în baza de date
		}

		// Creăm UserRole și îl adăugăm la setul de UserRoles
		UserRole userRole = new UserRole();
		userRole.setRole(role);
		userRole.setUser(theUser);

		Set<UserRole> userRoles = new HashSet<>();
		userRoles.add(userRole);

		// Creează utilizatorul cu rolurile sale
		User savedUser = this.userService.createUser(theUser, userRoles);

		return ResponseEntity.ok(savedUser);
	}


	@GetMapping("/{username}")
	public User getUser(@PathVariable("username") String username) {
		return userService.findUser(username);
	}

	@DeleteMapping("/{userId}")
	public String deleteUser(@PathVariable("userId") Long userId) {
		userService.deleteUser(userId);
		return "User with userId " + userId + " is deleted successfully";
	}
}
