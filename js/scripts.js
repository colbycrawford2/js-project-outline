let pokemonRepository = (function () {
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
    ]

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }
   
    return {
        getAll: getAll,
        add: add
    }

})();

console.log(pokemonRepository.getAll())

//for loop shows large pokemon//
/*for (let i = 0; i < pokemonList.length; i++ ) {
   if (pokemonList[i].height >= 1.0){
       document.write(pokemonList[i].name + ' (height:' + pokemonList[i].height + ') - wow, that\'s big<br/>');
} else {
       document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')<br/>')
       }
}*/
let pokemonList = pokemonRepository.getAll();

pokemonList.forEach(function(pokemon){
    console.log(pokemon.name + pokemon.height + pokemon.type);
});

function divide(dividend, divisor){
    if(divisor === 0){
        return "You're trying to divide by 0."
    }else{
        let result = dividend / divisor;
        return result;
        }    
    }
    console.log(divide(4, 2));
    console.log(divide(7, 0));
    console.log(divide(1, 4));
    console.log(divide(12, -3));
