export class Pokemon {
    id : number;
    name : string;
    hp : number;
    cp : number;
    picture : string;
    types : string[];
    created : Date;

constructor(
    // Ici on vient créer un constructeur pour donné des valeur par défauts lors de la création d'un pokémon
    name: string = 'Entrer un nom',
    hp: number = 100,
    cp: number = 10,
    // Grace a cette URL l'utilisateur pourra changer les trois "xxx" par le numéro d'identifiant d'un pokémon ex: "032", cela lui évitera d'aller chercher une URL sur internet
    picture: string = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/xxx.png',
    types: string[] = ['Normal'],
    created: Date = new Date()
){
    this.name = name;
    this.hp = hp;
    this.cp = cp;
    this.picture = picture;
    this.types = types;
    this.created = created;
}
    
}