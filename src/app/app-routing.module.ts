import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivresComponent } from './livres/livres.component';
import { AddLivreComponent } from './add-livre/add-livre.component';
import { UpdateLivreComponent } from './update-livre/update-livre.component';
import { RechercheParGenreComponent } from './recherche-par-genre/recherche-par-genre.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeGenresComponent } from './liste-genres/liste-genres.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './admin.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const routes: Routes = [
  {path: "livres", component : LivresComponent},
  { path: "add-livre", component: AddLivreComponent,canActivate: [AdminGuard]},
  {path: "updateLivre/:id", component: UpdateLivreComponent},
  {path: "rechercheParGenre", component : RechercheParGenreComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "listeGenres", component : ListeGenresComponent,canActivate: [AdminGuard]},
  {path: 'login', component: LoginComponent},
  { path: 'app-forbidden', component: ForbiddenComponent },
  { path: "", redirectTo: "livres", pathMatch: "full" }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
