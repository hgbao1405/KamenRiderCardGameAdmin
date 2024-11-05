import exp from "constants";
import MessageService from "./message.service";

export interface HtmlStyle {
    attr: attr;
    isCenter?: boolean;
    top?: number;
    left?: number;
    width?: number;
    height?: number;
    widthPercent?: number;
    heightPercent?: number;
    color?: string;
    fontSize?: string;
  }
  
export interface attr {
    type: 'text' | 'image';
    value: string;
  }
  
class CardLayoutService{
    private static Url="https://localhost:7223/api/CardLayout/";
    static GetCardLayout = async (id: number): Promise<HtmlStyle[]> => {
      try {
        // G i API th m m ng nh n v  tu URL https://localhost:7223/api/Characters
        const response = await fetch(`${this.Url}GetCardLayout/${id}`);

        // Ki m tra xem c u tr y API c  th nh c ng hay kh ng
        if (!response.ok) { 
          MessageService.error('Network response was not ok');
          return Promise.reject('Network response was not ok');
        }
        const data: any = await response.json(); 
        return data.attrs;
      } catch (error) {
        MessageService.error('Error fetching characters:'+ error);
        throw error;
      }
    };
}
export default CardLayoutService;