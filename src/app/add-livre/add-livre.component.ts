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
  newIdGenre! : number;
  newGenre!: Genre;
  genres!:Genre[];


  constructor ( private livreService : LivreService,private router :Router,public authService: AuthService) {
  }
  
  addLivre () {
    // console.log(this.newLivre);
  //  this.newGenre = 
   // this.livreService.consulterGenre(this.newIdGenre);
 //   this.newLivre.genre = this.newGenre;
   // this.livreService.ajouterLivre(this.newLivre);
   // this.router.navigate(['livres']);

   this.newLivre.genre= this.genres.find(g => g.idGenre == this.newIdGenre)!;
   this.livreService.ajouterLivre(this.newLivre)
   .subscribe(l => {
   console.log(l);
   this.router.navigate(['livres']);
   });

  
   }
   
  ngOnInit(): void {
    //this.genres = this.livreService.listeGenres();

    this.livreService.listeGenres().
    subscribe(g => {this.genres = g._embedded.genres;
    console.log(g);
      });

}}
