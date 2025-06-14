package com.project.DigitalLibraryManagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Members")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id",insertable = false,updatable = false)
    private int id;
    @Column(name = "first_name",nullable = false)
    private String firstName;
    @Column(name = "last_name",nullable = false)
    private String lastName;
    private String phone;
    @Column(nullable = false)
    private String email;
    @Column(name = "created_at",updatable = false)
    private LocalDate createdAt=LocalDate.now();
    @Column(name = "valid_till")
    private LocalDate validTill=createdAt.plusYears(1);
    @JsonIgnore
    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Issue> issues;

}
