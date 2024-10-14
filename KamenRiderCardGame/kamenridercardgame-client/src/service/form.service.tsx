import AuthToken from "./authToken.service";
import MessageService from "./message.service";

  export interface Form {
    id: number;
    name: string;
    description: string;
    avatar: string;
    speed: number;
    attack: number;
    kick: number;
    hpForm: number;
    jump: number;
    idTypeForm: number;
    idCharacter: number;
  }
  export interface SearchForm{
      idCharacter: number,
      idTypeForm: number
  }
 class FormService{
    private static Url="https://localhost:7223/api/Forms";
    static UpdateAvatar=async(id: number, file: File | null): Promise<Form> => {
      try {
        if (file) {
          const request = new FormData();
          request.append('request.id', id.toString());
          request.append('request.file', file, file.name);

          const response = await fetch(this.Url+"/UpdateImage", {
            method: 'PUT', // Use PUT method
            headers: AuthToken.headerAuth(),
            body: request,
          });
          
          console.log(response);
          if (!response.ok) {
            const errorResponse:string = await response.text();
            MessageService.error("Failed to update Avatar Form: " + errorResponse);
            return Promise.reject(errorResponse);
          }
          const data: Form = await response.json();
          return data;
        }
      } catch (error) {
        console.error('Error fetching Forms:', error);
        MessageService.error('Failed to update Form:'+error);
        return Promise.reject(error);
      }
      throw new Error('Method not implemented.');
    }

    static GetAllForms = async (SearchForm?: SearchForm): Promise<Form[]> => {
      try {
        // G i API th m m ng nh n v  tu URL https://localhost:7223/api/Forms
        const response = await fetch(this.Url+`/GetForm?idCharacter=${SearchForm?.idCharacter}&idTypeForm=${SearchForm?.idTypeForm}`);

        if (!response.ok) {
          MessageService.error('Network response was not ok');
          return Promise.reject('Network response was not ok');
        }
        const data: Form[] = await response.json(); 
        return data;
      } catch (error) {
        MessageService.error('Error fetching Forms:'+ error);
        throw error;
      }
    };

    /**
     * G i API th m m t nh n v o c s d li u
     * @returns {Promise<Form>} Trả v  nh n v a th m
     */
    static AddForm = async(Form: Form): Promise<Form>=>{
      try {
        const response = await fetch(this.Url, {
          method: 'POST', // Use POST method
          headers: AuthToken.headerJsonAuth(),
          body: JSON.stringify(Form), // Convert Form object to JSON
        });
        if (!response.ok) {
          const errorResponse:string = await response.text();
          MessageService.error("Failed to add Form: " + errorResponse);
          return Promise.reject(errorResponse);
        }
        const data: Form = await response.json();
        MessageService.success('Form added successfully');
        return data;
      } catch (error) {
        MessageService.error('Error fetching Forms:' + error);
        throw error;
      }
    }

    static UpdateForm = async(Form: Form): Promise<boolean>=>{
      try {
        const response = await fetch(this.Url+"/"+Form.id, {
          method: 'PUT', // Use PUT method
          headers: AuthToken.headerJsonAuth(),
          body: JSON.stringify(Form), // Convert Form object to JSON
        });
        if (!response.ok) {
          const errorResponse:string = await response.text();
          MessageService.error("Failed to update Form: " + errorResponse);
          return Promise.reject(errorResponse);
        }
        return true;
      } catch (error) {
        MessageService.error('Error to update Form:'+error);
        return false;
      }
    }

    static DeleteForm = async(id: number): Promise<boolean>=>{
      try { 
        const response = await fetch(this.Url+"/"+id, {
          headers: AuthToken.headerAuth(),
          method: 'DELETE', // Use DELETE method
        });
        if (!response.ok) {
          const errorResponse:string = await response.text();
          MessageService.error("Failed to delete Form: " + errorResponse);
          return Promise.reject(errorResponse);
        }
        MessageService.success('Form deleted successfully');
        return true;
      } catch (error) {
        MessageService.error('Failed to delete Form:'+error);
        throw error;
      }
    }
  }

  export default FormService;