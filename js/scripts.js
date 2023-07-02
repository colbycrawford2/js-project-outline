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
   
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = "pokemon.name";
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
      }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }

})();

    console.log(pokemonRepository.getAll())

    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);  
    });

//for loop shows large pokemon//
//can I delete the for loop?//
/*for (let i = 0; i < pokemonList.length; i++ ) {
   if (pokemonList[i].height >= 1.0){
       document.write(pokemonList[i].name + ' (height:' + pokemonList[i].height + ') - wow, that\'s big<br/>');
} else {
       document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')<br/>')
       }
}*/
    let pokemonList = pokemonRepository.getAll();

    pokemonList.forEach(function(pokemon){
        document.write(pokemon.name + pokemon.height + pokemon.type);
        
    });

//can I delete this section?//
/*function divide(dividend, divisor){
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
    console.log(divide(12, -3));*/
