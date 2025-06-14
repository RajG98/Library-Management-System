package com.project.DigitalLibraryManagement.repo;

import com.project.DigitalLibraryManagement.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IssueRepository extends JpaRepository<Issue,Integer> {
    @Query("SELECT i FROM Issue i WHERE i.book.id=:book_id AND i.member.id=:member_id")
    public Optional<List<Issue>> findIssues(@Param("book_id") int id, @Param("member_id") String memberID);

    @Query("SELECT i FROM Issue i WHERE i.book.id=:book_id")
    public Optional<List<Issue>> findByBookId(@Param("book_id") int id);

    @Query("SELECT i FROM Issue i WHERE i.member.id=:member_id AND i.book.id=:book_id")
    public Optional<List<Issue>> findByMemberAndBookId(@Param("member_id") String memberId,@Param("book_id") int bookId);
    @Query("SELECT i FROM Issue i WHERE i.member.id=:member_id AND i.issuedStatus<>'RETURNED' AND i.book.id=:id")
    public Optional<List<Issue>> findByMemberId(@Param("member_id") String memberId,@Param("id") String id);
    @Query("SELECT i FROM Issue i WHERE i.issuedStatus<>'RETURNED' AND i.book.id=:id")
    public Issue existsByBook_Id(int id);

}
