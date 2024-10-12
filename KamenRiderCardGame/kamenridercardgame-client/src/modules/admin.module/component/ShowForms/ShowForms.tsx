import React, { FC, useEffect, useState } from 'react';
import { Form } from '../../../../service/form.service';
import FormService from '../../../../service/form.service'
import MessageService from '../../../../service/message.service';
import LazyLoad from 'react-lazyload';
import { FormInformation } from '../Form/FormInformation';
import { Button } from '../../../../components/ui/ui';
import AddFormForm from '../AddCharacterForm/AddFormForm';
import UploadAvatarForm from '../AddCharacterForm/UpdateAvatarForm';

interface ShowFormsProps {}

const LoadingForm = () => (
  <div className="loading border bg-gray-300 border-gray-200 rounded-lg p-3 mb-3 h-[85px] ">
    
  </div>
)

const ShowForm: FC<ShowFormsProps> = () => {
  const [kamenRiderTypes, setKamenRiderTypes] = useState([]);
  const [Forms, setForms] = useState<Form[]>([]);
  const [showAddForm, setShowAddForm] = useState(false)
  const [showUpdateAvatarForm, setShowUpdateAvatarForm] = useState(false)
  const [editingForm, setEditForm] = useState<Form|null>();
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getForms = async () => {
      try {
        const result = await FormService.GetAllForms();
        setForms(result);
      } catch (err) {
        MessageService.error('Failed to fetch Forms');
      }
    };
    getForms();
  }, []);

  const handleAdd: (newForm: Form) => Promise<boolean> = async (newForm: Form) => {
    console.log('Add Form');
    try {
      const addedForm = await FormService.AddForm(newForm);
      setForms([...Forms, addedForm]);  // Update Form list
      return true;
    } catch (err) {
      MessageService.error('Failed to add Form');
      return false;
    }
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Form Manager</h1>
          <Button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={() => openForm()}>Add Form</Button>
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
      {showAddForm && <AddFormForm initialData={editingForm||null} onSubmit={editingForm ? handleEdit : handleAdd} onClose={() => setShowAddForm(false)} />} 
      {showUpdateAvatarForm && <UploadAvatarForm character={editingForm||null} onSubmit={handleUpdateAvatar} onClose={() => setShowUpdateAvatarForm(false)} />} 
    </div>
  );
};

export default ShowForm;
