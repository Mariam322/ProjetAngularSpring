export class comptes{
    rib!:number;
    solde!: number ;
  
    createdAt!: string ;
    clientid!:string
    constructor(rib:number,solde:number,createdAt:string,clientid:string
    ){
        this.rib=rib;
       this.solde=solde;
       this.createdAt=createdAt;
       this.clientid=clientid;
      
    }

}