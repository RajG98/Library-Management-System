package com.project.DigitalLibraryManagement.repo;

import com.project.DigitalLibraryManagement.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Integer> {
    @Query("SELECT m FROM Member m WHERE m.firstName LIKE %:memberName% OR m.lastName LIKE %:memberName%")
    Optional<List<Member>> findByName(@Param("memberName") String memberName);
}
