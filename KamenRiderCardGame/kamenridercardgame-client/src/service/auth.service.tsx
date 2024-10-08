import MessageService from "./message.service";

  export interface Regrister {
    username: string;
    password: string;
    confirmPassword: string;
  }
  export interface Login {
    username: string;
    password: string;
  }
  export interface User {
    username: string;
    roles: string[];
    expirationTime: Date;
  }
 class AuthService{
    private static Url="https://localhost:7081/api/Account";

    static Register = async (data: Regrister): Promise<void> => {
      try {
        const response = await fetch(this.Url + "/Regrister", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          const errorResponse:string[] = await response.json();
          const errorMessage = (
            <ul>
              {errorResponse.map((error, index) => (
                <li key={index}>
                  {error}
                </li>
              ))}
            </ul>
          )
          MessageService.errorhtml(errorMessage);
          return Promise.reject("Error: " + errorResponse.join(", "));
        }
        MessageService.success("Form registered successfully");
      } catch (error) {
        MessageService.error("Failed to register Form:" + error);
      }     
    }

    static Login = async (data: Login): Promise<string> => {
      try {
        const response = await fetch(this.Url + "/Login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          MessageService.error("Network response was not ok");
          return Promise.reject("Network response was not ok");
        }
        
        // Lấy JWT token từ response (giả sử server trả về dạng JSON với thuộc tính token)
        const result = await response.json();
        const jwtToken = result.token; // Hoặc response.access_token tùy vào cấu trúc trả về
        
        // Lưu token vào localStorage
        MessageService.success("Login successful");
        return jwtToken;
        
      } catch (error) {
        MessageService.error("Failed to login: " + error);
        return Promise.reject("Failed to login: " + error);
      }
    }
    
    static GetInfor(token: string): Promise<User|null> {
      const headers = {
        "Authorization": "Bearer " + token,
      };
      
      console.log("Request Headers:", headers); // Log headers to console
    
      return fetch(this.Url + "/GetInfo", {
        method: "GET",
        headers: headers,
      })
        .then((response) => {
          if (!response.ok) {
            MessageService.error("Get Infor error: Network response was not ok");
            console.log(response.headers); // Log response headers to console
            return null;
          }
          return response.json();
        });
    }

  }
  export default AuthService;