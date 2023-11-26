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

  constructor(private livreService: LivreService, public authService: AuthService) { }

  chargerLivres() {
    this.livreService.listeLivre().subscribe(livres => {
      this.livres = livres;
      console.log('Livres:', this.livres);
      this.livres.forEach((livre) => {
         this.livreService.loadImage(livre.image.idImage).subscribe(
            (img: Image) => {
               livre.imageStr = 'data:' + img.type + ';base64,' + img.image;
               console.log('Image URL:', livre.imageStr);
            }
         );
      });
   });
  }   
    
  

  supprimerLivre(l: Livre) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.livreService.supprimerLivre(l.idLivre!).subscribe(() => {
        console.log("livre supprimé");
        this.chargerLivres();
      });
  }


  ngOnInit(): void {
    this.livreService.listeLivre().subscribe(l => {
      console.log(l);
      this.livres = l;
        this.livreService.listeLivre().subscribe(livres => {
          this.livres = livres;
          
          this.livres.forEach((livre) => {
            this.livreService.loadImage(livre.image.idImage).subscribe(
              (img: Image) => {
                livre.imageStr = 'data:' + img.type + ';base64,' + img.image;
                console.log('Image URL:', livre.imageStr);
              },
              error => {
                console.error('Erreur lors du chargement de l\'image:', error);
              }
            );
          });
        });
      })
      



  }

}
