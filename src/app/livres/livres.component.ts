import { Component, OnInit } from '@angular/core';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.css']
})
export class LivresComponent implements OnInit {

  livres! : Livre[];

  constructor(private livreService : LivreService,public authService: AuthService) {
    //this.livres = livreService.listeLivres();
    /*
    this.livres = [
      { idLivre: 1, nomLivre: "le petit prince", prixLivre: 3000.600, dateCreation: new Date("01/14/2011") },
      { idLivre: 2, nomLivre: "la planete au tresor", prixLivre: 450, dateCreation: new Date("12/17/2010") },
      { idLivre: 3, nomLivre: "alice au pays des merveilles", prixLivre: 900.123, dateCreation: new Date("02/20/2020") }
    ]; */
  }
chargerLivres(){
  this.livreService.listeLivre().subscribe(l => {
  console.log(l);
  this.livres = l;
  }); 
  }
  supprimerLivre(l: Livre)
  {
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
  this.livreService.supprimerLivre(l.idLivre!).subscribe(() => {
  console.log("produit supprimé");
  this.chargerLivres();
  });
  }


  ngOnInit(): void {
    this.livreService.listeLivre().subscribe(l => {
      console.log(l);
      this.livres = l;
    })


    
  }

}
