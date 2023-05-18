let pokemonList = [

{
    name: 'Bulbasaur',
    height: .7,
    type: ['grass', 'poison']
},

{
    name: 'Squirtle',
    height: .5,
    type: ['water']
},

{
    name: 'Gyarados',
    height: 6.5,
    type: ['water', 'flying']
},

{
    name: 'Charizard',
    height: 1.7,
    type: ['fire', 'flying']
}
];

for (let i = 0; i < pokemonList.length; i++ ) {
   if (pokemonList[i].height == '1.0'){
   document.write(pokemonList[i].name + '(height:' + pokemonList[i].height + ') - wow that\'s a big<br/>');
} else {
    document.write(pokemonList[i].name + '(height: ' + pokemonList[i]/height + ')<br/>')
}
}
