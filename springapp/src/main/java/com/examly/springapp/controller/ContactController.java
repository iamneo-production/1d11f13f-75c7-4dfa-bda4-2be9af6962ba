package com.examly.springapp.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Contact;
import com.examly.springapp.repository.ContactRepo;

@RestController
@CrossOrigin("https://8081-bdfdeabfecfbcefbeacfaceadeaeaadbdbabf.project.examly.io")
public class ContactController {
    
    @Autowired
    private static ContactRepo contactRepo;

    public ContactController(ContactRepo contactRepo) {
        this.contactRepo = contactRepo;
    }

    @PostMapping("/api/students")
    public ResponseEntity<Contact> saveStudent(@RequestBody Contact contact) {
        return new ResponseEntity<>(contactRepo.save(contact), HttpStatus.CREATED);
    }

    @GetMapping("/api/students")
    public ResponseEntity<List<Contact>> getStudents() {
        return new ResponseEntity<>(contactRepo.findAll(), HttpStatus.OK);
    }

    @GetMapping("/api/students/{id}")
    public ResponseEntity<Contact> getStudents(@PathVariable int id) {
        Optional<Contact> student = contactRepo.findById(id);
        if (student.isPresent()) {
            return new ResponseEntity<>(student.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }
}
}