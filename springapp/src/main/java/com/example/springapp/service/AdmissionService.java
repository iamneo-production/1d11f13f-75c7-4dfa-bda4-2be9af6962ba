package com.example.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.Admission;
import com.example.springapp.repository.AdmissionRepo;


@Service
public class AdmissionService {

    @Autowired
    private static AdmissionRepo admissionRepo;


    public AdmissionService (AdmissionRepo admissionRepo) {
        AdmissionService.admissionRepo = admissionRepo;
    }
    
    public Admission create(Admission admission) {
        return admissionRepo.save(admission);
    }
    
}
