import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit {
  // Subject est une classe qui appartient a la librairy rxjs, et pas a Angular
  // Elle permets de stocker les recherches successives de l'utilisateur dans un tableau de chaine de caractères
  // ex :{..."a"..."ab"..."abz"..."ab"..."abc"...}
  searchTerms = new Subject<string>();
  // On ne peut que "consommer" l'observable, c'est a dire s'abonner pour recevoir des données dans le temps.
  // Mais avec la class Subject on peut le "piloter", construire un flux de données, afficher en miroir les resultats qui correspondent a la recherche de l'user
  // ex:{...pokemonList(a)...pokemonList(ab)....}
  pokemons$: Observable<Pokemon[]>;
  
  constructor(private router: Router,
    private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      //on va attendre un peu avant d'effectuer une requete au serveur 300milisec
      debounceTime(300),
      //distinctUntilChanged va eliminer les recherches successives identiques
      distinctUntilChanged(),
      switchMap((term) => this.pokemonService.searchPokemonList(term))
      //si on utilise "map" cela va transformer la premiere requete en Observable avec des resultats dedans comme ceci: Observable<"ab">
      //pour n'avoir que le resultats de recherche sans l'observable il y a plusieurs methodes : concatMap / mergeMap /switchMap
      //switchMap est généralement la plus utilisée, elle permets de prendre la recherche la plus recente.
      //switchMap renvoie le flux de resultat souhaité et par conséquent la pokemonList pour le terme de recherche rentrée
    )
    
  }

  search(term: string){
    //A chaque fois que l'user recherche un term et on utilise la methode next pour pousser son terme de recherche et obtenir un flux de données
    this.searchTerms.next(term)
  }

  goToDetail(pokemon: Pokemon){
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
