import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { clients } from 'src/services/clients';
import { ClientsService } from 'src/services/clients.service';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {
  internForm!: FormGroup;
  formSubmitted = false;
  listeClient:clients[]=[];

  constructor(
    private clientService: ClientsService,
    private router: Router,
    private dialogRef: MatDialogRef<AddclientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadClient();
  }

  initForm(): void {
    this.internForm = new FormGroup({
      id: new FormControl(this.data?.id || ''), // Inclut un champ 'id' si fourni
      nom: new FormControl(this.data?.nom || '', [Validators.required, Validators.minLength(2)]),
      email: new FormControl(this.data?.email || '', [Validators.required, Validators.email])
    });
  }

    
    loadClient():void{
      this.clientService.getClient().subscribe(data=>{
        this.listeClient=data;
        console.log(this.listeClient)
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

    if (formValue.id) {
      // Mise à jour si l'ID est présent
      this.clientService.updateClient(formValue.id, formValue).subscribe(
        () => {
          
          this.dialogRef.close(formValue); // Ferme le dialogue
          
          this.router.navigate(['/client']); // Redirection après mise à jour
          
          window.location.reload();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du client :', error);
        }
      );
    } else {
      // Ajout d'un nouveau client
      this.clientService.addClient(formValue).subscribe(
        () => {
          this.dialogRef.close(formValue); // Ferme le dialogue
          
          this.router.navigate(['/client']); // Redirection après ajout
                  
          window.location.reload();
        },
        (error) => {
          console.error('Erreur lors de l’ajout du client :', error);
        }
      );
    }
  }
}
