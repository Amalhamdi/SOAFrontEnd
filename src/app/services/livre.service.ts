import { Injectable } from '@angular/core';
import { Livre } from '../model/livre.model';
import { Genre } from '../model/genre.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenreWrapper } from '../model/genreWrapped.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class LivreService {

  apiURL: string = 'http://localhost:8080/livres/api';
  apiURLGenre: string = 'http://localhost:8080/livres/genre';
  livre!: Livre;
  constructor(private http: HttpClient) {}

  listeLivre(): Observable<Livre[]> {
    return this.http.get<Livre[]>(this.apiURL);
  }

  ajouterLivre(l: Livre): Observable<Livre> {
    return this.http.post<Livre>(this.apiURL, l, httpOptions);
  }

  supprimerLivre(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterLivre(id: number): Observable<Livre> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Livre>(url);
  }

  updateLivre(l: Livre): Observable<Livre> {
    return this.http.put<Livre>(this.apiURL, l, httpOptions);
  }

  listeGenres(): Observable<GenreWrapper> {
    return this.http.get<GenreWrapper>(this.apiURLGenre);
  }

  rechercherParGenre(idGenre: number):Observable<Livre[]> {
    const url = `${this.apiURL}/livregenre/${idGenre}`;
    return this.http.get<Livre[]>(url);
    }

    rechercherParNom(nom: string):Observable< Livre[]> {
      const url = `${this.apiURL}/livreByName/${nom}`;
      return this.http.get<Livre[]>(url);
      }

      ajouterGenre( g: Genre):Observable<Genre>{
        return this.http.post<Genre>(this.apiURLGenre, g, httpOptions);
        }

      }