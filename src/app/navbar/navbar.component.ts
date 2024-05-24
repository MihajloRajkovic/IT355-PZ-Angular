import { Component } from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAdmin: boolean;

  constructor(private authService: AuthService) {
    this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
  }
}
