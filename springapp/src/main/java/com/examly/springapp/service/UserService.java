package com.examly.springapp.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Student;
import com.examly.springapp.repository.UserRepo;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

    public UserService(UserRepo userRepository){
        this.userRepository = userRepository;

    }

    public Student findByEmail(String email) {
        return userRepository.findByEmail(email);
}

}