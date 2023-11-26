import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LivresComponent } from './livres/livres.component';
import { AddLivreComponent } from './add-livre/add-livre.component';
import { UpdateLivreComponent } from './update-livre/update-livre.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RechercheParGenreComponent } from './recherche-par-genre/recherche-par-genre.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ListeGenresComponent } from './liste-genres/liste-genres.component';
import { UpdateGenreComponent } from './update-genre/update-genre.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { TokenInterceptor } from './services/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LivresComponent,
    AddLivreComponent,
    UpdateLivreComponent,
    RechercheParGenreComponent,
    RechercheParNomComponent,
    SearchFilterPipe,
    ListeGenresComponent,
    UpdateGenreComponent,
    LoginComponent,
    ForbiddenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
   // Ng2SearchPipeModule,
  ],
  providers: [{ provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true}
     ],
  bootstrap: [AppComponent]
})
export class AppModule { }
