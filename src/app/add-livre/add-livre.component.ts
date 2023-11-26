import { Image } from './../model/image.model';
import { Component, OnInit } from '@angular/core';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre.service';
import { Genre } from '../model/genre.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-livre',
  templateUrl: './add-livre.component.html',
  styleUrls: ['./add-livre.component.css']
})
export class AddLivreComponent implements OnInit {

  newLivre = new Livre
  newIdGenre!: number;
  newGenre!: Genre;
  genres!: Genre[];

  uploadedImage!: File;
  imagePath: any;



  constructor(private livreService: LivreService, private router: Router, public authService: AuthService) {
  }

  addLivre() {
   this.livreService
    .uploadImage(this.uploadedImage, this.uploadedImage.name)
    .subscribe((img: Image) => {
    this.newLivre.image=img;
    this.newLivre.genre= this.genres.find(g => g.idGenre
    == this.newIdGenre)!;
    this.livreService
    .ajouterLivre(this.newLivre)
    .subscribe(() => {
    this.router.navigate(['livres']);
    });
    });


  }

  ngOnInit(): void {
    this.livreService.listeGenres().
      subscribe(g => {
        this.genres = g._embedded.genres;
        console.log(g);
      });
  }
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }
}
