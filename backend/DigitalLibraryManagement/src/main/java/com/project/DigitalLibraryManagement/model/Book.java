package com.project.DigitalLibraryManagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.project.DigitalLibraryManagement.enums.Genre;
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
@Table(name = "Books")
public class Book {
    @Id
    @Column(name = "book_id",insertable = false,updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String author;
    @Enumerated(EnumType.STRING)
    private Genre genre;
    @Column(name = "publication_year")
    private int publicationYear;
    private double price;
    @Column(name = "quantity_in_stock")
    private int quantity;
    @Column(name = "created_at" ,updatable = false)
    private LocalDate createdAt=LocalDate.now();
    @Column(name = "updated_at")
    private LocalDate updatedAt= LocalDate.now();
    @JsonIgnore
    @OneToMany(mappedBy = "book",cascade = CascadeType.REMOVE)
    private List<Issue> issues;
}
