import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTextarea, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  @ViewChild("observationTextArea") observationTextArea:IonTextarea
  
  public qntItem:number = 1
  
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private navController: NavController
    ) { }

  public order

  ngOnInit() {
    this.route.fragment.subscribe(
      x=> {
        this.order = x
        this.qntItem = this.order.qntItem
      }
    )
  }

  public updateQuantity(qntItem){
    this.qntItem = qntItem;
  }

  public updateItemInCart(){
    let orderItem:Order = new Order();
    orderItem.product = this.order.product;
    orderItem.qntItem = this.qntItem;
    orderItem.observation = this.observationTextArea.value
    this.cartService.updateItemIntoCart(orderItem)
    this.navController.back()
  }
}