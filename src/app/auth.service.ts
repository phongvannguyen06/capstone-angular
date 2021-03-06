import { EventEmitter, Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();
  jwtToken: string;

  constructor(private dataService: DataService) { }

  authenticate(username: string, password: string) {
    this.dataService.validateUser(username, password).subscribe(
      next => {
        this.jwtToken = next.result;
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
      },
      error => {
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(false);
      }
    );
  }

  getRole(): string {
    if (this.jwtToken == null) return null;
    const encodedPayload = this.jwtToken.split('.')[1];
    const payload = atob(encodedPayload);
    return JSON.parse(payload).role;
  }

  logOut() {
    this.isAuthenticated = false;
    this.jwtToken = null;
    this.authenticationResultEvent.emit(false);
  }
}
