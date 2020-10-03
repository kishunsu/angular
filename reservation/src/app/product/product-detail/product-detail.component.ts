import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  headItem: any = [1, 2, 3];
  product;
  constructor(
    private reoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.reoute.paramMap.subscribe(param => {
      const productObservable = this.productService.getProductById(param.get('productId'));
      productObservable.subscribe(
        (data) => {
          this.product = data;

        },
        (err) => {

        }
      )
    }
      // this.product = this.productService.getProductById(param.get('productId')));
    );

  }

}
