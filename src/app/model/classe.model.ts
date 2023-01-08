export interface Classe {

_id: string ;
name : string ;
classeGrade : string ; 


}


export interface PageClasse {
    docs : Array<Classe>;
    page : number ;
    limit : number ;
    pages : number ; 
    total : number ;


}