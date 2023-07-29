package com.example.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.springapp.dto.RegisterDto;
import com.example.springapp.model.Student;
import com.example.springapp.repository.RegisterRepo;

@Service
public class RegisterService {

    @Autowired
    private final RegisterRepo regRepo;
    private final PasswordEncoder passwordEncoder;

    
    public RegisterService(RegisterRepo regRepo, PasswordEncoder passwordEncoder) {
        this.regRepo = regRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean checkphoneNumberExists(String phoneNumber) { 
        return regRepo.existsByphoneNumber(phoneNumber);
    }

    public boolean checkEmailExists(String email) {
        return regRepo.existsByEmail(email);
    }
     private String encryptPassword(String password) {
    	    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    	    return passwordEncoder.encode(password);
     }

     public String addStudent(RegisterDto registerDto) {
        Student user = new Student(
            registerDto.getId(),
            registerDto.getFirstName(),
            registerDto.getLastName(),
            registerDto.getEmail(),
            registerDto.getAddress(),
            registerDto.getPhoneNumber(),
            passwordEncoder.encode(registerDto.getPassword())
        );
        regRepo.save(user);
        return user.getFirstName();
}
}