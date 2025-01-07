import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { comptes } from './compte';
import { clients } from './clients';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  constructor(private http: HttpClient) { }

  public getCompte(): Observable<comptes[]> {
    return this.http.get<comptes[]>('http://localhost:8080/comptes');
  }

  addCompte(CompteToSave: any): Observable<void> {
    return this.http.post<void>('http://localhost:8080/comptes/add', CompteToSave);
  }

  public getClient(): Observable<clients[]> {
    return this.http.get<clients[]>('http://localhost:8080/clients');
  }

  getCompteById(rib: number): Observable<comptes[]> {
    return this.http.get<comptes[]>(`http://localhost:8080/comptes/${rib}`);
  }

  updateCompte(rib: number, comptes: comptes): Observable<comptes> {
    return this.http.put<comptes>(`http://localhost:8080/comptes/${rib}`, comptes);
  }

  deleteClient(rib: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/comptes/delete/${rib}`);
  }

  // Nouvelle méthode pour associer un compte à un client
  addCompteToClient(clientId: number, compteToSave: any): Observable<comptes> {
    return this.http.post<comptes>(`http://localhost:8080/clients/${clientId}/comptes`, compteToSave);
  }
    // Nouvelle méthode pour récupérer les comptes d'un client
    getComptesByClientId(clientId: number): Observable<comptes[]> {
      return this.http.get<comptes[]>(`http://localhost:8080/clients/${clientId}/comptes`);
    }
}
