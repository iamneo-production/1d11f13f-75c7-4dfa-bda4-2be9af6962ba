package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Admission;
import com.examly.springapp.repository.AdmissionRepo;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


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
    public Admission getById(int id) {
        return admissionRepo.findById(id).orElse(null);
    }

	public Optional<Admission> findById(int id) {
		// TODO Auto-generated method stub
		return admissionRepo.findById(id);
	}

	public List<Admission> findAll() {
		// TODO Auto-generated method stub
		return admissionRepo.findAll();
	}


	public Admission updateDocumentStatus(int id, String status) {
		Admission student=getById(id);
		if(student != null) {
			student.setStatus(status);
			return admissionRepo.save(student);
		}
		else {
			return null;
		}
		
	}
    
}
