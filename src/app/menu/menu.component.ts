import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService) { }
  itemsInCart = 0;

  ngOnInit(): void {
    this.dataService.itemIsAddedToCart.subscribe(
      next => this.itemsInCart++
    )
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

  navigateToCart() {
    this.router.navigate(['cart']);
  }

}
