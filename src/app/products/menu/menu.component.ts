import { Component, AfterViewInit } from '@angular/core';
import { MenuService } from './menu.service';
import { Menu } from 'src/app/models/menu.model';
import { Router } from '@angular/router';
import {AlertController, LoadingController, ViewWillEnter} from '@ionic/angular';
import {TextConstants} from '../../constants/TextConstants';
import {InformationService} from '../../service/information.service';
import {Information} from '../../models/information.model';
import {ProductService} from "../product/product.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements AfterViewInit, ViewWillEnter {

  public menu: Menu[];
  private information: Information;


  constructor(
    private menuService: MenuService,
    private informationService: InformationService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private productService: ProductService){ }


  async doRefresh(event){
    await this.updateMenu();
    event.target.complete();
  }

  async ngAfterViewInit(){
    await this.updateMenu(true);
  }

  async ionViewWillEnter(){
    this.information = await this.informationService.getInformation();
  }

  public async onClick($event) {
    if (await this.informationService.isOpen()) {
      this.productService.product = $event;
      await this.router.navigate(['/product']);
    } else {
      await this.informationService.showAlertClose();
    }
  }

  public openActionSheet(){
    this.menuService.presentActionSheet().then();
  }

  public openAlertInformation(){
    this.menuService.presentAlert().then();
  }

  async updateMenu(withLoading: boolean = false){
    const loading = await this.loadingController.create({message: TextConstants.LOADING});
    if (withLoading) {
      await loading.present();
    }
    try{
      this.menu = await this.menuService.getProductList();
      } catch {
        const alert = await this.alertController.create({
          header: TextConstants.WARNING,
          message: TextConstants.ERROR_HAPPEN,
          buttons: [TextConstants.CLOSE]
        });
        await alert.present();
      }
    if (withLoading) {
      await loading.dismiss();
    }
  }

}
