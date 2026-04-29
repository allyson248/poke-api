'use client'
//
import { useRef, useState } from "react";

export default function PokemonApi(){

    const pokemon = useRef("");
    const [pokemonEncontrado, setPokemonEncontrado] = useState(null);
    const [listaPokemons, setListaPokemons] = useState([]);

    async function adicionarPokemon() {
    let nome = pokemon.current.value;

    if(nome !== "") {
        let url = `https://pokeapi.co/api/v2/pokemon/${nome}`;
        const resposta = await fetch(url);
        const corpo = await resposta.json();

        setListaPokemons([...listaPokemons, corpo]);
    }
}

function removerPokemon(index) {
    let novaLista = listaPokemons.filter((_, i) => i !== index);
    setListaPokemons(novaLista);
}


    async function consultarPokemon() {
        let pokemonDigitado = pokemon.current.value;

        if(pokemonDigitado !== "") {
            let url = `https://pokeapi.co/api/v2/pokemon/${pokemonDigitado}`;
            const resposta = await fetch(url);
            const corpo = await resposta.json();
            setPokemonEncontrado(corpo);
           
        } else {
            alert("Digite um pokemon!");
        }
    }

    return(
        <div>
            <h1>Pokemon</h1>

            <input ref={pokemon} type="text" />
            <button onClick={consultarPokemon}>Consultar</button> <button onClick={adicionarPokemon}>Adicionar</button>

            {pokemonEncontrado && (
                <div>
                    <b>Nome: {pokemonEncontrado.name}</b>
                    <br />

                    <b>Tipo: {
                        pokemonEncontrado.types
                        .map(t => t.type.name)
                        .join(", ")
                    }</b>
                    <br />

                    <b>Habilidades: {
                        pokemonEncontrado.abilities
                        .map(a => a.ability.name)
                        .join(", ")
                    }</b>
                    <br />

                    <img 
                        src={pokemonEncontrado.sprites.front_default} 
                        alt="pokemon"
                    />
                </div>
            )}

            <div>
                
                {listaPokemons.map((p, index) => (
    <div key={index}>
        <b>{p.name}</b>

        <button onClick={() => removerPokemon(index)}>
            Remover
        </button>

        <br />

        Tipos: {p.types.map(t => t.type.name).join(", ")}

        <br />

        <img src={p.sprites.front_default} />
    </div>
))}

            </div>
        </div>
    )
}
