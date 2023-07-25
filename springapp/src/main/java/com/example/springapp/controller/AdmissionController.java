package com.example.springapp.controller;

import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.springapp.model.Admission;
import com.example.springapp.service.AdmissionService;

@RestController
@RequestMapping("/admission")
@CrossOrigin("https://8081-bdfdeabfecfbcefbeacfaceadeaeaadbdbabf.project.examly.io")
public class AdmissionController {
    
    @Autowired
    private static AdmissionService admissionService;

    public AdmissionController(AdmissionService admissionService){
        this.admissionService = admissionService;
    }

    @PostMapping
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
}
