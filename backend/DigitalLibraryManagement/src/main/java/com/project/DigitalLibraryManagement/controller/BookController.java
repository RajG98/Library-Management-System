package com.project.DigitalLibraryManagement.controller;

import com.project.DigitalLibraryManagement.enums.Genre;
import com.project.DigitalLibraryManagement.exception.ResourceNotFoundException;
import com.project.DigitalLibraryManagement.exception.UnauthorizedException;
import com.project.DigitalLibraryManagement.model.Book;
import com.project.DigitalLibraryManagement.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookController {
    @Autowired
    private BookService service;



    @GetMapping("/books")
    public ResponseEntity<List<Book>> getBooks(@RequestParam(defaultValue = "") String search){
        List<Book> b = service.findAll(search);

        return new ResponseEntity<>(b,HttpStatus.OK);
    }
    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable int id){
        Book b= service.findById(id);
        if(b==null) throw new ResourceNotFoundException("No book found!");
        return new ResponseEntity<>(b,HttpStatus.OK);
    }
    @GetMapping("/books/categories")
    public ResponseEntity<List<Genre>> getCategories(){
        return new ResponseEntity<>(service.getCategories(),HttpStatus.OK);
    }
    @GetMapping("/books/categories/{category}")
    public ResponseEntity<List<Book>> getBookByCategory(@PathVariable Genre category){
        return new ResponseEntity<>(service.getBookByCategory(category),HttpStatus.OK);
    }


    @PostMapping("/books/secure-endpoint")
    public ResponseEntity<Book> addBooks(@RequestBody Book book){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String role= authentication.getAuthorities().toString();
        if(role.contains("ROLE_ADMIN")) {
            Book b = service.add(book);
            return new ResponseEntity<>(b, HttpStatus.CREATED);
        }else if(role.contains("ROLE_USER")){
            throw new UnauthorizedException("You are not authorized to access this resource");
        }
        throw new UnauthorizedException("User role not recognized");
    }
    @PutMapping("/books/{id}/secure-endpoint")
    public ResponseEntity<Book> updateBooks(@PathVariable int id, @RequestBody Book book){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String role= authentication.getAuthorities().toString();
        if(role.contains("ROLE_ADMIN")) {
            Book b = service.update(book, id);
            if (b != null)
                return new ResponseEntity<>(b, HttpStatus.OK);
            else
                throw new ResourceNotFoundException("No books found with id: " + id);
        }else if(role.contains("ROLE_USER")){
            throw new UnauthorizedException("You are not authorized to access this resource");
        }
        throw new UnauthorizedException("User role not recognized");
    }
    @PutMapping("/books/{id}/quantity/{action}")
    public ResponseEntity<Void> updateQuantity(@PathVariable String action, @PathVariable int id) {
        if ("increase".equalsIgnoreCase(action)) {
            service.increaseQty(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else if ("decrease".equalsIgnoreCase(action)) {
            service.decreaseQty(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        throw new ResourceNotFoundException("Cannot process request");
    }
    @DeleteMapping("/books/{id}/secure-endpoint")
    public ResponseEntity<Void> deleteBooks(@PathVariable int id){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
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
