package com.studentmanagment.course_service.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Long teacherId;

    @ElementCollection
    private List<Long> studentIds = new ArrayList<>();

    // Getters, Setters, Constructors
}
