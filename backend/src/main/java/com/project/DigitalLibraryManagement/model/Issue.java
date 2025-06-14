package com.project.DigitalLibraryManagement.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.DigitalLibraryManagement.enums.IssuedStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Issues")
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "issue_id",insertable = false,updatable = false)
    private int id;
    @ManyToOne
    @JoinColumn(name = "book_id",nullable = false)

    private Book book;
    @ManyToOne
    @JoinColumn(name = "member_id",nullable = false)

    private Member member;
    @Column(name = "issue_date",nullable = false)
    private LocalDate issueDate=LocalDate.now();
    @Column(name = "due_date")
    private LocalDate dueDate=issueDate.plusDays(15);
    @Column(name = "return_date")
    private LocalDate returnDate;
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private IssuedStatus issuedStatus;
    @Column(name = "fine_due")
    private double fine=0.0;
}
