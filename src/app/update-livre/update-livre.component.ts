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

  updateLivre() {
    this.currentLivre.genre = this.genres.
      find(g => g.idGenre == this.updatedGenreId)!;
    this.livreService.updateLivre(this.currentLivre).subscribe(l => {
      this.router.navigate(['livres']);
    }
    );

  }
}
