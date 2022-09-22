import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
})
export class DetailPokemonComponent implements OnInit {

  pokemonList: Pokemon[];
  pokemon: Pokemon|undefined;

  constructor(private route: ActivatedRoute, private router: Router, private pokemonService: PokemonService) { }

  ngOnInit(){
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id');
    if(pokemonId){
      this.pokemonService.getPokemonById(+pokemonId).subscribe(pokemon =>this.pokemon = pokemon);
    }
  }
  deletePokemon(pokemon: Pokemon){
    // si L'utilisateur supprime un pokemon il est rediriger vers la page principale (Liste de pokémons)
    this.pokemonService.deletePokemonById(pokemon.id).subscribe(() => this.goToPokemonList());
  }

  goToPokemonList(){
    this.router.navigate(['/pokemons']);
  }
  goToEditPokemon(pokemon: Pokemon){
    this.router.navigate(['edit/pokemon', pokemon.id]);
  }

}
