import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
isAuthenticated:boolean=false;
roles:any;
username:any;
accessToken!:any; 
  constructor(private http:HttpClient,private route:Router) { }
  public login(username:string,password:string){
    let options={
      headers:new HttpHeaders().set("Content-type","application/x-www-form-urlencoded")
    }
    let params=new HttpParams().set("username",username).set("password",password);
    return this.http.post("http://localhost:8080/auth/login",params,options)  }

    loadProfile(data:any){
      this.isAuthenticated=true;
      this.accessToken=data['access-token'];
      let decodedjwt:any=jwtDecode(this.accessToken);
      this.username=decodedjwt.sub;
      this.roles=decodedjwt.scope;
      window.localStorage.setItem('jwt-token',this.accessToken)
      


    }
    loadTokenFromLocalStorage(){
      let token=window.localStorage.getItem("jwt-token");
      if(token){
        this.loadProfile({"access-token":token});
        //this.route.navigateByUrl("/admin/client")
      }
    }
    logout(){
      this.isAuthenticated=false;
      this.accessToken=undefined;
      this.username=undefined;
      this.roles=undefined; 
      localStorage.removeItem("jwt-token");
      this.route.navigateByUrl("/login")
    }
}
