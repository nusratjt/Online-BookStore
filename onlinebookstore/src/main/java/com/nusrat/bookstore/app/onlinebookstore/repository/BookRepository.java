package com.nusrat.bookstore.app.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nusrat.bookstore.app.onlinebookstore.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
