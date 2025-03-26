package com.studentmanagment.teacher_service.controller;

import com.studentmanagment.teacher_service.TeacherRepository;
import com.studentmanagment.teacher_service.model.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teachers")
public class TeacherController {
    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Teacher> createTeacher(@RequestBody Teacher teacher) {
        Teacher savedTeacher = teacherRepository.save(teacher);
        kafkaTemplate.send("teacher-events", "Teacher created: " + savedTeacher.getId());
        return ResponseEntity.ok(savedTeacher);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Teacher> getTeacherById(@PathVariable Long id) {
        return teacherRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
