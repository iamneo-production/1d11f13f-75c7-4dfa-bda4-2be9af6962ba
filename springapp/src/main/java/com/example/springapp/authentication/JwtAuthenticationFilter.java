package com.example.springapp.authentication;

import java.io.IOException;
import java.security.SignatureException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.springapp.model.Student;
import com.example.springapp.service.UserService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends OncePerRequestFilter{

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String TOKEN_PREFIX = "Bearer ";
    private static final String SECRET_KEY = "thisisainternlevelprojectThisIsAStrongAndSecureKey123!@#";

     @Autowired
    private UserService userService;

    private static final String ROLES_CLAIM = "roles";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String token = extractToken(request);
            if (token != null && validateToken(token)) {
                Authentication authentication = getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (ExpiredJwtException e) {
            logger.error("JWT token has expired");
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token");
        } catch (Exception e) {
            logger.error("Authentication failed: {}");
        } finally {
            filterChain.doFilter(request, response);
        }
    }

     private String extractToken(HttpServletRequest request) {
        String header = request.getHeader(AUTHORIZATION_HEADER);
        if (header != null && header.startsWith(TOKEN_PREFIX)) {
            return header.substring(TOKEN_PREFIX.length());
        }
        return null;
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes())).build().parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            throw e; // Rethrow the exception to handle in the calling method
        } catch (MalformedJwtException e) {
            throw e; // Rethrow the exception to handle in the calling method
        } catch (Exception e) {
            logger.error("Invalid JWT token: {}");
        }
        return false;
    }

    private Authentication getAuthentication(String token) {
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes())).build().parseClaimsJws(token).getBody();
            String email = claims.getSubject(); // Extract the email from the token claims
            String role = (String) claims.get(ROLES_CLAIM);
    
            // Validate user's credentials based on email and password from the token
            if (validateCredentials(email, token)) { // Pass the token, not the password
                return new UsernamePasswordAuthenticationToken(email, null, null);
            } else {
                logger.error("Invalid credentials for email: {}");
            }
        } catch (Exception e) {
            logger.error("Failed to extract user details from JWT token: {}");
        }
        return null;
    }
    

    // private boolean validateCredentials(String email) {
    //     // Retrieve the user from your user service based on the email
    //     User user = userService.findByEmail(email);

    //     if (user != null) {
    //         // The credentials are valid
    //         return true;
    //     }

    //     // The credentials are invalid
    //     return false;
    // }

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

    
    public static String generateToken(String email, String role) {
        Claims claims = Jwts.claims().setSubject(email); // Set email as the subject of the token
        claims.put(ROLES_CLAIM, role);
        return Jwts.builder()
                .setClaims(claims)
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }
    
 }

