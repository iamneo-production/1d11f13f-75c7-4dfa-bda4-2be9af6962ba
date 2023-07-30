// package com.example.springapp.service;

// import java.util.Collections;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import com.example.springapp.model.Student;
// import com.example.springapp.repository.UserRepo;

// @Service
// public class UserDetailsServiceImpl implements UserDetailsService{

//     @Autowired
//     private UserRepo userRepository;

//     public UserDetailsServiceImpl(UserRepo userRepository){
//         this.userRepository = userRepository;

//     }

//      @Override
//     public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//         Student user = userRepository.findByEmail(email);
//         if (user == null) {
//             throw new UsernameNotFoundException("User not found");
//         }
        
//         return new org.springframework.security.core.userdetails.User(
//             user.getEmail(),
//             user.getPassword(),
//             Collections.emptyList()
//         );
//     }
    
// }