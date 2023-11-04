import { Genre } from "./genre.model";

export class Livre {
    idLivre? : number;
    nomLivre? : string;
    prixLivre? : number;
    dateCreation? : Date ;
    genre! : Genre
    }