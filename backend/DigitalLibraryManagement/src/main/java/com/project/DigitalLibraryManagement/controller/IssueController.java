package com.project.DigitalLibraryManagement.controller;

import com.project.DigitalLibraryManagement.exception.ResourceNotFoundException;
import com.project.DigitalLibraryManagement.model.Book;
import com.project.DigitalLibraryManagement.model.Issue;
import com.project.DigitalLibraryManagement.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class IssueController {
    @Autowired
    private IssueService service;
    @GetMapping("/{id}/issues")
    public ResponseEntity<List<Issue>> getIssuesForBook(@PathVariable int id,@RequestParam(value = "memberId",defaultValue = "") String memberId){
        List<Issue> books= service.getIssuesForBook(id,memberId);

        return new ResponseEntity<>(books, HttpStatus.OK);
    }
    @GetMapping("/{id}/issues/{issueId}")
    public ResponseEntity<Issue> getIssueForId(@PathVariable int issueId){
        Issue issue= service.getIssueForId(issueId);

        return new ResponseEntity<>(issue, HttpStatus.OK);
    }
    @PostMapping("/{id}/issues")
    public ResponseEntity<Issue> issueBook(@PathVariable int id,@RequestBody Issue i){
        Issue issue=service.issueBook(i);
        return new ResponseEntity<>(issue,HttpStatus.CREATED);
    }
    @PutMapping("/{id}/issues/return")
    public ResponseEntity<List<Issue>> returnBook(@RequestParam(value = "memberId",defaultValue = "") String memberId,@PathVariable int id){
        List<Issue> issues= service.updateIssue(memberId,id);
        return new ResponseEntity<>(issues,HttpStatus.OK);
    }
    @PutMapping("/{id}/issues")
    public ResponseEntity<Issue> updateIssue(@PathVariable int id,@RequestBody Issue i){
        Issue issue= service.updateAnIssue(id,i);
        return new ResponseEntity<>(issue,HttpStatus.OK);
    }
}
