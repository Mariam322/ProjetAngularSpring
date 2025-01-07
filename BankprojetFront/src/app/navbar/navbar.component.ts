import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
constructor(public authser:AuthService,private router:Router){}

  ngOnInit(): void {
    this.authser.loadTokenFromLocalStorage();
  }
  logout(){
this.authser.logout();
this.router.navigateByUrl("/login");
  }
}
