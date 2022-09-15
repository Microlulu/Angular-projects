import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styles: [
  ]
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon; // Parametres pour dire que l'on attends la propriété pokemon à chaque fois que l'utilisateur veux utiliser le form
  // on déclare ici que les types des Pokémons sont des strings et que c'est dans un tableau.
  types: string[];

  // On appelle la classe PokemonService qui contient notre tableau de types
  constructor( private pokemonService: PokemonService, private router: Router) { }

  ngOnInit() {
    //permet d'avoir accès a pokemonTypeList
    this.types = this.pokemonService.getPokemonTypeList();
  }
  // Methode pour voir le type du pokémon passé en paramètre (dans l'input)
  hasType(type: string): boolean{
    return this.pokemon.types.includes(type);
  }
  // Lorsque l'user coche ou decoche une case il faut vérifié si le pokémon avait ce paramètre.
  // Si le parametre est present : on l'enleve. Si le parametre n'est pas présent on le rajoute.
  selectType( $event: Event, type: string){
    // On a besoin de caster en HTMLInputElement pour ne pas avoir d'erreur de typage
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;
    // Si l'user coche un type
    if(isChecked){
      // Je viens ajouter le nouveau type a mon pokemon
      this.pokemon.types.push(type);
    }else{
      // dans le cas contraire je lui retire le type avec la methode splice
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index,1);
    }
  }
  
  isTypesValid(type:string):boolean{
    // On verifie si il a 1 type (1 seul case de cocher)
    if(this.pokemon.types.length == 1 && this.hasType(type)){
      // Et on le bloque si il veut enlever le dernier type (il ne doit pas avoir 0 case coché)
      return false;
    }
    // Si on est a plus de 2 types (au moins 3) on veut lui empecher d'en ajouter un autre type
    if(this.pokemon.types.length > 2 && !this.hasType(type)){
      // si il veut en ajouter plus de 3, on le bloque mais on lui laisse la possibilité de déselectionner les types choisis pour en ajouter d'autres
      return false;
    }
    return true;
  }

  onSubmit(){
    console.log('Submited form !');
    // Quand le form est soumis l'utilisateur est redirigé sur la page d'acceuil
    this.router.navigate(['/pokemon', this.pokemon.id]);
  }

}
