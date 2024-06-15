import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  orders: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        this.cart = JSON.parse(storedCart);
      }

      const storedOrders = localStorage.getItem('orders');
      if (storedOrders) {
        this.orders = JSON.parse(storedOrders);
      }
    }
  }

  buyNow(product: any) {
    this.orders.push({ ...product, status: 'Pending' });
    localStorage.setItem('orders', JSON.stringify(this.orders));
    this.removeFromCart(product);
    this.router.navigate(['/order']);
  }

  removeFromCart(product: any) {
    this.cart = this.cart.filter((item) => item.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}