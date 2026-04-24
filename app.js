
function SanitizeInput(input) {
  input = input.trim().toLowerCase();
  return input[0].toUpperCase() + input.slice(1);
}

function CreatePokemonCard(pokemon) {
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("rounded-lg", "shadow-md", "p-4", "w-screen", 'flex', 'justify-between', `${GetPokemonCardColor(pokemon.type)}`);
  pokemonCard.innerHTML = `<div class="flex flex-1 justify-evenly p-2">
  <p class="flex text-xl font-bold mb-2">No${pokemon.pokedexNumber} <img src="./pokeball.png" alt="${pokemon.name}" class="w-8 h-8"> ${pokemon.name}</p>
  <p class="text-lg font-semibold">${pokemon.type}</p>
  </div>
  <div class="flex flex-1 justify-end items-center gap-2">
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="ToggleEditPokemon(${pokemon.pokedexNumber})">Edit</button>
  <form id="editForm-${pokemon.pokedexNumber}" class="hidden mt-2">
    <input type="text" id="newName-${pokemon.pokedexNumber}" placeholder="New Name" class="border rounded py-1 px-2 mb-2 w-full">
    <input type="text" id="newType-${pokemon.pokedexNumber}" placeholder="New Type" class="border rounded py-1 px-2 mb-2 w-full">
    <button type="button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onclick="EditPokemon(${pokemon.pokedexNumber})">Save</button>
  </form>
  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="DeletePokemon(${pokemon.pokedexNumber})">Delete</button>
  </div>
  `;
  return pokemonCard;
}

function ToggleEditPokemon(pokedexNumber) {
  const pokemon = loadedPokemons.find(p => +p.pokedexNumber === +pokedexNumber);
  if (!pokemon) {
    alert("Pokemon not found!");
    return;
  }
  const editForm = document.getElementById(`editForm-${pokedexNumber}`);
  editForm.classList.toggle("hidden");
  const newNameInput = document.getElementById(`newName-${pokedexNumber}`);
  const newTypeInput = document.getElementById(`newType-${pokedexNumber}`);
}

function EditPokemon(pokedexNumber) {
  const pokemon = loadedPokemons.find(p => +p.pokedexNumber === +pokedexNumber);
  if (!pokemon) {
    alert("Pokemon not found!");
    return;
  }
  const newName = document.getElementById(`newName-${pokedexNumber}`).value;
  const newType = document.getElementById(`newType-${pokedexNumber}`).value;
  if (newName) pokemon.name = SanitizeInput(newName);
  if (newType) pokemon.type = SanitizeInput(newType);
  localStorage.setItem(`pokemon-${pokedexNumber}`, JSON.stringify(pokemon));
  document.getElementById("pokemonContainer").replaceChildren(...loadedPokemons.map(p => CreatePokemonCard(p)));
}

function DeletePokemon(pokedexNumber) {
  console.log(`Deleting Pokemon with Pokedex Number: ${pokedexNumber}`);
  localStorage.removeItem(`pokemon-${pokedexNumber}`);
  loadedPokemons = loadedPokemons.filter(p => +p.pokedexNumber !== +pokedexNumber);
  console.log(loadedPokemons);
  document.getElementById("pokemonContainer").replaceChildren(...loadedPokemons.map(pokemon => CreatePokemonCard(pokemon)));
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
  if (pokemonForm.classList.contains("hidden")) {
    pokemonForm.classList.remove("hidden");
    showFormbtn.textContent = "Hide Form";
  } else {
    pokemonForm.classList.add("hidden");
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