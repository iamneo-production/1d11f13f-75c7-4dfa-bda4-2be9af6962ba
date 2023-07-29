package com.example.springapp.controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.authentication.JwtAuthenticationFilter;
import com.example.springapp.model.Student;
import com.example.springapp.service.UserService;

@RestController
@CrossOrigin(origins = "https://8081-bdfdeabfecfbcefbeacfaceadeaeaadbdbabf.project.examly.io")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private final UserService userService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public AuthController(UserService userService, JwtAuthenticationFilter jwtAuthenticationFilter){
        this.userService = userService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    private static final String ADMIN_EMAIL = "admin@gmail.com";
    private static final String ADMIN_PASSWORD = "Admin@123";

     
     @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String, Object> loginForm) {
    String email = (String) loginForm.get("email");
    String password = (String) loginForm.get("password");

    if (email != null && password != null) {
        if (email.equals(ADMIN_EMAIL) && password.equals(ADMIN_PASSWORD)) {
            // Admin authentication successful
            // Generate and return a JWT token with admin role
            String token = JwtAuthenticationFilter.generateToken(email,"ROLE_ADMIN");

            // Return entered details and token
            Map<String, Object> response = new HashMap<>();
            response.put("email", email);
            response.put("password", password);
            response.put("token", token);
            response.put("role", "ROLE_ADMIN");
            response.put("userId", "admin123");
            return ResponseEntity.ok(response);
        } else {
            Student user = userService.findByEmail(email);
            if (user != null && validateCredentials(email, password)) {
                // User authentication successful
                // Generate and return a JWT token with user role
                String token = JwtAuthenticationFilter.generateToken(email,"ROLE_USER");

                // Return entered details and token
                Map<String, Object> response = new HashMap<>();
                response.put("email", email);
                response.put("password", password);
                response.put("token", token);
                response.put("role", "ROLE_USER");
                response.put("userId", user.getId());
                return ResponseEntity.ok(response);

            }
        }
    }

    // User authentication failed
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
}
    @GetMapping("/validate-token")
    public ResponseEntity<String> validateToken(@RequestHeader("Authorization") String tokenHeader) {
    
    String token = extractTokenFromHeader(tokenHeader);

    if (token != null && jwtAuthenticationFilter.validateToken(token)) {
      
        return ResponseEntity.ok("Token is valid");
    } else {
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
    }
}

    private String extractTokenFromHeader(String tokenHeader) {
    if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
        return tokenHeader.substring(7); 
    }
    return null;
}



    private boolean validateCredentials(String email, String password) {
        Student user = userService.findByEmail(email);
        if (user != null) {
            String storedPassword = user.getPassword();

            // Compare the encrypted/hashed password
            // For example, using BCryptPasswordEncoder for password hashing
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            return passwordEncoder.matches(password, storedPassword);
        }

        return false;
    }

}