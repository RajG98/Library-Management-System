package com.project.DigitalLibraryManagement.service;

import com.project.DigitalLibraryManagement.dto.BookReportDTO;
import com.project.DigitalLibraryManagement.repo.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {
    @Autowired
    ReportRepository repo;

    public List<BookReportDTO> generateReport() {
        return repo.generateReport();
    }
}
