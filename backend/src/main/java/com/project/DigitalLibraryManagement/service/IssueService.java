package com.project.DigitalLibraryManagement.service;

import com.project.DigitalLibraryManagement.enums.IssuedStatus;
import com.project.DigitalLibraryManagement.exception.ResourceNotFoundException;
import com.project.DigitalLibraryManagement.model.Issue;
import com.project.DigitalLibraryManagement.repo.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class IssueService {
    @Autowired
    private IssueRepository repo;
    private static final double FINE_AMOUNT=10.0;


    public List<Issue> getIssuesForBook(int id, String memberId) {
        if(memberId.isEmpty() ) return repo.findByBookId(id).orElseThrow(()-> new ResourceNotFoundException("No such issues found"));
        return repo.findIssues(id,memberId).orElseThrow(()-> new ResourceNotFoundException("No such issues found"));
    }

    public Issue issueBook(Issue issue) {
        if(issue.getIssueDate()==null)
            issue.setIssueDate(LocalDate.now());
        else issue.setDueDate(issue.getIssueDate().plusDays(15));
        return repo.save(issue);
    }

    public List<Issue> updateIssue(String memberId, int bookId) {
        List<Issue> issues= repo.findByMemberAndBookId(memberId,bookId).orElseThrow(()-> new ResourceNotFoundException("No such issue found!"));
        for(Issue issue:issues){
        issue.setIssuedStatus(IssuedStatus.RETURNED);
        issue.setReturnDate(LocalDate.now());
        repo.save(issue);}
        return issues;
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void calculateFines(){
        List<Issue> issues= repo.findAll();
        LocalDate today= LocalDate.now();
        for(Issue issue : issues){
            if(issue.getReturnDate()==null){
                LocalDate dueDate= issue.getIssueDate().plusDays(15);
                if(today.isAfter(dueDate)){
                    long overdue= ChronoUnit.DAYS.between(dueDate,today);
                    double fine = overdue*FINE_AMOUNT;
                    System.out.println(fine);
                    issue.setFine(fine);
                    repo.save(issue);
                }
            }
        }
    }

    public Issue updateAnIssue(int id, Issue i) {
        Issue issue= repo.findById(id).orElseThrow(()-> new ResourceNotFoundException("No such issue found!"));
        issue.setFine(i.getFine());
        issue.setDueDate(i.getDueDate());
        issue.setIssuedStatus(i.getIssuedStatus());
        issue.setIssueDate(i.getIssueDate());
        issue.setReturnDate(i.getReturnDate());
        return repo.save(issue);
    }

    public Issue getIssueForId(int issueId) {
        return repo.findById(issueId).orElseThrow(()-> new ResourceNotFoundException("No such issue found!"));
    }

    public List<Issue> getIssueForMemberId(String memberId,String id) {
        return repo.findByMemberId(memberId,id).orElse(null);
    }
}
