/// <reference path="./node_modules/@types/jquery/index.d.ts" />

let limit: number = 20;
let offset: number = 0;
let back;

$(document).ready(function(){
    getPokemons();
});

$("body").on("click", "button", function() {
    if (!($(this).attr('id') == "next") || !($(this).attr('id') == "prev")) {
        let id: any = $(this).attr('id');
        pokeDetails(id);
    }
});

async function getPokemons() {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
    const pokelist = await $.get(url);

    $('#pokemon').empty();

    let html = '';
    for (const pokemon of pokelist.results) {
        html = `<tr><td>${pokemon.name}</td><td><button id="${pokemon.name}" type="button" class="btn btn-primary">Details</button></td></tr>`;
        $('#pokemon').append(html);
    }
}


$("#next").click(function () {
    offset += 10;
    if (offset >= 10) {
        $("#prev").attr("style", "display: inline");
    }
    getPokemons();
});

$("#prev").click(function () {
    offset -= 10;
    if (offset < 10) {
        $("#prev").attr("style", "display: none");
    }
    getPokemons();
});

$("#back").click(function () {
    $("#next").attr("style", "display: inline");
    if (offset < 10) {
        $("#prev").attr("style", "display: none");
    } else {
        $("#prev").attr("style", "display: inline");
    }
    $("#back").attr("style", "display: none");
    $("#pokemon").attr("style", "display: block");
    $('#details').attr("style", "display: none");
});

async function pokeDetails(pokemonname: string) {
    let html = ``;
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonname}`;
    const pokeDet = await $.get(url);

    $('#details').empty();
    html = `<tr><td>Name: </td><td>${pokeDet.name}</td></tr>
    <tr><td>Image: </td><td><img src="${pokeDet.sprites.front_default}"/></td></tr>
    <tr><td>Weight: </td><td>${pokeDet.weight}</td></tr>`;
    for (let i = 0; i < pokeDet.abilities.length; i++) {
        html += `<tr><td>Abilityname: </td><td>${pokeDet.abilities[i].ability.name}</td></tr>`;
    }
    $('#details').append(html);
    $("#pokemon").attr("style", "display: none");
    $("#next").attr("style", "display: none");
    $("#prev").attr("style", "display: none");
    $("#back").attr("style", "display: inline");
    $('#details').attr("style", "display: block");
}