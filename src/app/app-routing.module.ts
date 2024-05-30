import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {ArtikliComponent} from "./artikli/artikli.component";
import {PorudzbineComponent} from "./porudzbine/porudzbine.component";
import {NarudzbeniceComponent} from "./narudzbenice/narudzbenice.component";
import {FinansijeComponent} from "./finansije/finansije.component";
import {KorisniciComponent} from "./korisnici/korisnici.component";
import {MeniComponent} from "./meni/meni.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'artikli', component: ArtikliComponent },
  { path: 'porudzbine', component: PorudzbineComponent },
  { path: 'narudzbenice', component: NarudzbeniceComponent },
  { path: 'finansije', component: FinansijeComponent },
  { path: 'korisnici', component: KorisniciComponent },
  { path: 'meni', component: MeniComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
