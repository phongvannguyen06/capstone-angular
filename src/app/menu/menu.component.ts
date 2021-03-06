import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService, private authService: AuthService) { }
  itemsInCart = 0;
  isLoggedIn = false;

  ngOnInit(): void {
    this.authService.authenticationResultEvent.subscribe(
      () => this.isLoggedIn = this.authService.isAuthenticated
    );
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

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  navitgateToUserProfile() {
    this.router.navigate(['profile']);
  }

  logOut() {
    this.authService.logOut();
    this.navigateToHome();
  }

}
