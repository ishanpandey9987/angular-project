import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Smartphone X',
      description: 'Latest flagship smartphone with high-end specifications and features.',
      price: 799.99,
      imageUrl: 'assets/images/mobile.png'
    },
    {
      id: 2,
      name: 'Laptop Pro',
      description: 'Professional grade laptop with top-tier performance for developers and creators.',
      price: 1299.99,
      imageUrl: 'assets/images/laptop.png'
    },
    {
      id: 3,
      name: 'Wireless Headphones',
      description: 'Premium noise-cancelling wireless headphones with long battery life.',
      price: 249.99,
      imageUrl: 'assets/images/headphone.png'
    },
    {
      id: 4,
      name: 'Smartwatch',
      description: 'Feature-packed smartwatch with health tracking and notifications.',
      price: 199.99,
      imageUrl: 'assets/images/watch.png'
    },
    {
      id: 5,
      name: 'Tablet Ultra',
      description: 'Thin and lightweight tablet with a stunning display for productivity and entertainment.',
      price: 499.99,
      imageUrl: 'assets/images/tablet.png'
    }
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    // Simulate getting products from an API
    return of(this.products);
  }

  getProduct(id: number): Observable<Product | undefined> {
    // Simulate getting a single product from an API
    const product = this.products.find(p => p.id === id);
    return of(product);
  }
}
