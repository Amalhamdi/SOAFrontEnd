import { Image } from './../model/image.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivreService } from '../services/livre.service';
import { Livre } from '../model/livre.model';
import { Genre } from '../model/genre.model';




@Component({
  selector: 'app-update-livre',
  templateUrl: './update-livre.component.html',
  styleUrls: ['./update-livre.component.css']
})
export class UpdateLivreComponent implements OnInit {

  genres!: Genre[];
  updatedGenreId!: number;
  currentLivre = new Livre();
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;




  constructor(private activatedRoute: ActivatedRoute,
    private livreService: LivreService,
    private router: Router) { }




   ngOnInit(): void {
     this.livreService.listeGenres().
       subscribe(g => {
         this.genres = g._embedded.genres;
         console.log(g);
       });
 
     this.livreService.consulterLivre(this.activatedRoute.snapshot.params['id']).
       subscribe(l => {
         this.currentLivre = l;
         this.updatedGenreId =
           this.currentLivre.genre.idGenre;
 
 
         this.livreService
           .loadImage(this.currentLivre.image.idImage)
           .subscribe((img: Image) => {
             this.myImage = 'data:' + img.type + ';base64,' + img.image;
           });
       })
   }
  
  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

  /* updateLivre() {
     this.currentLivre.genre = this.genres.
       find(g => g.idGenre == this.updatedGenreId)!;
     if (this.isImageUpdated) {
       this.livreService
         .uploadImage(this.uploadedImage, this.uploadedImage.name)
         .subscribe((img: Image) => {
           this.currentLivre.image = img;
           this.livreService
             .updateLivre(this.currentLivre)
             .subscribe((l) => {
               this.router.navigate(['livres']);
             });
         });
     }
     else {
       this.livreService
         .updateLivre(this.currentLivre)
         .subscribe((l) => {
           this.router.navigate(['livres']);
         });
     }
   }*/

  updateLivre() {
    this.currentLivre.genre = this.genres.
      find(g => g.idGenre == this.updatedGenreId)!;
    this.livreService
      .updateLivre(this.currentLivre)
      .subscribe((l) => {
        this.router.navigate(['livres']);
      });
  }


  onAddImageLivre() {
    this.livreService
      .uploadImageLivre(this.uploadedImage,
        this.uploadedImage.name, this.currentLivre.idLivre!)
      .subscribe((img: Image) => {
        this.currentLivre.images.push(img);
      });
  }


  supprimerImage(img: Image){
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.livreService.supprimerImage(img.idImage).subscribe(() => {
    //supprimer image du tableau currentProduit.images 
    const index = this.currentLivre.images.indexOf(img, 0);
    if (index > -1) {
    this.currentLivre.images.splice(index, 1);
    }
    });
    }
    

}
