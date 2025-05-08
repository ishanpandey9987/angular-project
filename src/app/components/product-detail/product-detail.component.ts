import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  imports: [CommonModule, RouterModule],
  standalone: true
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const idParam = params.get('id');
        if (!idParam) {
          return Promise.reject('Product ID is required');
        }
        const id = parseInt(idParam, 10);
        return this.productService.getProduct(id);
      })
    ).subscribe({
      next: (product) => {
        if (product) {
          this.product = product;
        } else {
          this.error = true;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading product details', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
