let pokemonRepository = (function () {
    let pokemonList = []

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if ((typeof pokemon === "object") && (Object.keys(pokemon) [0] === "name") && (Object.keys(pokemon [1] === "height"))
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
        //Added event listener to the button.
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
                detailsUrl: item.url,
                imageUrl: item.myImage,
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
            showModal(pokemon.name, pokemon.detailsUrl)
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

    //console.log(pokemonRepository.getAll())

    pokemonRepository.loadList().then(function() {

    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);  
    });
});

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
    
    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('Modal title', 'This is the modal content!');
      });
      
      document.querySelector('#show-dialog').addEventListener('click', () => {
        showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
          alert('confirmed!');
        }, () => {
          alert('not confirmed');
        });
      });
    
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });
      
      modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal container,
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });

      let container = document.querySelector("#image-container");
      let myImage = document.createElement("img");
      myImage.src = "";
      container.appendChild(myImage);