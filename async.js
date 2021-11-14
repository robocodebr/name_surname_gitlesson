/*let promise = new Promise(function(resolve, reject) {

    setTimeout(function() {
        console.log("yee!");
        resolve();
    }, 2000);

    reject();
});

promise
.then(function() {
    console.log("lol");
}).then(function() {
    console.log("*-*")
}).catch(function() {
    console.log("error")
});

*/

let mainElement = document.getElementById("container");


fetch("https://pokeapi.co/api/v2/pokemon?limit=127")
.then(data => data.json())
.then(function(data){
    console.log(data.results);
    let requests = data.results.map(function(element) {
        return fetch(element.url);
    })
    console.log(requests);
    Promise.all(requests)
    .then(function(pokemons) {
        return Promise.all(pokemons.map(p=>p.json()))
    })
    .then(function (pokemons){
        let stringWithAllPokes = "";
        pokemons.forEach(function(p){
            stringWithAllPokes += drawPokemon(p);
        });
        mainElement.innerHTML = stringWithAllPokes;
    });
})



function drawPokemon(pokemonData) {
    let pokemon = `<div class="card">
    <p>${pokemonData.id}</p>
    <hr>
    <p class="name">${pokemonData.name}</p>
    <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
    <div class="params">
        <p class="hp">&#10084; ${pokemonData.stats[0].base_stat}</p>
        <p class="attack">&#9876; ${pokemonData.stats[1].base_stat}</p>
        <p class="defence">&#9825; ${pokemonData.stats[2].base_stat} </p>
</div>
</div>`
return pokemon;
}



