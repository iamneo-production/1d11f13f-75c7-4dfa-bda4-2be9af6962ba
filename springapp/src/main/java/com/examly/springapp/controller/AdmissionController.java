package com.examly.springapp.controller;

import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.examly.springapp.model.Admission;
import com.examly.springapp.service.AdmissionService;

@RestController
@CrossOrigin("https://8081-bdfdeabfecfbcefbeacfaceadbffaabaebdcec.project.examly.io")
public class AdmissionController {
    
    @Autowired
    private static AdmissionService admissionService;

    public AdmissionController(AdmissionService admissionService){
        this.admissionService = admissionService;
    }

    @PostMapping("/admission")
    public ResponseEntity<Admission> saveStudent(@RequestParam("pdfFile") MultipartFile pdfFile, Admission student) {
        try {
            byte[] fileData;
            try (InputStream inputStream = pdfFile.getInputStream()) {
                fileData = inputStream.readAllBytes();
            }

            // Set the PDF content in the student object
            student.setRequiredDocuments(fileData);

            // Save the student object in the database
            Admission savedStudent = admissionService.create(student);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedStudent);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PutMapping("/acceptRejectApplication/{id}")
    public ResponseEntity<?> updateDocumentStatus(@PathVariable int id, @RequestBody Admission student) {
    	String status = student.getStatus();
        Admission updatedStudent = admissionService.updateDocumentStatus(id, status);
        if (updatedStudent != null) {
            return ResponseEntity.ok("Application status updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating application status.");
        }
    }
    @GetMapping("/getall")
    public ResponseEntity<List<Admission>> getAllStudents() {
        List<Admission> students = admissionService.findAll();
        return ResponseEntity.ok(students);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<Admission> getStudentById(@PathVariable int id) {
        Optional<Admission> student = admissionService.findById(id);
        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
