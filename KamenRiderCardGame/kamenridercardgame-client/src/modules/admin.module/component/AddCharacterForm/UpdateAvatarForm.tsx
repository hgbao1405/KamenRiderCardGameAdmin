import React, { useState, ChangeEvent, useEffect } from 'react';
import MessageService from '../../../../service/message.service';
import { Button } from '../Character/CharacterInformation';
import { Form } from '../../../../service/form.service';

interface UpdateAvatarFormProps {
  character: Form | null;
  onClose: () => void;
  onSubmit: (id: number, avatarFile: File | null) => void;
}

const UpdateAvatarForm: React.FC<UpdateAvatarFormProps> = ({ character, onClose, onSubmit }) => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(character?"https://localhost:7223/"+ character.avatar : null);

  useEffect(() => {
    if (!character) {
      MessageService.error('Character not found');
      onClose();
    }
  }, [character]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(character)
      onSubmit(character.id, avatarFile);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-5 text-center">Update Avatar for {character?.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-bold text-sm" htmlFor="avatar">Choose new avatar:</label>
            <input
              className="w-full p-2 border border-gray-300 rounded text-sm"
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
          {previewUrl && (
            <div className="avatar-preview">
              <img src={previewUrl} alt="Avatar preview" className="avatar-image" style={{ maxWidth: '200px', maxHeight: '200px' }} />
            </div>
          )}
          <div className="flex justify-end gap-3 mt-6">
            <Button className='px-4 py-2 bg-gray-200 rounded' type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button className='px-4 py-2 bg-blue-500 text-white rounded' type="submit" variant="primary">Update Avatar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAvatarForm;