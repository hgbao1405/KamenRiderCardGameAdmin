import React, { useState } from 'react'
import { Character } from '../../../../service/character.service';

const LoadingAvatarCharacter = () => (
  <div className="Avatar character loading">
    <div className='height=[48] width=[48] rounded-full mr-3 bg-gray-500'></div>
  </div>
)
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
  <div className="bg-gray-200 rounded h-1">
    <div className="bg-blue-500 h-full rounded" style={{ width: `${value}%` }}></div>
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
      className="border border-gray-300 rounded-lg p-3 mb-3 transition-all duration-300 ease-in-out overflow-hidden hover:h-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="character-header flex items-center mb-3">
        <img src={'https://localhost:7223/'+character.avatar + `?height=48&width=48`} 
        onError={(e) => e.currentTarget.src = '/placeholder.png'} alt={character.name} 
        className="character-image character-image w-12 h-12 rounded-full mr-3" />
        
        <h2 className="character-name flex items-center mb-3">{character.name}</h2>
      </div>
      {isHovered && (
        <>
          <p className="character-description text-gray-500 mb-3 text-sm">{character.description}</p>
          <div className="character-stats mb-3">
            <div className="stat-item mb-1.5">
              <span className="stat-label text-xs font-bold">Speed</span>
              <ProgressBar value={character.speed} />
            </div>
            <div className="stat-item mb-1.5">
              <span className="stat-label text-xs font-bold">Attack</span>
              <ProgressBar value={character.attack} />
            </div>
            <div className="stat-item mb-1.5">
              <span className="stat-label text-xs font-bold">Kick</span>
              <ProgressBar value={character.kick} />
            </div>
            <div className="stat-item mb-1.5">
              <span className="stat-label text-xs font-bold">Health</span>
              <ProgressBar value={character.health} />
            </div>
          </div>
          <div className="flex justify-between">
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