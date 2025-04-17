import '../styles/PokemonParty.css'; // Import CSS for styling

import React from 'react';

const PokemonCard = ({ name, level, xp }) => {
  return (
    <div className ="PokemonCard" >
      {name !== 'Empty Slot' ? (
        <div>
          <h3>{name}</h3>
          <p>Level: {level}</p>
          <p>XP: {xp}</p>
        </div>
      ) : (
        <p>No Pokémon in this slot</p>
      )}
    </div>
  );
};

export default PokemonCard;