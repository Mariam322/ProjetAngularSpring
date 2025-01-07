import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BankprojetFront';
  constructor(private authser:AuthService){}

  ngOnInit(): void {
    this.authser.loadTokenFromLocalStorage();
  }
}
