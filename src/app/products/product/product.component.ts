import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  public qntItem:number = 1

  constructor(private route: ActivatedRoute) { }

  public product
  ngOnInit() {
    this.route.fragment.subscribe(
      x=> {
        this.product = x
        console.log(this.product.name)
      }
    )
  }

  public updateQuantity(qntItem){
    this.qntItem = qntItem;
  }
}
