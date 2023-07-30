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
      description: 'Learn Java programming',
      duration: '8 Weeks'
    },
    {
      name: 'Python',
      description: 'Explore Python programming',
      duration: '12 Weeks'
    },
    {
      name: 'Angular',
      description: 'Master the Angular framework',
      duration: '10 Weeks'
    },
    {
      name: 'React',
      description: 'Learn single-page applications.',
      duration: '8 Weeks'
    },
    {
      name: 'Spring Boot',
      description: 'Develop stand-alone applications',
      duration: '12 Weeks'
    },
    {
      name: 'MySQL',
      description: 'Learn relational database management system',
      duration: '10 Weeks'
    },
  ];

  deletedCourses: Course[] = [];

  constructor() { }

  getEnrolledCourses(): Course[] {
    return this.enrolledCourses;
  }
}
