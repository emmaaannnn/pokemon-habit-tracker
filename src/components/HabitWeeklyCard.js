import React from 'react';

const HabitWeeklyCard = ({ habit }) => {
  const { name, linkedPokemon, weeklyCompletion } = habit;

  return (
    <div className="HabitWeeklyCard">
      <h2>{name}</h2>
      <div className="PokemonInfo">
        <p>Linked Pokémon: {linkedPokemon.name}</p>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${linkedPokemon.pokemonId}.png`}
          alt={linkedPokemon.name}
          className="PokemonSprite"
        />
      </div>
      <table className="WeeklyProgress">
        <thead>
          <tr>
            <th>Date</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {weeklyCompletion.map((day) => (
            <tr key={day.date}>
              <td>{day.date}</td>
              <td>{day.completed ? '✔️' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HabitWeeklyCard;