package com.project.DigitalLibraryManagement.controller;

import com.project.DigitalLibraryManagement.exception.UnauthorizedException;
import com.project.DigitalLibraryManagement.model.Member;
import com.project.DigitalLibraryManagement.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {
    @Autowired
    private MemberService service;
    @GetMapping("/{id}/secure-endpoint")
    public ResponseEntity<Member> getMemberById(@PathVariable String id){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String role=authentication.getAuthorities().toString();
        if(role.contains("ROLE_ADMIN")) {
        Member member= service.getMemberById(id);
        return new ResponseEntity<>(member, HttpStatus.OK);
        }else if(role.contains("ROLE_USER")){
            throw new UnauthorizedException("You are not authorized to access this resource");
        }
        throw new UnauthorizedException("User role not recognized");
    }
    @GetMapping("/search")
    public ResponseEntity<List<Member>> getMemberByName(@RequestParam(value = "name",defaultValue = "") String memberName){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String role=authentication.getAuthorities().toString();
        if(role.contains("ROLE_ADMIN")) {
        List<Member> member= service.findMemberByName(memberName);
        return new ResponseEntity<>(member,HttpStatus.OK);
        }else if(role.contains("ROLE_USER")){
            throw new UnauthorizedException("You are not authorized to access this resource");
        }
        throw new UnauthorizedException("User role not recognized");
    }
    @GetMapping("/secure-endpoint")
    public ResponseEntity<List<Member>> getMembers(){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String role=authentication.getAuthorities().toString();
        if(role.contains("ROLE_ADMIN")) {
            List<Member> members =service.findAll();
            return new ResponseEntity<>(members, HttpStatus.OK);
        }else if(role.contains("ROLE_USER")){
            throw new UnauthorizedException("You are not authorized to access this resource");
        }
        throw new UnauthorizedException("User role not recognized");
    }
    @PostMapping("/secure-endpoint")
    public ResponseEntity<Member> addMembers(@RequestBody Member member){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String role = authentication.getAuthorities().toString();
        if(role.contains("ROLE_ADMIN")) {
            Member m = service.add(member);
            return new ResponseEntity<>(m, HttpStatus.CREATED);
        }else if(role.contains("ROLE_USER")){
            throw new UnauthorizedException("You are not authorized to access this resource");
        }
        throw new UnauthorizedException("User role not recognized");
    }
    @PutMapping("/{id}/secure-endpoint")
    public ResponseEntity<Member> updateMember(@RequestBody Member member, @PathVariable int id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String role= authentication.getAuthorities().toString();
        if(role.contains("ROLE_ADMIN")) {
            Member m = service.update(member, id);
            return new ResponseEntity<>(m, HttpStatus.OK);
        }else if(role.contains("ROLE_USER")){
            throw new UnauthorizedException("You are not authorized to access this resource");
        }
        throw new UnauthorizedException("User role not recognized");
    }
    @DeleteMapping("/{id}/secure-endpoint")
    public ResponseEntity<Void> deleteMember(@PathVariable int id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String role= authentication.getAuthorities().toString();
        if(role.contains("ROLE_ADMIN")) {
            service.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else if(role.contains("ROLE_USER")){
            throw new UnauthorizedException("You are not authorized to access this resource");
        }
        throw new UnauthorizedException("User role not recognized");
    }
}
