package com.project.DigitalLibraryManagement.service;

import com.project.DigitalLibraryManagement.enums.Genre;
import com.project.DigitalLibraryManagement.exception.ResourceNotFoundException;
import com.project.DigitalLibraryManagement.model.Book;
import com.project.DigitalLibraryManagement.model.Issue;
import com.project.DigitalLibraryManagement.repo.BookRepository;
import com.project.DigitalLibraryManagement.repo.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookRepository repo;
    @Autowired
    private IssueRepository issueRepository;

    public List<Book> findAll(String search) {
        if(!search.isEmpty())return repo.findByTitle(search);
        else return repo.findAll();
    }

    public Book add(Book book) {
        return repo.save(book);
    }

    public Book update(Book book, int id) {
        Book b = repo.findById(id).orElse(null);
        if(b==null)
            return null;
        b.setAuthor(book.getAuthor());
        b.setGenre(book.getGenre());
        b.setPrice(book.getPrice());
        b.setTitle(book.getTitle());
        b.setQuantity(book.getQuantity());
        b.setUpdatedAt(book.getUpdatedAt());
        b.setPublicationYear(book.getPublicationYear());
        return repo.save(b);
    }

    public void delete(int id) {
        Issue isIssued = issueRepository.existsByBook_Id(id);
        if (isIssued!=null ) {
            throw new IllegalStateException("Cannot delete book: It is currently issued.");
        }
        repo.deleteById(id);
    }

    public List<Genre> getCategories() {
        return Arrays.asList(Genre.values());
    }

    public List<Book> getBookByCategory(Genre category) {

        return repo.getBookByCategory(category);
    }

    public Book findById(int id) {
        return repo.findById(id).orElse(null);
    }

    public void increaseQty(int id) {
        Book b= repo.findById(id).orElseThrow(()->new ResourceNotFoundException("User not found"));
        b.setQuantity(b.getQuantity()+1);
        repo.save(b);
    }

    public void decreaseQty(int id) {
        Book b= repo.findById(id).orElseThrow(()->new ResourceNotFoundException("User not found"));
        b.setQuantity(b.getQuantity()-1);
        repo.save(b);
    }
}
