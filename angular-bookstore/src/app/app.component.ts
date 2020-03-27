import { Component } from '@angular/core';
import { Book } from './common/book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  books:Book[] = [
    {
      sku: "text-100",
      name: "C Programming Language",
      description: "Learn C Programming Language",
      unitPrice: 600,
      imageUrl: "assets/images/books/text-100.png",
      active: true,
      unitsInStock: 100,
      createdOn: new Date(),
      updatedOn: null,
    },
    {
      sku: "text-101",
      name: "C# Crash Course",
      description: "Learn C# Programming Language",
      unitPrice: 900,
      imageUrl: "assets/images/books/text-101.png",
      active: true,
      unitsInStock: 100,
      createdOn: new Date(),
      updatedOn: null,
    },
    {
      sku: "text-102",
      name: "C++ Crash Course",
      description: "Learn C++ Programming Language",
      unitPrice: 700,
      imageUrl: "assets/images/books/text-102.png",
      active: true,
      unitsInStock: 100,
      createdOn: new Date(),
      updatedOn: null,
    }
  ]
}
