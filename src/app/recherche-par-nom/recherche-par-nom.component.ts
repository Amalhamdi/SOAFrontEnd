import { Component, OnInit } from '@angular/core';
import { LivreService } from '../services/livre.service';
import { Livre } from '../model/livre.model';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: ['./recherche-par-nom.component.css']
})
export class RechercheParNomComponent implements OnInit{
  ngOnInit(): void {
    this.livreService.listeLivre().subscribe(l => {
      console.log(l);
      this.livres = l;
      });
      
  }
  nomLivre!: string;
  livres !: Livre[];
  allLivres!:Livre[];
  searchTerm!:string;
  constructor(private livreService : LivreService) { }

  rechercherLivres(){
    this.livreService.rechercherParNom(this.nomLivre).
    subscribe(l=> {
    this.livres = l; 
    console.log(l)});
    }

    onKeyUp(filterText : string){
      this.livres = this.allLivres.filter(item =>
      item.nomLivre!.toLowerCase().includes(filterText));
      }

}
