import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { comptes } from 'src/services/compte';
import { CompteService } from 'src/services/compte.service';
import Swal from 'sweetalert2';
import { AddCompteComponent } from '../add-compte/add-compte.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {
  listCompte:any[]=[];
constructor(private compteServ:CompteService,private dialog:MatDialog,private route:Router,public authser:AuthService){}

ngOnInit(): void {
  this.loadCompte(); // Call function to fetch categories on component initialization
}
loadCompte():void{
  this.compteServ.getCompte().subscribe(data=>{
    this.listCompte=data;
    console.log(this.listCompte)
  })
}

open(){
const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
 

  dialogConfig.panelClass = 'custom-dialog-container';

  this.dialog.open(AddCompteComponent, dialogConfig);
}
confirmDelete(rib: number) {
   Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Voulez-vous supprimer comptes!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.compteServ.deleteClient(rib).subscribe(() => {
          // Vous pouvez également actualiser la liste des catégories après la suppression
          // this.fetchCategories();
          Swal.fire(
            'Supprimé!',
            'Votre comptes a été supprimée.',
            'success'
          )
          this.loadCompte();
          this.route.navigate(['/comptes'])
          // window.location.reload();
        });
      }
    })
}
onedit(rib:number){
 {
    // ouvrir le modal [ArticleFormComponent]
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.compteServ.getCompteById(rib).subscribe
    ((r)=>{dialogConfig.data = r // envoyer les donnes vers le modal
    this.dialog.open(AddCompteComponent, dialogConfig)
    })
    }
}
}
