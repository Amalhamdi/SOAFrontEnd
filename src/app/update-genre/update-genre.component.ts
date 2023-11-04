import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-genre',
  templateUrl: './update-genre.component.html',
  styleUrls: ['./update-genre.component.css']
})
export class UpdateGenreComponent implements OnInit{

  @Input()
  genre! : Genre;

  @Output() 
 genreUpdated = new EventEmitter<Genre>();

 @Input()
 ajout!:boolean;
  
  constructor (){}
  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ",this.genre);
  }

  saveGenre(){
    // code pour enregistrer le genre modifié
    this.genreUpdated.emit(this.genre) ;
    }
}
