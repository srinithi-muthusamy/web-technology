import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders: any[] = [];

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedOrders = localStorage.getItem('orders');
      if (storedOrders) {
        this.orders = JSON.parse(storedOrders);
      }
    }
  }
}