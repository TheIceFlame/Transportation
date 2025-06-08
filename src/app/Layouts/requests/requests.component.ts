import {Component, OnInit} from '@angular/core';
import {db, RequestData} from '../../services/request-db.service';
import {OrderService} from '../../services/order.service';
import {UserService} from '../../services/user.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {PaginatedOrders} from '../../interfaces/paginated';
import {GlobalVariables} from '../../global-variables';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent implements OnInit {
  PaginatedOrders: PaginatedOrders = {
    size: 4,
    nb_Orders: 0,
    page: -1,
    Orders: [],
    pages: 1
  };

  constructor(private glovar: GlobalVariables, private order: OrderService, private user: UserService, private spinner: NgxSpinnerService) {
  }

  async getRequests(page: any): Promise<void> {
    this.spinner.show()
    this.user.getUserProfile().then((usr) => {
      this.order.get_orders(page, this.PaginatedOrders.Orders,usr.id).then((res) => {
        this.PaginatedOrders.nb_Orders = res.totalElements;
        this.PaginatedOrders.page = res.number;
        this.PaginatedOrders.pages = res.totalPages;
        this.PaginatedOrders.Orders = res.content;
        this.spinner.hide()
      }).catch((err) => {
        console.log(err)
        this.spinner.hide()
      })
    }).catch((err) => {
      this.spinner.hide()
    })
  }


  async delete(id: any) {
    this.spinner.show()
    this.order.delete_orders(id).then((res) => {
      this.spinner.hide()
      this.glovar.showMsg("Order Canceled Successfully !");
      this.getRequests(0)
    }).catch((err) => {
      this.spinner.hide()
    })
  }

  ngOnInit() {
    this.getRequests(0);
  }

}
