import React, { FC, useEffect, useState } from 'react';
import { Character } from '../../../../service/character.service';
import CharacterService from '../../../../service/character.service'
import {CharacterInformation,Button} from '../Character/CharacterInformation';
import AddCharacterForm from '../AddCharacterForm/AddCharacterForm';
import MessageService from '../../../../service/message.service';
import UpdateAvatarForm from '../AddCharacterForm/UploadAvatar';
import LazyLoad from 'react-lazyload';

interface ShowCharactersProps {}

const LoadingCharacter = () => (
  <div className="loading border border-gray-500 rounded-lg p-3 mb-3 transition-all duration-300 ease-in-out overflow-hidden hover:h-auto">
  </div>
)

const ShowCharacters: FC<ShowCharactersProps> = () => {
  
  const [characters, setCharacters] = useState<Character[]>([]);
  const [showAddForm, setShowAddForm] = useState(false)
  const [showUpdateAvatarForm, setShowUpdateAvatarForm] = useState(false)
  const [editingCharacter, setEditCharacter] = useState<Character|null>();
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const result = await CharacterService.GetAllCharacters();
        setCharacters(result);
      } catch (err) {
        MessageService.error('Failed to fetch characters');
      }
    };
    getCharacters();
  }, []);

  const handleAdd = async (newCharacter: Character) => {
    console.log('Add character');
    try {
      MessageService.success('Character added successfully');
      const addedCharacter = await CharacterService.AddCharacter(newCharacter);
      setCharacters([...characters, addedCharacter]);  // Update character list
    } catch (err) {
      MessageService.error('Failed to add character');
    }
  };
  const handleEdit = async (updatedCharacter: Character) => {
    try {
      const isOk = await CharacterService.UpdateCharacter(updatedCharacter);
      if (!isOk) {
        MessageService.error('Failed to update character');
        return;
      }
      setCharacters(characters.map(char => char.id === updatedCharacter.id ? updatedCharacter : char));
      MessageService.success('Character updated successfully');
    } catch (err) {
      MessageService.error('Failed to update character'+err);
    }
  };

  const handleUpdateAvatar = async (id: number, avatarFile: File | null) => {
    try {
      if (!avatarFile) {
        MessageService.error('No avatar file selected');
        return;
      }else{
        const updatedCharacter = await CharacterService.UpdateAvatar(id, avatarFile);
        if (!updatedCharacter) {
          MessageService.error('Failed to update avatar');
          return;
        }
        setCharacters(characters.map(char => char.id == id ? {...char, avatar : updatedCharacter.avatar } : char));
        MessageService.success('Avatar updated successfully');
      }
    } catch (err) {
      MessageService.error('Failed to update avatar'+err);
    }
  }
  // if (error) return <p>{error}</p>;

  const openForm = (character?: Character) => {
    setEditCharacter(character);
    setShowAddForm(true);
  };
  
  const DeleteCharacter = async(id: number)=>{
    console.log('Delete character');
    try {
      var deletedCharacter = await CharacterService.DeleteCharacter(id);
      if (deletedCharacter) {
        MessageService.success('Character deleted successfully');
        setCharacters(characters.filter((character) => character.id !== id));
      }
      else {
        MessageService.error('Failed to delete character');
      }
    } catch (err) {
      MessageService.error('Failed to delete character');
    }
  }
  function OpenFormUpdateAvatar(character?: Character): void {
    setEditCharacter(character);
    setShowUpdateAvatarForm(true);
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Character Manager</h1>
          <Button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={() => openForm()}>Add Character</Button>
        </div>
        <div>
          {characters.map((character) => (
            <LazyLoad key={character.id} placeholder={<LoadingCharacter />}>
              <CharacterInformation key={character.id} character={character}
              onEdit={() => openForm(character)} onDelete={DeleteCharacter} 
              onUpdateAvatar={()=>OpenFormUpdateAvatar(character)} />
            </LazyLoad>
          ))}
        </div>
      </div>
      {showAddForm && <AddCharacterForm initialData={editingCharacter||null} onSubmit={editingCharacter ? handleEdit : handleAdd} onClose={() => setShowAddForm(false)} />} 
      {showUpdateAvatarForm && <UpdateAvatarForm character={editingCharacter||null} onSubmit={handleUpdateAvatar} onClose={() => setShowUpdateAvatarForm(false)} />} 
    </div>
  );
};

export default ShowCharacters;
