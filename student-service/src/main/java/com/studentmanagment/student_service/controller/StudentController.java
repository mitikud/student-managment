package com.studentmanagment.student_service.controller;

import com.studentmanagment.student_service.entity.Student;
import com.studentmanagment.student_service.repo.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Student> createStudent(@Valid @RequestBody Student student) {
        Student savedStudent = studentRepository.save(student);
        kafkaTemplate.send("student-events", "Student created: " + savedStudent.getId());
        return ResponseEntity.ok(savedStudent);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return studentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}