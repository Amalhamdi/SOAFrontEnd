import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Livre } from '../model/livre.model';
import { Genre } from '../model/genre.model';
import { Image } from '../model/image.model';
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
  constructor(private http: HttpClient,
    private authService: AuthService) { }



  listeLivre(): Observable<Livre[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Livre[]>(this.apiURL + "/all", { headers: httpHeaders });
  }

  ajouterLivre(l: Livre): Observable<Livre> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Livre>(this.apiURL + "/addlivre", l, { headers: httpHeaders });
  }

  supprimerLivre(id: number) {
    const url = `${this.apiURL}/dellivre/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterLivre(id: number): Observable<Livre> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Livre>(url, { headers: httpHeaders });
  }

  updateLivre(l: Livre): Observable<Livre> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<Livre>(this.apiURL + "/updatelivre", l, { headers: httpHeaders });

  }

  listeGenres(): Observable<GenreWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<GenreWrapper>(this.apiURLGenre, { headers: httpHeaders });
  }

  rechercherParGenre(idGenre: number): Observable<Livre[]> {
    const url = `${this.apiURL}/livregenre/${idGenre}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Livre[]>(url, { headers: httpHeaders });
  }

  rechercherParNom(nom: string): Observable<Livre[]> {
    const url = `${this.apiURL}/livreByName/${nom}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Livre[]>(url, { headers: httpHeaders });
  }

  ajouterGenre(g: Genre): Observable<Genre> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.post<Genre>(this.apiURLGenre, g, { headers: httpHeaders });
  }


  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${this.apiURL + '/image/get/info'}/${id}`;
    console.log('Image URL:', url);
    return this.http.get<Image>(url);
  }

  uploadImageLivre(file: File, filename: string, idLivre: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uplaodImageLivre'}/${idLivre}`;
    return this.http.post(url, imageFormData);
  }

  supprimerImage(id: number) {
    const url = `${this.apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }

  uploadImageFS(file: File, filename: string, idLivre: number): Observable<any> {
   
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL +'/image/uploadFS'}/${idLivre}`;
    return this.http.post(url, imageFormData);
  }
}