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

 
  constructor(private activatedRoute: ActivatedRoute,
    private livreService: LivreService,
    private router: Router) { }



  ngOnInit(): void {
  //  this.genres = this.livreService.listeGenres();
    //this.currentLivre = this.livreService.consulterLivre(this.activatedRoute.snapshot.params['id']);
    //this.updatedGenreId = this.currentLivre.genre.idGenre;
    //console.log(this.currentLivre);

    this.livreService.listeGenres().
    subscribe(g => {this.genres = g._embedded.genres;
    console.log(g);
    });
    this.livreService.consulterLivre(this.activatedRoute.snapshot.params['id']).
    subscribe( l =>{ this.currentLivre = l; 
    this.updatedGenreId = 
    this.currentLivre.genre.idGenre;
  })
}

  updateLivre() {
 //   this.currentLivre.genre = this.livreService.consulterGenre(this.updatedGenreId);
  //  this.livreService.updateLivre(this.currentLivre);
  //  this.router.navigate(['livres']);

  this.currentLivre.genre = this.genres.
 find(g => g.idGenre == this.updatedGenreId)!;
this.livreService.updateLivre(this.currentLivre).subscribe(l => {
this.router.navigate(['livres']); }
);
    
  }
}
