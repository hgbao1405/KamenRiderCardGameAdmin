import MessageService from "./message.service";

  export interface CharacterType {
    id: number;
    name: string;
    description: string;
  }
 class FormTypeService{
    private static Url="https://localhost:7223/api/FormTypes";

    static GetAll = async (): Promise<CharacterType[]> => {
      try {
        // G i API th m m ng nh n v  tu URL https://localhost:7223/api/Characters
        const response = await fetch(this.Url+"/GetAll");

        // Ki m tra xem c u tr y API c  th nh c ng hay kh ng
        if (!response.ok) {
          MessageService.error('Network response was not ok');
          return Promise.reject('Network response was not ok');
        }
        const data: CharacterType[] = await response.json(); 
        return data;
      } catch (error) {
        MessageService.error('Error fetching characters:'+ error);
        throw error;
      }
    };
    static GetListTypeFormByKamenRiderTypeId = async (id: number): Promise<CharacterType[]> => {
        try {
          // G i API th m m ng nh n v  tu URL https://localhost:7223/api/Characters
          const response = await fetch(this.Url+"/GetListTypeFormByKamenRiderTypeId/"+id);
  
          // Ki m tra xem c u tr y API c  th nh c ng hay kh ng
          if (!response.ok) {
            MessageService.error('Network response was not ok');
            return Promise.reject('Network response was not ok');
          }
          const data: CharacterType[] = await response.json(); 
          return data;
        } catch (error) {
          MessageService.error('Error fetching characters:'+ error);
          throw error;
        }
      };
  }

  export default FormTypeService;