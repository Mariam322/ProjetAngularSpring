import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { clients } from './clients';
import { comptes } from './compte';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http:HttpClient) { }

  public getClient():Observable<clients[]>{
    return this.http.get<clients[]>('http://localhost:8080/clients')
  }

   addClient(ClientToSave:any):Observable<void>{
    return this.http.post<void>('http://localhost:8080/clients/add',ClientToSave);
   }

   deleteClient(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/clients/${id}`);
  }

   getClientById(id:string):Observable<clients[]>{
    //chercher manulemetn l'element dans tableau 
 
  return this.http.get<clients[]>(`http://localhost:8080/clients/${id}/edit`);
  }
  updateClient(id:string,clients: clients): Observable<clients> {
    return this.http.put<clients>(`http://localhost:8080/clients/${id}`, clients);
  }

  searchClient(keyword: String): Observable<clients[]> {
    console.log('Requête de recherche envoyée avec le mot-clé :', keyword);
    return this.http.get<clients[]>("http://localhost:8080/clients/search?keyword=" + keyword);
  }
  getClientAccounts(clientId: string) :Observable<comptes[]> {
    return this.http.get<comptes[]>(`http://localhost:8080/clients/${clientId}/comptes`);
  }
  

}
