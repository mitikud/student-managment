package com.studentmanagment.course_service.controller;

import com.studentmanagment.course_service.entity.Course;
import com.studentmanagment.course_service.repo.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course savedCourse = courseRepository.save(course);
        kafkaTemplate.send("course-events", "Course created: " + savedCourse.getId());
        return ResponseEntity.ok(savedCourse);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/enroll/{studentId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> enrollStudent(@PathVariable Long id, @PathVariable Long studentId) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.getStudentIds().add(studentId);
        courseRepository.save(course);
        kafkaTemplate.send("student-enrollment", studentId + ":" + id);
        return ResponseEntity.ok("Student enrolled");
    }
}
