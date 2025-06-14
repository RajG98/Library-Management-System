package com.project.DigitalLibraryManagement.service;

import com.project.DigitalLibraryManagement.exception.ResourceNotFoundException;
import com.project.DigitalLibraryManagement.model.Member;
import com.project.DigitalLibraryManagement.repo.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {
    @Autowired
    private MemberRepository repo;

    public List<Member> findAll() {
        return repo.findAll();
    }

    public Member add(Member member) {
        return repo.save(member);
    }

    public Member update(Member member, int id) {
        Member m = repo.findById(id).orElseThrow(()->new ResourceNotFoundException("No member with such id exists!"));
        m.setEmail(member.getEmail());
        m.setPhone(member.getPhone());
        m.setFirstName(member.getFirstName());
        m.setLastName(member.getLastName());
        m.setValidTill(member.getValidTill());

        return repo.save(m);
    }

    public void delete(int id) {
        repo.deleteById(id);
    }


    public List<Member> findMemberByName(String memberName) {
        return repo.findByName(memberName).orElse(null);
    }

    public Member getMemberById(String id) {
        return repo.findById(Integer.parseInt(id)).orElseThrow(()->new ResourceNotFoundException("No member with such id exists!"));
    }
}
