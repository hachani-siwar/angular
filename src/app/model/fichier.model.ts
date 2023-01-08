export interface Fichier {

    file_id: string ;
    file_name : string ;
    file_size : string ; 
    file_matiere : string ; 
    type : string ; 
    domain : string ; 
    user_id : string ; 
    
    
    }
    
    
    export interface PageFichier {
        docs : Array<Fichier>;
        page : number ;
        size : number ;
        totaPages : number ; 
        
    
    
    }


    export interface Domain {

        domain_id: string ;
        domain_name : string ;
       
        
        
        }