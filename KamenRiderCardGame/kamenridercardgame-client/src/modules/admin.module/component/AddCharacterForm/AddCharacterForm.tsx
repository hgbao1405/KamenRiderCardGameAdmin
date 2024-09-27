import { useEffect, useState } from "react";
import { Character } from "../../../../service/character.service";
import { Button } from "../Character/CharacterInformation";

interface CharacterFormProps {
  onSubmit: (character: Character) => void;
  onClose: () => void;
  initialData: Character|null;
}

const AddCharacterForm: React.FC<CharacterFormProps> = ({ onSubmit, onClose,initialData }) => {
  const [formData, setFormData] = useState<Character>({
    id: 0,
    name: '',
    description: '',
    avatar: '',
    speed: 50,
    attack: 50,
    kick: 50, 
    health: 100
  }); 

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'name' || name === 'description' ? value : Number(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };
  const isEditing = !!initialData;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-5 text-center">{isEditing ? 'Edit Character' : 'Add New Character'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-bold text-sm" htmlFor="name">Name:</label>
            <input className="w-full p-2 border border-gray-300 rounded text-sm" type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-bold text-sm" htmlFor="description">Description:</label>
            <textarea className="w-full p-2 border border-gray-300 rounded text-sm" id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="flex justify-between gap-3">
            <div className="w-full">
              <label className="block mb-1 font-bold text-sm" htmlFor="speed">Speed:</label>
              <input className="w-full p-2 border border-gray-300 rounded text-sm" type="number" id="speed" name="speed" min="0" max="100" value={formData.speed} onChange={handleChange} required />
            </div>
            <div className="w-full">
              <label className="block mb-1 font-bold text-sm" htmlFor="atk">Attack:</label>
              <input className="w-full p-2 border border-gray-300 rounded text-sm" type="number" id="atk" name="atk" min="0" max="100" value={formData.attack} onChange={handleChange} required />
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <div className="w-full">
              <label className="block mb-1 font-bold text-sm" htmlFor="kick">Kick:</label>
              <input className="w-full p-2 border border-gray-300 rounded text-sm" type="number" id="kick" name="kick" min="0" max="100" value={formData.kick} onChange={handleChange} required />
            </div>
            <div className="w-full">
              <label className="block mb-1 font-bold text-sm" htmlFor="health">Health:</label>
              <input className="w-full p-2 border border-gray-300 rounded text-sm" type="number" id="health" name="health" min="0" max="100" value={formData.health} onChange={handleChange} required />
            </div>
          </div>
          <div className="flex justify-between gap-3 pt-4">
            <Button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
  export default AddCharacterForm;