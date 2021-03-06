import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CartItem } from '../model/CartItem';
import { Song } from '../model/Song';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {

  count =[1, 2, 3, 4];
  cart = new Array<CartItem>();
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCart().subscribe(
      next => console.log(next)
    );
    console.log(this.cart);
  }



}
