import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { POKEMONS } from './pokemon/mock-pokemon-list';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
// Creation d'une database
  createDb(){
    // On a besoin de crée une constante parce qu'on ne peut pas la prendre directement d'un autre fichier, on doit la réassigner
    const pokemons = POKEMONS;
    return {pokemons};
  }
}
