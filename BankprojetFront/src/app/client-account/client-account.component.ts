import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { clients } from '../../services/clients';
import { comptes } from 'src/services/compte';

@Component({
  selector: 'app-client-account',
  templateUrl: './client-account.component.html',
  styleUrls: ['./client-account.component.css']
})
export class ClientAccountComponent implements OnInit{
  comptes: comptes[] = [];
  clients:clients[]=[];
  ClientsID!: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.comptes = navigation.extras.state['comptes'];
    }
  }

  ngOnInit(): void {
    this.ClientsID = this.route.snapshot.params['id'];
  }
}