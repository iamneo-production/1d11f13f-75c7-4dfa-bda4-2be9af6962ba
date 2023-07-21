package com.admissionportal.adminportal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="courseview")
public class CourseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int courseid;

    @Column(name="coursename")
    private String coursename;

     @Column(name="coursedescription")
    private String coursedescription;

     @Column(name="courseduration")
    private String courseduration;
    
    //constructor
    public CourseModel() {
    }
    public CourseModel(int courseid, String coursename, String coursedescription, String courseduration) {
        this.courseid = courseid;
        this.coursename = coursename;
        this.coursedescription = coursedescription;
        this.courseduration = courseduration;
    }

    //getter & setter
    public int getId() {
        return courseid;
    }
    public void setId(int courseid) {
        this.courseid = courseid;
    }
    public String getCoursename() {
        return coursename;
    }
    public void setCoursename(String coursename) {
        this.coursename = coursename;
    }
    public String getCoursedescription() {
        return coursedescription;
    }
    public void setCoursedescription(String coursedescription) {
        this.coursedescription = coursedescription;
    }
    public String getCourseduration() {
        return courseduration;
    }
    public void setCourseduration(String courseduration) {
        this.courseduration = courseduration;
    }


    @Override
    public String toString() {
        return "CourseModel [id=" + courseid + ", coursename=" + coursename + ", coursedescription=" + coursedescription
                + ", courseduration=" + courseduration + "]";
    }
    

}
