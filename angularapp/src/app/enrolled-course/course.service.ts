import { Injectable } from '@angular/core';

interface Course {
  name: string;
  description: string;
  duration: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  enrolledCourses: Course[] = [
    {
      name: 'Java',
      description: 'Learn the popular Java programming language and build robust applications.',
      duration: '8 Weeks'
    },
    {
      name: 'Python',
      description: 'Explore the versatile Python programming language for various applications.',
      duration: '12 Weeks'
    },
    {
      name: 'Angular',
      description: 'Master the Angular framework and build dynamic web applications.',
      duration: '10 Weeks'
    },
    {
      name: 'React',
      description: 'Learn React for building interactive user interfaces and single-page applications.',
      duration: '8 Weeks'
    },
    {
      name: 'Spring Boot',
      description: 'Develop stand-alone, production-grade Spring applications that you can "just run".',
      duration: '12 Weeks'
    },
    {
      name: 'MySQL',
      description: 'The world\'s most popular open-source relational database management system.',
      duration: '10 Weeks'
    },
  ];

  deletedCourses: Course[] = [];

  constructor() { }

  getEnrolledCourses(): Course[] {
    return this.enrolledCourses;
  }
}
