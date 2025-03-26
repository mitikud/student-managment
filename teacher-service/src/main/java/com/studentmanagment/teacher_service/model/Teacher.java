package com.studentmanagment.teacher_service.model;

import jakarta.persistence.*;

@Entity
@Table(name = "teachers")

public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;

    // Getters, Setters, Constructors
}