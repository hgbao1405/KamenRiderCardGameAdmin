import React, { useState } from 'react'
import { Character } from '../../../../service/character.service';
import './CharacterInformation.css';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' }> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  return (
    <button className={`${className}`} {...props}>
      {children}
    </button>
  )
}

const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
  <div className="progress-bar">
    <div className="progress-bar-fill" style={{ width: `${value}%` }}></div>
  </div>
)

const CharacterInformation: React.FC<{ 
  character: Character;
  onEdit: (character: Character) => void; 
  onDelete: (id: number) => void,
  onUpdateAvatar: (id: number) => void; }>
   = ({ character, onEdit, onDelete, onUpdateAvatar }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="character-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="character-header">
        <img src={'https://localhost:7223/'+character.avatar + `?height=48&width=48`} onError={(e) => e.currentTarget.src = '/placeholder.png'} alt={character.name} className="character-image" />
        <h2 className="character-name">{character.name}</h2>
      </div>
      {isHovered && (
        <>
          <p className="character-description">{character.description}</p>
          <div className="character-stats">
            <div className="stat-item">
              <span className="stat-label">Speed</span>
              <ProgressBar value={character.speed} />
            </div>
            <div className="stat-item">
              <span className="stat-label">Attack</span>
              <ProgressBar value={character.attack} />
            </div>
            <div className="stat-item">
              <span className="stat-label">Kick</span>
              <ProgressBar value={character.kick} />
            </div>
            <div className="stat-item">
              <span className="stat-label">Health</span>
              <ProgressBar value={character.health} />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button className='px-4 py-2 color-white bg-yellow-500 text-white rounded'onClick={() => onEdit(character)}>Edit</Button>
            <Button className='px-4 py-2 bg-gray-200 rounded' onClick={() => onUpdateAvatar(character.id)}>Update Avatar</Button>
            <Button className='px-4 py-2 bg-red-500 text-white rounded' onClick={() => onDelete(character.id)}>Delete</Button>
          </div>
        </>
      )}
    </div>
  )
}
export {CharacterInformation,Button};