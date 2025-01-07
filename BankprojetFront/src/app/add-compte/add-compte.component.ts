import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { clients } from 'src/services/clients';
import { ClientsService } from 'src/services/clients.service';
import { comptes } from 'src/services/compte';
import { CompteService } from 'src/services/compte.service';

@Component({
  selector: 'app-add-compte',
  templateUrl: './add-compte.component.html',
  styleUrls: ['./add-compte.component.css']
})
export class AddCompteComponent implements OnInit {
  internForm!: FormGroup;
  formSubmitted = false;
  listeCompte: comptes[] = [];
  listeClients: clients[] = [];
  isEditMode: boolean = false;

  constructor(
    private compteServ: CompteService,
    private clientServ: ClientsService,
    private router: Router,
    private dialogRef: MatDialogRef<AddCompteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCompte();
    this.loadClient();
  }

  initForm(): void {
    this.internForm = new FormGroup({
      rib: new FormControl(this.data?.rib || ''),
      solde: new FormControl(this.data?.solde || '', [Validators.required, Validators.minLength(2)]),
      createdAt: new FormControl(this.data?.createdAt || '', [Validators.required]),
      clientid: new FormControl(this.data?.clientid || '', [Validators.required]),
    });
  }

  loadCompte(): void {
    this.compteServ.getCompte().subscribe(data => {
      this.listeCompte = data;
      console.log(this.listeCompte);
    });
  }
  loadClient():void{
    this.clientServ.getClient().subscribe(data=>{
      this.listeClients=data;
      console.log(this.listeClients)
    })
  }
  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.internForm.invalid) {
      return;
    }
  
    const formValue = this.internForm.value;
    console.log('Client ID:', formValue.clientid);
  
    if (formValue.id) {
      // Mise à jour si l'ID est présent
      this.compteServ.updateCompte(formValue.id, formValue).subscribe(
        () => {
          this.isEditMode = true;
          this.dialogRef.close(formValue); // Ferme le dialogue
          this.router.navigate(['/comptes']); // Redirection après mise à jour
          window.location.reload();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du client :', error);
        }
      );
    } else {
      // Ajout d'un nouveau compte
      this.compteServ.addCompteToClient(formValue.clientid, formValue).subscribe(
        () => {
          this.dialogRef.close(formValue); // Ferme le dialogue
          this.router.navigate(['/comptes']); // Redirection après ajout
          window.location.reload();
        },
        (error) => {
          console.error('Erreur lors de l’ajout du compte :', error);
        }
      );
    }
  }
}  