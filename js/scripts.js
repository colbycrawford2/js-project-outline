let pokemonRepository = (function () {
    let pokemonList = []

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }) .then(function (json) {
           json.results.forEach(function (item) {
             let pokemon = {
                name: item.name,
                detailsUrl: item.url
             };
             add(pokemon);
           });
        }).catch(function (e) {
          console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon
        ) {
            pokemonList.push(pokemon);
    }     else {
            console.log("pokemon is not correct");
        }
    }
   
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        //Added event listener to the button.//
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
        
      }

      function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
      }

    return {
        getAll: getAll,
        add: add,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };

})();

    //console.log(pokemonRepository.getAll())//

    pokemonRepository.loadList().then(function() {

    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);  
    });
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
    /*let pokemonList = pokemonRepository.getAll();

    pokemonList.forEach(function(pokemon){
        document.write(pokemon.name + pokemon.height + pokemon.type);
        
    });*/

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
