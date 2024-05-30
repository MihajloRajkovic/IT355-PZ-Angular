import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ArtikliComponent } from './artikli/artikli.component';
import { MeniComponent } from './meni/meni.component';
import { PorudzbineComponent } from './porudzbine/porudzbine.component';
import { NarudzbeniceComponent } from './narudzbenice/narudzbenice.component';
import { FinansijeComponent } from './finansije/finansije.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import {AuthInterceptor} from "./auth/authInterceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ArtikliComponent,
    MeniComponent,
    PorudzbineComponent,
    NarudzbeniceComponent,
    FinansijeComponent,
    KorisniciComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
