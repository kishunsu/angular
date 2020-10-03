import { Component, OnInit } from '@angular/core';
import { products } from '../../products';
import { ProductService } from '../shared/products.service';

@Component({
  selector: 'app-product-listings',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.scss']
})
export class ProductListComponent implements OnInit {

  products: any;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();

    const productObservable = this.productService.getProducts();
    productObservable.subscribe(
      (data) => {
        this.products = data;
      },
      (err) => { console.error('something wrong occurred: ' + err); }
    );
  }

}
