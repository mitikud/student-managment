package com.studentmanagment.course_service.service;

import com.studentmanagment.course_service.entity.Course;
import com.studentmanagment.course_service.repo.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {
    @Autowired
    private CourseRepository courseRepository;

    @KafkaListener(topics = "student-enrollment", groupId = "course-group")
    public void handleEnrollment(String message) {
        String[] parts = message.split(":");
        Long studentId = Long.parseLong(parts[0]);
        Long courseId = Long.parseLong(parts[1]);
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        if (!course.getStudentIds().contains(studentId)) {
            course.getStudentIds().add(studentId);
            courseRepository.save(course);
        }
    }
}
