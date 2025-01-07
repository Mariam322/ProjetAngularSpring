import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private router: Router,private authServ:AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
     
    });
  }

  login() {
    console.log(this.form.value);
    
    let username = this.form.value.username;
    let password = this.form.value.password;
  
    // Vérification des champs vides
    if (!username || !password) {
      this.showAlert('Veuillez remplir tous les champs.');
      return;
    }
  
    this.authServ.login(username, password).subscribe(
      (data) => {
        console.log('Connexion réussie :', data);
        // Vous pouvez ajouter une alerte pour indiquer le succès
        swal.fire({
          title: 'Succès',
          text: 'Connexion réussie.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.authServ.loadProfile(data);
        this.router.navigateByUrl("/home")
        // Naviguer ou effectuer d'autres actions si nécessaire
      },
      (error) => {
        // Gérer les erreurs de connexion
        if (error.status === 401) {
          this.showAlert('Identifiant ou mot de passe incorrect.');
        } else {
          this.showAlert('Une erreur est survenue. Veuillez réessayer.');
        }
        console.error('Erreur de connexion :', error);
      }
    );
  }
  showAlert(message: string) {
    swal.fire({
      title: 'Oops...',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}  