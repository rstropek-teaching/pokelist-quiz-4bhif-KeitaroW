/// <reference path="./node_modules/@types/jquery/index.d.ts" />

let limit: number = 20;
let offset: number = 0;

$(document).ready(function(){
    getPokemons();
});

async function getPokemons() {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
    const pokelist = await $.get(url);

    $('#pokemon').empty();

    let html = '';
    for (const pokemon of pokelist.results) {
        html = `<li>${pokemon.name}</li>`;
        $('#pokemon').append(html);
    }
}