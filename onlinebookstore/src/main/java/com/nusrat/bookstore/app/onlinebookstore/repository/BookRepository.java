package com.nusrat.bookstore.app.onlinebookstore.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

import com.nusrat.bookstore.app.onlinebookstore.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
	
	@RestResource(path = "categoryid")
	Page<Book> findByCategoryId(@Param("id") Long id, Pageable pageable);
	
	@RestResource(path = "searchBykeyword")
	Page<Book> findByNameContaining(@Param("name") String keyword, Pageable pageable);

}
