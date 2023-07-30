package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.springapp.model.Course;
// import main.java.com.example.springapp.model.Course;

@Repository
public interface CourseRepo extends JpaRepository<Course, Integer> {
    
}
