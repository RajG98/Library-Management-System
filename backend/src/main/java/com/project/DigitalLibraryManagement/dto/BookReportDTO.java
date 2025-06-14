package com.project.DigitalLibraryManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookReportDTO {
    private String title;
    private String authorName;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private double fineAmount;
}
