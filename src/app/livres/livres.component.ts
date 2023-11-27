import { Image } from './../model/image.model';
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

  livres!: Livre[];

  apiurl:string='http://localhost:8080/livres/api';


  constructor(private livreService: LivreService, public authService: AuthService) { }

  chargerLivres() {
    this.livreService.listeLivre().subscribe(livres => {
      this.livres = livres;

      /*this.livres.forEach((livre) => {
        livre.imageStr = 'data:' + livre.images[0].type + ';base64,' +
          livre.images[0].image;*/

      });
  } 


 /*  chargerLivres(){
    this.livreService.listeLivre().subscribe(livres => {
    this.livres = livres;
    });
    } */



  supprimerLivre(l: Livre) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.livreService.supprimerLivre(l.idLivre!).subscribe(() => {
        console.log("livre supprimé");
        this.chargerLivres();
      });
  }


  ngOnInit(): void {

    this.chargerLivres();
    /*
    this.livreService.listeLivre().subscribe(l => {
      this.livres = l;

      this.livreService.listeLivre().subscribe(livres => {
        this.livres = livres;


        this.livres.forEach((livre) => {
          livre.imageStr = 'data:' + livre.images[0].type + ';base64,' +
            livre.images[0].image;
        });
      })
    }
    );*/
  }
}
