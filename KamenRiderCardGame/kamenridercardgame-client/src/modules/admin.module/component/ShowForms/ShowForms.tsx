import React, { FC, useEffect, useState } from 'react';
import { Form, SearchForm } from '../../../../service/form.service';
import FormService from '../../../../service/form.service'
import MessageService from '../../../../service/message.service';
import LazyLoad from 'react-lazyload';
import { FormInformation } from '../Form/FormInformation';
import { Button } from '../../../../components/ui/ui';
import AddFormForm from '../AddCharacterForm/AddFormForm';
import UploadAvatarForm from '../AddCharacterForm/UpdateAvatarForm';
import FormTypeService from '../../../../service/formtype.service';
import CharacterService from '../../../../service/character.service';
import Select,{ components } from 'react-select';

interface ShowFormsProps {}

const LoadingForm = () => (
  <div className="loading border bg-gray-300 border-gray-200 rounded-lg p-3 mb-3 h-[85px] ">
    
  </div>
)

const ShowForm: FC<ShowFormsProps> = () => {
  const [Forms, setForms] = useState<Form[]>([]);
  const [showAddForm, setShowAddForm] = useState(false)
  const [showUpdateAvatarForm, setShowUpdateAvatarForm] = useState(false)
  const [editingForm, setEditForm] = useState<Form|null>();
  const [Characters, setCharacters] = useState<any[]>([]);
  const [FormTypes, setFormTypes] = useState<any[]>([]);
  
  useEffect(() => {
    const getCharacters = async () => {
      try {
        const result = await CharacterService.GetAllCharacters();
        const options = result.map(char => ({ value: char.id, label: char.name, kamenRiderTypeId: char.kamenRiderTypeId }));
        options.push({ value: 0, label: 'Select Character', kamenRiderTypeId: 0});
        setCharacters(options);
      } catch (err) {
        MessageService.error('Failed to fetch kamen rider types');
      }
    }

    getCharacters();
  }, []);
  const [searchFormdata, setSearchFormdata] = useState<SearchForm>({
    idCharacter: 0,
    idTypeForm: 0
  })
// useEffect khác để theo dõi khi Characters được cập nhật
  useEffect(() => {
    if (Characters.length > 0 && searchFormdata.idCharacter) {
      const idtype = getCharacterTypeById(searchFormdata.idCharacter);
      if (idtype !== undefined) {
        getFormTypes(idtype);
      } 
    }
  }, [Characters, searchFormdata.idCharacter]);
  const getFormTypes = async (id: number) => {
    try {
        const result = await FormTypeService.GetListTypeFormByKamenRiderTypeId(id);
        const options = result.map(type => ({ value: type.id, label: type.name, Description: type.description }));
        setFormTypes(options);
    } catch (err) {
      MessageService.error('Failed to fetch kamen rider types');
    }
  }
  const getCharacterTypeById: (id: number) => number = (id: number) => {
    const result = Characters?.find(char => char.value === id);
    return result?.kamenRiderTypeId;
  }
  // const [error, setError] = useState<string | null>(null);

  //Show list and filter
  useEffect(() => {
    const getForms = async () => {
      try {
        const result = await FormService.GetAllForms(searchFormdata);
        setForms(result);
      } catch (err) {
        MessageService.error('Failed to fetch Forms');
      }
    };
    getForms();
  }, [searchFormdata]);

  const handleAdd: (newForm: Form) => Promise<boolean> = async (newForm: Form) => {
    console.log('Add Form');
    try {
      const addedForm = await FormService.AddForm(newForm).catch((err) => {
        console.log(err);
        return null;
      });

      if (addedForm) {
        setForms([...Forms, addedForm]);  // Update Form list
        return true;
      }
    } catch (err) {
      MessageService.error('Failed to add Form');
    }
    
    return false;
  };
  const handleEdit: (updatedForm: Form) => Promise<boolean> = async (updatedForm: Form) => {
    try {
      const isOk = await FormService.UpdateForm(updatedForm);
      if (!isOk) {
        MessageService.error('Failed to update Form');
        return false;
      }
      setForms(Forms.map(char => char.id === updatedForm.id ? updatedForm : char));
      MessageService.success('Form updated successfully');
      return true;
    } catch (err) {
      MessageService.error('Failed to update Form'+err);
      return false;
    }
  };

  const handleUpdateAvatar = async (id: number, avatarFile: File | null) => {
    try {
      if (!avatarFile) {
        MessageService.error('No avatar file selected');
        return;
      }else{
        const updatedForm = await FormService.UpdateAvatar(id, avatarFile);
        if (!updatedForm) {
          MessageService.error('Failed to update avatar');
          return;
        }
        setForms(Forms.map(char => char.id == id ? {...char, avatar : updatedForm.avatar } : char));
        MessageService.success('Avatar updated successfully');
      }
    } catch (err) {
      MessageService.error('Failed to update avatar'+err);
    }
  }
  // if (error) return <p>{error}</p>;

  const openForm = (Form?: Form) => {
    setEditForm(Form);
    setShowAddForm(true);
  };
  
  const DeleteForm = async(id: number)=>{
    console.log('Delete Form');
    try {
      var deletedForm = await FormService.DeleteForm(id);
      if (deletedForm) {
        MessageService.success('Form deleted successfully');
        setForms(Forms.filter((Form) => Form.id !== id));
      }
      else {
        MessageService.error('Failed to delete Form');
      }
    } catch (err) {
      MessageService.error('Failed to delete Form');
    }
  }
  function OpenFormUpdateAvatar(Form?: Form): void {
    setEditForm(Form);
    setShowUpdateAvatarForm(true);
  }
  
  const GetDescription = (id: number) => {
    const result = FormTypes.find(type => type.value === id);
    return result?.Description;
  }
  const OptionCustom = (props: any) => {
    return (
      <components.Option {...props}>
        <div data-tooltip-id="my-tooltip"
            data-tooltip-content={GetDescription(props.data.value)}>
            <span>{props.label}</span>
        </div>
      </components.Option>
    );
  };
  
  //Thay đổi nhân vật có loại khác sẽ chọn lại loại
  const handleSelectChangeCharacter = (selectedOption: any) => {
    const previousType = getCharacterTypeById(searchFormdata.idCharacter);
    const newType = getCharacterTypeById(selectedOption.value);

    // Nếu nhân vật mới có loại khác với nhân vật trước, load lại các loại form
    if (previousType !== newType) {
      setSearchFormdata(prevForm => ({ 
        ...prevForm, 
        idCharacter: selectedOption.value, 
        idTypeForm: 0 // Reset lại form type khi thay đổi nhân vật
      }));
      getFormTypes(newType);
    } else {
      setSearchFormdata(prevForm => ({ ...prevForm, idCharacter: selectedOption.value }));
    }
  }
  const handleSelectChangeType = (selectedOption: any) => {
    setSearchFormdata(prevform => ({ ...prevform, idTypeForm: selectedOption.value }));
  }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Form Manager</h1>
          <Button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={() => openForm()}>Add Form</Button>
        </div>
        <div className='flex'>
        <div className="mb-4 w-[50%] p-1">
            <label className="block mb-1 font-bold text-sm" htmlFor="kamenRiderTypeId">Kamen Rider:</label>
            <Select className="basic-single w-full border-gray-300 focus:border-black-500 rounded text-sm" 
            isSearchable={true}
            classNamePrefix="select"
            options={Characters}
            value={Characters.find((type) => type.value === searchFormdata.idCharacter)}
            onChange={handleSelectChangeCharacter}
            required />
          </div>
          <div className="mb-4 w-[50%] p-1" 
            data-tooltip-id="my-tooltip"
            data-tooltip-content={GetDescription(searchFormdata.idTypeForm)}>
            <label className="block mb-1 font-bold text-sm" htmlFor="kamenRiderTypeId">Character type:</label>
            <Select className="basic-single w-full border-gray-300 focus:border-black-500 rounded text-sm" 
            isDisabled={searchFormdata.idCharacter==0}
            isSearchable={true}
            classNamePrefix="select"
            options={FormTypes}
            value={FormTypes.find((type) => type.value === searchFormdata.idTypeForm)}
            onChange={handleSelectChangeType}
            components={{ Option: OptionCustom }}
            required />
          </div>
        </div>
        <div>
            {Forms.map((Form) => (
              <LazyLoad key={Form.id} placeholder={<LoadingForm />}>
                <FormInformation key={Form.id} Form={Form}
                onEdit={() => openForm(Form)} onDelete={DeleteForm} 
                onUpdateAvatar={()=>OpenFormUpdateAvatar(Form)} />
              </LazyLoad>
            ))}
        </div>
      </div>
      {showAddForm && <AddFormForm searchModel={editingForm?null:searchFormdata} initialData={editingForm||null} onSubmit={editingForm ? handleEdit : handleAdd} onClose={() => setShowAddForm(false)} />} 
      {showUpdateAvatarForm && <UploadAvatarForm character={editingForm||null} onSubmit={handleUpdateAvatar} onClose={() => setShowUpdateAvatarForm(false)} />} 
    </div>
  );
};

export default ShowForm;
