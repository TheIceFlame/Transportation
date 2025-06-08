import {Component} from '@angular/core';

import {NgxSpinnerService} from 'ngx-spinner';
import {MerchantService} from '../../services/merchant.service';
import {OrderService} from '../../services/order.service';
import {GlobalVariables} from '../../global-variables';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrl: './merchants.component.scss'
})
export class MerchantsComponent {
  displayedColumns: string[] = ['employee-name', 'active', 'city', 'email', 'ratingAverage', 'creation-date', 'actions'];
  search_name: string = ""

  constructor(
    private service: OrderService,
    private glovar: GlobalVariables,
    private spinner: NgxSpinnerService
  ) {
    this.Orders()
  }

  paginatedUsers: any = {size: 5, nb_users: 0, page: -1, users: [], pages: 1}

  Orders() {
    this.spinner.show()
    this.service.pending_orders().then((res) => {
      this.paginatedUsers.nb_Orders = res.totalElements;
      this.paginatedUsers.page = res.number;
      this.paginatedUsers.pages = res.totalPages;
      this.paginatedUsers.Orders = res.content;
    }).finally(() => {
      this.spinner.hide()

    })
  }

  async delete(id: any) {
    this.spinner.show()
    this.service.delete_orders_comp(id).then((res) => {
      this.spinner.hide()
      this.glovar.showMsg("Order Deleted Successfully !");
      this.Orders()
    }).catch((err) => {
      this.spinner.hide()
    })
  }

  async confirm(id: any) {
    this.spinner.show()
    this.service.confirm(id).then((res) => {
      this.spinner.hide()
      this.glovar.showMsg("Order Confirmed Successfully !");
      this.Orders()
    }).catch((err) => {
      this.spinner.hide()
    })
  }

  async delete_orders(id: any) {
    this.spinner.show()
    this.service.delete_orders(id).then((res) => {
      this.spinner.hide()
      this.glovar.showMsg("Order Canceled Successfully !");
      this.Orders()
    }).catch((err) => {
      this.spinner.hide()
    })
  }

}
