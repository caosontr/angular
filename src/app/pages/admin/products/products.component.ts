import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProductAdmin } from '../../../types/Product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, RouterLink, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  readonly productService = inject(ProductService);

  productList: ProductAdmin[] = [];
  searchKeyword: string = '';

  ngOnInit(): void {
    this.productService
      .getProductListAdmin()
      .subscribe({
        next: (products) => {
          this.productList = products;
        },
        error: (error) => console.error('Error fetching products', error)
      });
  }

  get filteredProducts(): ProductAdmin[] {
    if (!this.searchKeyword) {
      return this.productList;
    } else {
      return this.productList.filter(product =>
        product.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }
  }

  handleDeleteProduct(id: string): void {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      this.productService
        .deleteProductById(id)
        .subscribe({
          next: () => {
            this.productList = this.productList.filter(
              (product) => product._id !== id
            );
          },
          error: (error) => console.error('Lỗi', error)
        });
    }
  }
}
