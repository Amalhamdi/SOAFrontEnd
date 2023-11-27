import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { LivreService } from '../services/livre.service';

@Component({
  selector: 'app-liste-genres',
  templateUrl: './liste-genres.component.html',
  styleUrls: ['./liste-genres.component.css']
})
export class ListeGenresComponent implements OnInit{

  genres!:Genre [];
  updatedGenre:Genre = {"idGenre":0,"nomGenre":"","descriptionGenre":""};
  ajout:boolean=true;

  constructor (private livreService : LivreService){}

  ngOnInit(): void {
    this.livreService.listeGenres().
    subscribe(g => {this.genres = g._embedded.genres;
    console.log(g); 
    this.chargerGenres;
    });
  }

  chargerGenres(){
    this.livreService.listeGenres().
    subscribe(g => {this.genres = g._embedded.genres;
    console.log(g);
    });
  }

  genreUpdated(g:Genre){
    console.log("genre updated event",g);
    this.livreService.ajouterGenre(g).
     subscribe( ()=> this.chargerGenres());
    }

    updateGenre(g:Genre) {
      this.updatedGenre=g;
      this.ajout=false;
      }
}
