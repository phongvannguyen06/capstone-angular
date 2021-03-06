import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { CartItem } from '../model/CartItem';
import { Song } from '../model/Song';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {

  cart = new Array<CartItem>();
  subtotal = 0;
  tax: number;
  totalAfterTax: number;
  songs: Array<Song>;
  constructor(private dataService: DataService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getCart().subscribe(
      next =>{

        this.cart = next;
        this.cart.forEach(i => this.subtotal += i.totalCost);
        this.tax = this.subtotal * 0.06;
        this.totalAfterTax = this.subtotal + this.tax;
      }
    );

    this.dataService.getSongs().subscribe(
      next => this.songs = next
    )
  }

  checkOut() {
    console.log(this.cart);
    this.dataService.verifyStockInDatabase(this.cart).subscribe();
  }

  verifyIfItemsInStock(): boolean {
    for(let item of this.cart) {
      for(let song of this.songs) {
        if (item.songId === song.id && item.quantity > song.quantity) {
          return false;
        }
      }
    }
    return true;
  }

  subtractInventory() {
    if (this.verifyIfItemsInStock) {
      this.router.navigate(['orderConfirmationpage']);
    }
  }



}
