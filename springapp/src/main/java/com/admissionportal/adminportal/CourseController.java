package com.admissionportal.adminportal;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
// import com.admissionportal.adminportal.CourseRepository;

@RestController
// @RequestMapping("/")
//  @GetMapping
@CrossOrigin(origins = "http://localhost:4200")
public class CourseController {
    
    //inject repository file
    @Autowired
    private CourseRepository courseRepository;
    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }
    
    
    @GetMapping("/courses")
   public List<CourseModel> getAllCourses() {
        return courseRepository.findAll();
    }
    @PostMapping("/courses")
    public CourseModel createCourse(@RequestBody CourseModel courseModel){
        return courseRepository.save(courseModel);
    }

    @GetMapping("/courses/{id}")
    public ResponseEntity<CourseModel> getCourseById(@PathVariable long id){
        CourseModel course = courseRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(course);
    }


    @PutMapping("/courses/{id}")
    public ResponseEntity<CourseModel> updateCourse(@PathVariable long id, @RequestBody CourseModel coursedetails){
       

        CourseModel course = courseRepository.findById(id).orElseThrow();
        course.setCoursename(coursedetails.getCoursename());
        course.setCoursedescription(coursedetails.getCoursedescription());
        course.setCourseduration(coursedetails.getCourseduration());

        CourseModel updatedCourse = courseRepository.save(course);
        return ResponseEntity.ok(updatedCourse);

    }
    @DeleteMapping("/courses/{id}")
    public ResponseEntity <Map<String, Boolean>> deleteCourse(@PathVariable long id){
       
         CourseModel course = courseRepository.findById(id).orElseThrow();
         courseRepository.delete(course);
        Map<String,Boolean> response=new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
