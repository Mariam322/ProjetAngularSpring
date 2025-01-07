import { Component, OnInit } from '@angular/core';
import { clients } from 'src/services/clients';
import { ClientsService } from 'src/services/clients.service';
import { AddclientComponent } from '../addclient/addclient.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { AuthService } from 'src/services/auth.service';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  listeClient:clients[]=[];
  listeSerach:clients[]=[];
  keyword: string = '';
  searchFomGroup!:FormGroup;

  constructor(private ClientServ:ClientsService,public authser:AuthService,
    private dialog:MatDialog,private route:Router,private fb:FormBuilder){}

  ngOnInit(): void {
this.loadClient();

this.initializeSearchForm();
  }
  // Initialize search form with validations
  initializeSearchForm(): void {
    this.searchFomGroup = this.fb.group({
      keyword: ['', Validators.required]  // Make keyword required
    });
  }
loadClient():void{
  this.ClientServ.getClient().subscribe(data=>{
    this.listeClient=data;
    console.log(this.listeClient)
  })
}

open() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
 

  dialogConfig.panelClass = 'custom-dialog-container';

  this.dialog.open(AddclientComponent, dialogConfig);
}

confirmDelete(id: string) {
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "Voulez-vous vraiment supprimer ce client?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimer!',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.ClientServ.deleteClient(id).subscribe({
        next: () => {
          // Si la suppression est réussie (statut 200)
          Swal.fire(
            'Supprimé!',
            'Le client a été supprimé avec succès.',
            'success'
          );
          this.loadClient(); // Actualiser la liste des clients
          this.route.navigate(['/client']);
        },
        error: (err) => {
          // Si le serveur renvoie un statut 409, cela signifie que le client a des comptes associés
          if (err.status === 409) {
            Swal.fire(
              'Erreur!',
              'Impossible de supprimer le client car il possède des comptes associés.',
              'error'
            );
          } else {
            // Si une autre erreur se produit, afficher un message générique
            Swal.fire(
              'Erreur!',
              'Une erreur s\'est produite lors de la suppression du client.',
              'error'
            );
          }
        }
      });
    }
  });
}


onedit(id:string){
  {
    // ouvrir le modal [ArticleFormComponent]
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.ClientServ.getClientById(id).subscribe
    ((r)=>{dialogConfig.data = r // envoyer les donnes vers le modal
    this.dialog.open(AddclientComponent, dialogConfig)
    })
    }
}
search() {
  if (this.searchFomGroup.invalid) {
    console.error('Formulaire de recherche invalide');
    return;
  }

  const kw = this.searchFomGroup.value.keyword;
  console.log('Mot-clé de recherche :', kw);

  this.ClientServ.searchClient(kw).subscribe({
    next: (data) => {
      console.log('Données récupérées :', data);
      this.listeClient = data;
    },
    error: (err) => {
      console.error('Erreur lors de la recherche :', err);
    }
  });
}
handelClientAccount(id:string){
  this.ClientServ.getClientAccounts(id).subscribe({
    next: (comptes) => {
      console.log('Comptes récupérés pour le client :', comptes);
      this.route.navigate(['clientAccount/', id], {
        state: { comptes }
      });
    },
    error: (err) => {
      console.error('Erreur lors de la récupération des comptes :', err);
    }
  });
}
}