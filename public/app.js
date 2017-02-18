var appendElements = function(){
  for(var i = 0; i < (arguments.length-1); i++){
    var child = arguments[i];
    var parent = arguments[i + 1];
    parent.appendChild(child)
  }
};

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();

  request.open('GET', url);
  request.onload = callback;
  request.send();
};

var setUpPage = function(){
  var score = localStorage.getItem('score') || 0;
  var url = "https://pokeapi.co/api/v2/pokemon/?limit=1000";
  makeRequest(url, populateSelect);
};

var populateSelect = function(){
  if(this.status !== 200) return;

  var jsonData = this.responseText;
  var pokemonObject = JSON.parse(jsonData);
  var pokemonList = pokemonObject.results;
  localStorage.setItem('pokemonArray', JSON.stringify(pokemonList));
  var pokemonSelect = document.querySelector('#pokemon-guess-select')
  // console.log(pokemonList);

  pokemonList.forEach(function(pokemon){
    addSelectOption(pokemon, pokemonSelect);
  });

};

var addSelectOption = function(item, select){
  var option = document.createElement('option');
  var name = item.name;
  var formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  // console.log(formattedName);
  option.value = name;
  option.innerText = formattedName;

  appendElements(option, select);
};

var loadPokemonQuestion = function(){
  var pokemonList = JSON.parse(localStorage.getItem('pokemonArray'));
  // console.log(pokemonList.length);
  var randomIndex = (Math.random() * (pokemonList.length - 0)).toFixed(0);
  var pokemonToGuess = pokemonList[randomIndex].name;
  localStorage.setItem('currentPokemon', pokemonToGuess);
  // console.log(pokemonToGuess);
  var pokemonToGuessUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonToGuess
  makeRequest(pokemonToGuessUrl, displaySprites);
};

var displaySprites = function(){
  var jsonData = this.responseText;
  var pokemonSprites = JSON.parse(jsonData).sprites;
  var pokemonSprite = pokemonSprites.front_default;
  // console.log(pokemonSprites);
  createDisplay(pokemonSprite);
};

var createDisplay = function(spriteUrl){
  var container = document.querySelector('#whos-that-pokemon-container');
  var oldSprite = document.querySelector('#whos-that-pokemon-container *');
  if(oldSprite !== null){
    container.removeChild(oldSprite);
  }
  var image = document.createElement('img');
  image.src = spriteUrl;
  image.class = "pokemon-image";

  appendElements(image, container);
};

var makeGuess = function(){
  var pokemonSelect = document.querySelector('#pokemon-guess-select');
  var guess = pokemonSelect.value;
  var answer = localStorage.getItem('currentPokemon');
  var correct = false;
  if(guess === answer) correct = true;

  var score = JSON.parse(localStorage.getItem('score'));
  if(score === null) score = 0;
  if(correct === true) score += 1;
  localStorage.setItem('score', score);

  var defaultOption = document.querySelector('#default-select-option');
  defaultOption.selected = true;
  loadPokemonQuestion();
};

var app = function(){
  setUpPage();
  loadPokemonQuestion();

  var submitButton = document.querySelector('#pokemon-guess-submit');
  submitButton.onclick = makeGuess;
};

window.onload = app;

//http://pokeapi.co/api/v2/pokemon/number/
