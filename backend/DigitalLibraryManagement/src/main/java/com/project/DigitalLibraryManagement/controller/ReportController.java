package com.project.DigitalLibraryManagement.controller;

import com.project.DigitalLibraryManagement.dto.BookReportDTO;
import com.project.DigitalLibraryManagement.exception.UnauthorizedException;
import com.project.DigitalLibraryManagement.service.ReportService;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/books")
public class ReportController {
    @Autowired
    private ReportService service;
    @GetMapping("/report/secure-endpoint")
    public List<BookReportDTO> getBookReport(){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String role= authentication.getAuthorities().toString();
        if(role.contains("ROLE_ADMIN")){

            return service.generateReport();
        }else if(role.contains("ROLE_USER")){
            throw new UnauthorizedException("You are not authorized to access this resource");
        }
        throw new UnauthorizedException("User role not recognized");
    }
}
