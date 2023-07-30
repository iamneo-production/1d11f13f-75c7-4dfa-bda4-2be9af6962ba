package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// import javax.xml.stream.events.StartDocument;

import com.examly.springapp.dto.RegisterDto;
import com.examly.springapp.model.Student;
import com.examly.springapp.repository.RegisterRepo;

@Service
public class RegisterService {

    @Autowired
    private final RegisterRepo regRepo;

    @Autowired
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
     private RegisterDto convertToDto(Student user) {
        RegisterDto registerDto = new RegisterDto();
        registerDto.setPassword(user.getPassword());
        // Set other properties as needed
        return registerDto;
    }

    public RegisterDto updatePassword(String email, String newPassword) {
    Student user = regRepo.findByEmail(email);
    if (user == null) {
        return null;
    }
    String encryptedPassword = encryptPassword(newPassword);
    user.setPassword(encryptedPassword);
    regRepo.save(user);
    return convertToDto(user); // Directly return the converted DTO
}
     
}