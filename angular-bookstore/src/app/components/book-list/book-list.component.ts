import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  previousCategory: number = 1;

  // new properties for server-side pagination
  currentPage: number = 1;
  pageSize: number = 2;
  totalRecords: number = 0;

  constructor(private _bookService: BookService,
              private _activatedRoute: ActivatedRoute,
              private _cartService: CartService,
              _config: NgbPaginationConfig) {
                _config.maxSize = 2;
                _config.boundaryLinks = true;
               }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(()=>{
      this.listBooks();
    })
  }

  listBooks(){
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      //do search work
      this.handleSearchBooks();
    }else{
      //display books based on category
      this.handleListBooks();
    }
    
  }

  handleListBooks(){
    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    }else{
      this.currentCategoryId = 1;
    }

    //setting up the current page number to 1
    //if user navigates to other category
    if(this.previousCategory != this.currentCategoryId){
      this.currentPage = 1;
    }
    this.previousCategory = this.currentCategoryId;
    
    this._bookService.getBooks(this.currentCategoryId,
                               this.currentPage - 1,
                               this.pageSize)
                               .subscribe(
                                 this.processPaginate());
  }

  handleSearchBooks(){
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');
    this._bookService.searchBooks(keyword,
                                  this.currentPage - 1,
                                  this.pageSize)
                                  .subscribe(this.processPaginate());    
  }

  updatePageSize(pageSize: number){
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBooks();

  }

  processPaginate(){
    return data=>{
      this.books = data._embedded.books;
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }

  addToCart(book: Book){
    console.log(`book name: ${book.name} and ${book.unitPrice}`);
    const cartItem = new CartItem(book);
    this._cartService.addToCart(cartItem);
  }

}
