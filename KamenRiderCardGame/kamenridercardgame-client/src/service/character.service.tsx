import { useAuth } from "../modules/user.module/component/Auth/AuthContext";
import AuthToken from "./authToken.service";
import MessageService from "./message.service";

  export interface Character {
    id: number;
    name: string;
    description: string;
    avatar: string;
    speed: number;
    attack: number;
    kick: number;
    health: number;
    jump: number;
    kamenRiderTypeId: Number;
  }
 class CharacterService{
    
    private static Url="https://localhost:7223/api/Characters";

    static UpdateAvatar=async(id: number, file: File | null): Promise<Character> => {
      try {
        if (file) {
          const request = new FormData();
          request.append('request.id', id.toString());
          request.append('request.file', file, file.name);

          const response = await fetch(this.Url+"/UpdateImage", {
            method: 'PUT', // Use PUT method
            body: request,
            headers: AuthToken.headerAuth(),
          });
          
          console.log(response);
          if (!response.ok) {
            MessageService.error('Network response was not ok');
            return Promise.reject('Network response was not ok');
          }
          const data: Character = await response.json();
          return data;
        }
      } catch (error) {
        console.error('Error fetching characters:', error);
        MessageService.error('Failed to update character:'+error);
        return Promise.reject(error);
      }
      throw new Error('Method not implemented.');
    }

    static GetAllCharacters = async (): Promise<Character[]> => {
      try {
        // G i API th m m ng nh n v  tu URL https://localhost:7223/api/Characters
        const response = await fetch(this.Url);

        // Ki m tra xem c u tr y API c  th nh c ng hay kh ng
        if (!response.ok) {
          MessageService.error('Network response was not ok');
          return Promise.reject('Network response was not ok');
        }
        const data: Character[] = await response.json(); 
        return data;
      } catch (error) {
        MessageService.error('Error fetching characters:'+ error);
        throw error;
      }
    };

    /**
     * G i API th m m t nh n v o c s d li u
     * @returns {Promise<Character>} Trả v  nh n v a th m
     */
    static AddCharacter = async(character: Character): Promise<Character>=>{
      try {
        const response = await fetch(this.Url, {
          method: 'POST', // Use POST method
          headers: AuthToken.headerJsonAuth(),
          body: JSON.stringify(character), // Convert character object to JSON
        });
        if (!response.ok) {
          MessageService.error('Network response was not ok');
          return Promise.reject('Network response was not ok');
        }
        const data: Character = await response.json();
        MessageService.success('Character added successfully');
        return data;
      } catch (error) {
        MessageService.error('Error fetching characters:' + error);
        throw error;
      }
    }

    static UpdateCharacter = async(character: Character): Promise<boolean>=>{
      try {
        const response = await fetch(this.Url+"/"+character.id, {
          method: 'PUT', // Use PUT method
          headers: AuthToken.headerJsonAuth(),
          body: JSON.stringify(character), // Convert character object to JSON
        });
        if (!response.ok) {
          MessageService.error('Network response was not ok');
          return false;
        }
        return true;
      } catch (error) {
        MessageService.error('Failed to update character:'+error);
        return false;
      }
    }

    static DeleteCharacter = async(id: number): Promise<boolean>=>{
      try { 
        const response = await fetch(this.Url+"/"+id, {
          method: 'DELETE', // Use DELETE method
          headers: AuthToken.headerAuth()
        });
        if (!response.ok) {
          MessageService.error('Network response was not ok');
          return false;
        }
        MessageService.success('Character deleted successfully');
        return true;
      } catch (error) {
        MessageService.error('Failed to delete character:'+error);
        throw error;
      }
    }
  }

  export default CharacterService;