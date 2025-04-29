import '../styles/PokemonParty.css';

import React from 'react';

const PokemonCard = ({ name, level, xp, sprite }) => {
  return (
    <div className ="PokemonCard" >
      {name !== 'Empty Slot' ? (
        <div>
          <h4>{name}</h4>
          <img src={sprite} alt={name}/>
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