
function SanitizeInput(input) {
  input = input.trim().toLowerCase();
  return input[0].toUpperCase() + input.slice(1);
}

function CreatePokemonCard(pokemon) {
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("rounded-lg", "shadow-md", "p-4", "w-screen", 'flex', 'justify-between', `${GetPokemonCardColor(pokemon.type)}`);
  pokemonCard.innerHTML = `
  <h2 class="flex flex-1 text-xl font-bold mb-2">No${pokemon.pokedexNumber} <img src="./pokeball.png" alt="${pokemon.name}" class="w-8 h-8"> ${pokemon.name}</h2>
  <h2 class="flex flex-1 text-lg font-semibold">${pokemon.type}</h2>
  `;
  return pokemonCard;
}

function PokemonExists(pokedexNumber) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("pokemon_")) {
      const storedPokemon = JSON.parse(localStorage.getItem(key));
      if (storedPokemon.pokedexNumber === pokedexNumber) {
        return true;
      }
    } }
    return false;
}

function GetPokemonCardColor(type) {
  switch (type.toLowerCase()) {
    case "fire":
      return "bg-red-200";
      case "water":
        return "bg-blue-200";
        case "grass":
          return "bg-green-200";
          case "electric":
            return "bg-yellow-200";
            case "psychic":
              return "bg-purple-200";
              case "ice":
                return "bg-cyan-200";
                case "dragon":
      return "bg-indigo-200";
      case "dark":
        return "bg-gray-800 text-white";
        case "fairy":
          return "bg-pink-200";
          default:
            return "bg-gray-200";
          }
    }
    
const showFormbtn = document.getElementById("toggleShowForm");
const pokemonForm = document.getElementById("pokemonForm");
const pokemonCreateForm = document.getElementById("pokemonCreateForm");

const storedPokemons = localStorage.length > 0 ? Object.values(localStorage).map(item => JSON.parse(item)) : [];
let loadedPokemons = [];

showFormbtn.addEventListener("click", () => {
  if (pokemonForm.style.display === "none") {
    pokemonForm.classList.toggle("hidden");
    showFormbtn.textContent = "Hide Form";
  } else {
    pokemonForm.classList.toggle("hidden");
    showFormbtn.textContent = "Show Form";
  }
});

window.onload = () => {
  storedPokemons.sort((a, b) => a.pokedexNumber - b.pokedexNumber);
  storedPokemons.forEach(pokemon => {
    const pokemonCard = CreatePokemonCard(pokemon);
    document.getElementById("pokemonContainer").appendChild(pokemonCard);
    loadedPokemons.push(pokemon);
  });
}

pokemonCreateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const pokedexNumber = document.getElementById("pokedexNumber").value;
  const name = SanitizeInput(document.getElementById("pokemonName").value);
  const type = SanitizeInput(document.getElementById("pokemonType").value);

  if (PokemonExists(pokedexNumber)) {
    alert("A Pokémon with this Pokedex number already exists.");
    return;
  }

  const newPokemon = {
    pokedexNumber,
    name,
    type
  };

  const pokemonCard = CreatePokemonCard(newPokemon);
  localStorage.setItem(`pokemon-${pokedexNumber}`, JSON.stringify(newPokemon));
  loadedPokemons.push(newPokemon);
  loadedPokemons = loadedPokemons.sort((a, b) => a.pokedexNumber - b.pokedexNumber);
  document.getElementById("pokemonContainer").replaceChildren(...loadedPokemons.map(pokemon => CreatePokemonCard(pokemon)));

  pokemonCreateForm.reset();
});