import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  products = [
    {
      id: 1,
      name: 'skirt',
      price: 1500,
      imageUrl: 'assets/dress.jpeg',
      description:
        'Elegant Fuddruckers dress, cotton fabric, available in all sizes.',
    },
    {
      id: 2,
      name: 'Grinder',
      price: 3000,
      imageUrl: 'assets/grinder.jpeg',
      description:
        'Preethi Grinder, 3 jars, multi-purpose, 500W motor, stainless steel.',
    },
    {
      id: 3,
      name: 'Mixer',
      price: 2000,
      imageUrl: 'assets/mixer.jpeg',
      description: 'Bajaj Mixer, 3-speed control, 2 jars, 500W, durable build.',
    },
    {
      id: 4,
      name: 'Moisturizer',
      price: 500,
      imageUrl: 'assets/sunscreen.jpeg',
      description:
        'Neutrogena Moisturizer,SPF 50+, 100ml, water-resistant, non-greasy.',
    },
    {
      id: 5,
      name: 'Hair Bands',
      price: 20000,
      imageUrl: 'assets/hairbands.jpeg',
      description: 'Keep your food fresh and organized with our top-rated refrigerator!',
    },
    {
      id: 6,
      name: 'Mobile',
      price: 20000,
      imageUrl: 'assets/mobilecase.jpeg',
      description:
        '6.5-inch display,high-resolution 48 MP camera,storage with 128GB capacity',
    },
  ];

  cart: any[] = [];

  addToCart(product: any) {
    this.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  buyNow(product: any) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push({ ...product, status: 'Pending' });
    localStorage.setItem('orders', JSON.stringify(orders));
    this.addToCart(product);
  }
}