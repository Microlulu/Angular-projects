import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {

 constructor(private http: HttpClient){
 }   
    // On utilise un observable par ce qu'on ne reçoit pas une liste de pokemon (synchrone), on reçoit une donnée un peu plus tard dans le temps (flux) qui elle contient un tableau de pokémon (asychrone)
 getPokemonList(): Observable<Pokemon[]>{
    // return POKEMONS; synchrone
    // get <Pokemon[]> appelle un tableau de Pokemon de l'api/pokemon
  return this.http.get<Pokemon[]>('api/pokemons').pipe(
    // Logger la réponse : pokemonList en utilisant la private function log()
    tap((response) => this.log(response)),
    // Si il y'a une erreur on va logger l'erreur et retourner un tableau vide.
    catchError((error) => this.handleError(error, []))
  );
 }

 getPokemonById(pokemonId: number): Observable<Pokemon|undefined>{
  return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
    tap((response) => this.log(response)),
    catchError((error) => this.handleError(error, undefined))
    //Renvoi undefined si pas de pokemon
  );
 }
 
 searchPokemonList(term: string): Observable<Pokemon[]>{
   // Ici je viens mettre une condition qui dit que si la recherche est inférieur ou egale a 1 caractère, je ne veux rien faire, pas de requete au serveur et pas de resultats a l'user
   if(term.length <= 1){
      return of([]);
   }
   // On retourne la liste de Pokemon de notre serveur et on viens prendre le terme que l'user rentre dans le champ et on l'associe au nom
   return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
      // En cas d'erreur sur la recherche je renvoie un tableau vide
   )
 }

 updatePokemon(pokemon: Pokemon): Observable<null>{
    // il faut préciser au client http angular que l'on envoie des données dans notre requete
    // Pour cela on ajoute un headers et on lui passe un object content type
    const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    // On accède au client http et on ajoute put
    // put signifie que l'on veut modifier des informations coté serveur
    // On précise l'url, le corps de la requete (les infos du pokemon), et le headers pour préciser l'envoie de données
    // on ajoute pipe pour ajouter des traitement a l'observable
    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
        // traitement 1 : reponse qu'on log
        tap((response) => this.log(response)),
        // Traitement 2 : intercepter l'erreur si il y' en a et préciser que l'erreur peut etre null
        catchError((error) => this.handleError(error, null))
    );
 }

  addPokemon(pokemon: Pokemon): Observable<Pokemon>{
    const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    // Il faut préciser que l'on retourne un object de type Pokemon
    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
    );
  }

  deletePokemonById(pokemonId: number): Observable<null>{
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
       tap((response) => this.log(response)),
       catchError((error) => this.handleError(error, null)) 
    );
  }

// Ici on dit que on attends une reponse qui peut avoir plusieurs type (une liste de Pokemon, un objet pokemon, rien..)
 private log(response: any){
    console.table(response);
 }
 // La valeur est any parce que l'arreur peut etre de n'importe quelle type (tableau vide, undefined...)
 private handleError(error: Error, errorValue: any){
    console.error(error);
    return of(errorValue)
 }

 getPokemonTypeList():string[]{
  return ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol', 'Combat', 'Psy'];
 }
}
