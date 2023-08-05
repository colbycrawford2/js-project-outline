let pokemonRepository = (function () {
    let pokemonList = []

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon
        ) {
            pokemonList.push(pokemon);
        }   else {
            console.log("pokemon is not correct");
        }
    }

    function getAll() {
        return pokemonList;
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
        button.addEventListener("click", function(event) {
            showDetails(pokemon);
        });   
      }

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
             console.log(pokemon);
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

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
      }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
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

(function() {
    let modalContainer = document.querySelector('#modal-container');
    let dialogPromiseReject; // This can be set later, by showDialog
    
    function showModal(title, text) {
      // Clear all existing modal content
      modalContainer.innerHTML = '';
      
      let modal = document.createElement('div');
      modal.classList.add('modal');
      
      // Add the new modal content
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);
      
      let titleElement = document.createElement('h1');
      titleElement.innerText = title;
      
      let contentElement = document.createElement('p');
      contentElement.innerText = text;
      
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);
      
      modalContainer.classList.add('is-visible');
    }
    
    function hideModal() {
      modalContainer.classList.remove('is-visible');
      
      if (dialogPromiseReject) {
        dialogPromiseReject();
        dialogPromiseRejct = null;
      }
    }
    
    function showDialog(title, text) {
      showModal(title, text);
      
      // We want to add a confirm and cancel button to the modal
      let modal = modalContainer.querySelector('.modal');
      
      let confirmButton = document.createElement('button');
      confirmButton.classList.add('modal-confirm');
      confirmButton.innerText = 'Confirm';
      
      let cancelButton = document.createElement('button');
      cancelButton.classList.add('modal-cancel');
      cancelButton.innerText = 'Cancel';
      
      modal.appendChild(confirmButton);
      modal.appendChild(cancelButton);
      
      // We want to focus the confirmButton so that the user can simply press Enter
      confirmButton.focus();
      
      // Return a promise that resolves when confirmed, else rejects
      return new Promise((resolve, reject) => {
        cancelButton.addEventListener('click', hideModal);
        confirmButton.addEventListener('click', () => {
          dialogPromiseReject = null; // Reset this
          hideModal();
          resolve();
        });
        // This can be used to reject from other functions
        dialogPromiseReject = reject;
      });
    }

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
