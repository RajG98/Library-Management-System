package com.project.DigitalLibraryManagement.repo;

import com.project.DigitalLibraryManagement.dto.BookReportDTO;
import com.project.DigitalLibraryManagement.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ReportRepository extends PagingAndSortingRepository<Issue,Integer> {
    @Query("SELECT new com.project.DigitalLibraryManagement.dto.BookReportDTO(b.title,b.author,i.issueDate,i.dueDate,COALESCE(i.fine, 0)) "
    +"FROM Issue i "
    +"LEFT JOIN i.book b "
    +"WHERE i.issuedStatus='ISSUED' "
    +"ORDER BY i.issueDate DESC")
    List<BookReportDTO>  generateReport();
}

