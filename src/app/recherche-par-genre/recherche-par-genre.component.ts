import { Component, OnInit } from '@angular/core';
import { Livre } from '../model/livre.model';
import { Genre } from '../model/genre.model';
import { LivreService } from '../services/livre.service';

@Component({
  selector: 'app-recherche-par-genre',
  templateUrl: './recherche-par-genre.component.html',
  styleUrls: ['./recherche-par-genre.component.css']
})
export class RechercheParGenreComponent implements OnInit {

  livres: Livre[] = [];
  IdGenre: number | undefined;
  genres: Genre[] = [];

  constructor(private livreService: LivreService) { }

  ngOnInit(): void {
    this.livreService.listeGenres().subscribe(g => {
      this.genres = g._embedded.genres;
      console.log(g);
    });
  }

  onChange() {
    if (this.IdGenre !== undefined) {
      this.livreService.rechercherParGenre(this.IdGenre).subscribe(l => {
        this.livres = l;
      });
    }
  }
}

