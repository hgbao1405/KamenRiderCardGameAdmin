import { useEffect, useState } from "react";
import CharacterService, { Character } from "../../../../service/character.service";
import { Button } from "../Character/CharacterInformation";
import Select from 'react-select';
import CharacterTypeService, { CharacterType } from "../../../../service/characterType.service";
import MessageService from "../../../../service/message.service";
import './form.css';  
import { Form } from "../../../../service/form.service";
import FormTypeService from "../../../../service/formtype.service";
import e from "express";

interface FormProps {
  onSubmit: (form: Form) => Promise<boolean>;
  onClose: () => void;
  initialData: Form|null;
}

const AddFormForm: React.FC<FormProps> = ({ onSubmit, onClose,initialData }) => {
  const [formData, setFormData] = useState<Form>({
    id: 0,
    name: '',
    description: '',
    avatar: '',
    speed: 0,
    attack: 0,
    kick: 0, 
    jump: 0,
    hpForm: 100,
    idTypeForm:0,
    idCharacter:0
  }); 

  const [FormTypes, setFormTypes] = useState<any[]>([]);
  const [Characters, setCharacters] = useState<any[]>([]);

  const getCharacterTypeById: (id: number) => number = (id: number) => {
    const result = Characters?.find(char => char.value === id);
    return result?.kamenRiderTypeId;
  }
  
  const getFormTypes = async (id: number) => {
    try {
        const result = await FormTypeService.GetListTypeFormByKamenRiderTypeId(id);
        const options = result.map(type => ({ value: type.id, label: type.name }));
        options.push({ value: 0, label: 'Select Form Type' });
        setFormTypes(options);
    } catch (err) {
      MessageService.error('Failed to fetch kamen rider types');
      onClose();
    }
  }

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const result = await CharacterService.GetAllCharacters();
        const options = result.map(char => ({ value: char.id, label: char.name, kamenRiderTypeId: char.kamenRiderTypeId }));
        options.push({ value: 0, label: 'Select Character', kamenRiderTypeId: 0});
        setCharacters(options);
      } catch (err) {
        MessageService.error('Failed to fetch kamen rider types');
        onClose();
      }
      finally{
        if (initialData) {
          setFormData(initialData);
        }
      }
    }

    getCharacters();
  }, [initialData]);

// useEffect khác để theo dõi khi Characters được cập nhật
useEffect(() => {
  if (Characters.length > 0 && formData.idCharacter) {
    const idtype = getCharacterTypeById(formData.idCharacter);
    if (idtype !== undefined) {
      getFormTypes(idtype);
    } 
  }
}, [Characters, formData.idCharacter]); // Theo dõi sự thay đổi của Characters và initialData

  const handleSelectChangeType = (selectedOption: any) => {
    setFormData(prevform => ({ ...prevform, idTypeForm: selectedOption.value }));
    console.log(formData.idTypeForm);
  }
  //Thay đổi nhân vật có loại khác sẽ chọn lại loại
  const handleSelectChangeCharacter = (selectedOption: any) => {
    const previousType = getCharacterTypeById(formData.idCharacter);
    const newType = getCharacterTypeById(selectedOption.value);

    // Nếu nhân vật mới có loại khác với nhân vật trước, load lại các loại form
    if (previousType !== newType) {
      setFormData(prevForm => ({ 
        ...prevForm, 
        idCharacter: selectedOption.value, 
        idTypeForm: 0 // Reset lại form type khi thay đổi nhân vật
      }));
      getFormTypes(newType);
    } else {
      setFormData(prevForm => ({ ...prevForm, idCharacter: selectedOption.value }));
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'name' || name === 'description' ? value : Number(value) }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    onSubmit(formData).then((res) => {
      if (res) {
        onClose();
      }
    });
  };
  const isEditing = !!initialData;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-5 text-center">{isEditing ? 'Edit Character' : 'Add New Character'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-bold text-sm" htmlFor="kamenRiderTypeId">Kamen Rider</label>
            <Select className="basic-single w-full border-gray-300 focus:border-black-500 rounded text-sm" 
            isSearchable={true}
            classNamePrefix="select"
            options={Characters}
            value={Characters.find((type) => type.value === formData.idCharacter)}
            onChange={handleSelectChangeCharacter}
            required />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-bold text-sm" htmlFor="kamenRiderTypeId">Character type:</label>
            <Select className="basic-single w-full border-gray-300 focus:border-black-500 rounded text-sm" 
            isDisabled={formData.idCharacter==0}
            isSearchable={true}
            classNamePrefix="select"
            options={FormTypes}
            value={FormTypes.find((type) => type.value === formData.idTypeForm)}
            onChange={handleSelectChangeType}
            required />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-bold text-sm" htmlFor="name">Name:</label>
            <input className="w-full p-2 border border-gray-300 rounded text-sm" type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-bold text-sm" htmlFor="description">Description:</label>
            <textarea className="w-full p-2 border border-gray-300 rounded text-sm" id="description" name="description"
             value={formData.description} onChange={handleChange} required />
          </div>
          <div className="mb-4">
              <label className="block mb-1 font-bold text-sm" htmlFor="hpForm">Health Form:</label>
              <input className="w-full p-2 border border-gray-300 rounded text-sm" type="number" step={0.1}
               id="hpForm"
               name="hpForm" min="0" max="1000" value={formData.hpForm} onChange={handleChange} required />
            </div>
          <div className="flex justify-between gap-3">
            <div className="w-full">
              <label className="block mb-1 font-bold text-sm" htmlFor="speed">Speed:</label>
              <input className="w-full p-2 border border-gray-300 rounded text-sm" type="number" step={0.1} id="speed" 
              name="speed" min="0" max="150" value={formData.speed} onChange={handleChange} required />
            </div>
            <div className="w-full">
              <label className="block mb-1 font-bold text-sm" htmlFor="attack">Attack:</label>
              <input className="w-full p-2 border border-gray-300 rounded text-sm" type="number" step={0.1} id="attack" name="attack" 
              min="0" max="100" value={formData.attack} onChange={handleChange} required />
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <div className="w-full">
              <label className="block mb-1 font-bold text-sm" htmlFor="kick">Kick:</label>
              <input className="w-full p-2 border border-gray-300 rounded text-sm" type="number"
               step={0.1} id="kick" name="kick" min="0" max="100" value={formData.kick} onChange={handleChange} required />
            </div>
            <div className="w-full">
              <label className="block mb-1 font-bold text-sm" htmlFor="jump">Jump:</label>
              <input className="w-full p-2 border border-gray-300 rounded text-sm" type="number"
               step={0.1} id="jump" name="jump" min="0" max="100" value={formData.jump} onChange={handleChange} required />
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
  export default AddFormForm;