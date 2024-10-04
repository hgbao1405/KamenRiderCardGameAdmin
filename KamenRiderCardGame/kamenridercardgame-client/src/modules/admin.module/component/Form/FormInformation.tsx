import React, { useState } from 'react'
import { Form } from '../../../../service/form.service';
import {CharacterProgressBar} from '../../../../components/ui/ui';

const LoadingAvatarForm = () => (
  <div className='h-[48] w-[48] rounded-full mr-3 bg-gray-500'></div>
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
const FormInformation: React.FC<{ 
  Form: Form;
  onEdit: (Form: Form) => void; 
  onDelete: (id: number) => void,
  onUpdateAvatar: (id: number) => void; }>
   = ({ Form, onEdit, onDelete, onUpdateAvatar }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="border border-gray-300 rounded-lg p-3 mb-3 transition-all duration-300 ease-in-out overflow-hidden hover:h-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="Form-header flex items-center mb-3">
        <img src={'https://localhost:7223/'+Form.avatar + `?height=48&width=48`} 
        onError={(e) => e.currentTarget.src = '/placeholder.png'} alt={Form.name} 
        className="Form-image Form-image w-12 h-12 rounded-full mr-3" />
        
        <h2 className="Form-name flex  items-center mb-3">{Form.name}</h2>
      </div>
      {isHovered && (
        <>
          <p className="Form-description text-gray-500 mb-3 text-sm">{Form.description}</p>
          <div className="Form-stats mb-3">
            <div className="mb-1.5">
              <span className="text-xs font-bold">Speed:</span>
              <CharacterProgressBar value={Form.speed} maxValue={150} donvi='m/s'/>
            </div>
            <div className="mb-1.5">
              <span className="text-xs font-bold">Attack:</span>
              <CharacterProgressBar value={Form.attack} maxValue={100} donvi='t' />
              {/* <ProgressBar value={Form.attack} /> */}
            </div>
            <div className="mb-1.5">
              <span className="text-xs font-bold">Kick:</span>
              <CharacterProgressBar value={Form.kick} maxValue={100} donvi='t'/>
              {/* <ProgressBar value={Form.kick} /> */}
            </div>
            <div className="mb-1.5">
              <span className="text-xs font-bold">Jump:</span>
              <CharacterProgressBar value={Form.jump} maxValue={1000} donvi='m'/>
              {/* <ProgressBar value={Form.jump} /> */}
            </div>
            <div className="mb-1.5">
                <span className="text-xs font-bold">Health Form:</span>
                <CharacterProgressBar value={Form.hpForm} maxValue={1000} />
              {/* <ProgressBar value={Form.health} /> */}
            </div>
          </div>
          <div className="flex justify-between">
            <Button className='px-4 py-2 color-white bg-yellow-500 text-white rounded'onClick={() => onEdit(Form)}>Edit</Button>
            <Button className='px-4 py-2 bg-gray-200 rounded' onClick={() => onUpdateAvatar(Form.id)}>Update Avatar</Button>
            <Button className='px-4 py-2 bg-red-500 text-white rounded' onClick={() => onDelete(Form.id)}>Delete</Button>
          </div>
        </>
      )}
    </div>
  )
}
export {FormInformation,Button};