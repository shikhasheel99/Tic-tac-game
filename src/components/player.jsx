
import { useState } from 'react';
 
export default function Player({name, symbol, isActive, handlePlayerNameChange}) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
 
  const handleEdit = () => {
    setIsEditing((previousState) => !previousState);
 
    if(isEditing) handlePlayerNameChange(symbol,playerName);
  }
 
  const handleInput = (event) => {
    setPlayerName(event.target.value);
  }
 
  let editablePlayerName = <span className="player-name">{playerName}</span>;
 
  if(isEditing) {
    editablePlayerName = <input type="text" value={playerName} required onChange={handleInput}/>
  }
  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditing ? 'Save' : "Edit"}</button>
    </li>
  )
};
 