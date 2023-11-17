document.addEventListener('DOMContentLoaded', function () {

    fetch('https://pokeapi.co/api/v2/pokemon/')
        .then(response => response.json())
        .then(data => {
            document.querySelector('body').insertAdjacentHTML('beforeend', `<div><input type="number" min="0" max="${data.count}"></input><button onclick="pokemonNumber = document.querySelector('input').value; document.getElementById('pokedex').innerHTML = ''; fetchPokemonData();">Go</button></div>`);
            document.querySelector('body').insertAdjacentHTML('beforeend', ``);
        })
    fetchPokemonData();
});

let pokemonNumber = 1;

function pokemonNumberPlus() {
    pokemonNumber++;
    document.getElementById('pokedex').innerHTML = "";
    fetchPokemonData();
}

function pokemonNumberMoins() {
    pokemonNumber--;
    document.getElementById('pokedex').innerHTML = "";
    fetchPokemonData();
}

async function fetchPokemonData() {
    const apiURL = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
    }
}

function displayPokemon(pokemon) {
    const pokedexContainer = document.getElementById('pokedex');

    const pokemonNumber = pokemon.id.toString().padStart(3, '0');
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const pokemonType = pokemon.types[0].type.name;
    const pokemonColor = getTypeColor(pokemonType);

    const html = `
        <div class=pokemon" style="background-color: ${pokemonColor};">
            <img src="${pokemon.sprites.front_default}" alt="${pokemonName}">
            <h2>${pokemonName}</h2>
            <p>#${pokemonNumber}</p>
            <p>Type: ${pokemonType}</p>
        </div>
    `;

    pokedexContainer.innerHTML = html;
}

function getTypeColor(type) {
    switch (type) {
        case 'normal':
            return '#A8A77A';
        case 'fire':
            return '#EE8130';
        case 'water':
            return '#6390F0';
        case 'electric':
            return '#F7D02C';
        case 'grass':
            return '#7AC74C';
        case 'ice':
            return '#96D9D6';
        case 'fighting':
            return '#C22E28';
        case 'poison':
            return '#A33EA1';
        case 'ground':
            return '#E2BF65';
        case 'flying':
            return '#A98FF3';
        case 'psychic':
            return '#F95587';
        case 'bug':
            return '#A6B91A';
        case 'rock':
            return '#B6A136';
        case 'ghost':
            return '#735797';
        case 'dragon':
            return '#6F35FC';
        case 'dark':
            return '#705746';
        case 'steel':
            return '#B7B7CE';
        case 'fairy':
            return '#D685AD';
    }
}