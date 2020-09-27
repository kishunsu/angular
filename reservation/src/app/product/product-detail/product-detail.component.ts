import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from '../../products';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  headItem: any = [1, 2, 3];
  product;
  constructor(
    private reoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.reoute.paramMap.subscribe(param =>
      this.product = products[+param.get('productId')]);
  }

}
