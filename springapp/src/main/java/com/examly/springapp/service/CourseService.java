package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import com.examly.springapp.model.Course;
import com.examly.springapp.repository.CourseRepo;
// import main.java.com.example.springapp.model.Course;
// import main.java.com.example.springapp.repository.CourseRepo;

@Service
public class CourseService {

    private static CourseRepo courseRepo;

    public CourseService(CourseRepo courseRepo) {
        this.courseRepo = courseRepo;
    }

    public static List<Course> getAllCourse() {
        return courseRepo.findAll();
    }

    public Course addCourse(Course course) {
        return courseRepo.save(course);
    }

    public Optional<Course> getCourseById(int id) {
        return courseRepo.findById(id);
    }

    public Course updateCourse(int id, Course course) {
        return courseRepo.save(course);
    }

    public void deleteCourse(Course course) {
        courseRepo.delete(course);
    }

}