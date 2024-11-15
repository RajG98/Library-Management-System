package com.project.DigitalLibraryManagement.repo;

import com.project.DigitalLibraryManagement.enums.Genre;
import com.project.DigitalLibraryManagement.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book,Integer> {
    @Query("SELECT b FROM Book b WHERE title LIKE %:title%")
    public List<Book> findByTitle(String title);
    @Query("SELECT DISTINCT genre FROM Book")
    public List<Genre> fetchCategories();

    @Query("SELECT b FROM Book b WHERE genre=:genre")
    public List<Book> getBookByCategory(@Param("genre") Genre genre);


}
