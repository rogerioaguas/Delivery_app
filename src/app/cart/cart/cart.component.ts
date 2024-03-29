import { Component, OnInit, AfterViewInit, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../cart.service';
import { Order } from 'src/app/models/order.model';
import { ChipEnum } from 'src/app/enums/chip.enum';
import { Router } from '@angular/router';
import {Address} from '../../models/address.model';
import {ViewWillEnter} from "@ionic/angular";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements AfterViewInit{

  public cartList: Order[] = [];
  public message = 'Não há nenhum produto no carrinho';
  public messageAction = 'Ir para cardápio';
  public isEmpty = true;
  private addresses: Address[] = [];

  constructor(
    private cartService: CartService,
    private route: Router,
    private changeDetectorRef: ChangeDetectorRef) {
   }

  async ngAfterViewInit() {
    this.cartList = this.cartService.cartList;
    this.addresses = await this.cartService.getAddressList();
    this.isEmpty = this.isEmptyCart();
    this.cartService.getCartList().subscribe(cartList => {
      this.cartList = cartList;
      this.isEmpty = this.isEmptyCart();
      this.changeDetectorRef.detectChanges();
    });
  }

  public async goToAddress() {
    await this.route.navigate(['address-list']);
  }

  private isEmptyCart(){
    return this.cartList.length == 0;
  }



  public nextStep(){

  }

}
