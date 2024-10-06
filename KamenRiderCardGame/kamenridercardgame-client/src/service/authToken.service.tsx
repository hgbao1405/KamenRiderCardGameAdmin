
class AuthToken {
    private static token: string | null = null;

    public static headerAuth=()=> {return{
        'Authorization': `Bearer ${this.getToken()}`,
    }}
    public static headerJsonAuth=()=> { return {
        'Authorization': `Bearer ${this.getToken()}`,
        'Content-Type': 'application/json',
    }}
    
    // Lưu token
    static setToken(newToken: string): void {
        this.token = newToken;
    }

    // Lấy token
    static getToken(): string | null {
        return this.token;
    }

    // Xóa token
    static clearToken(): void {
        this.token = null;
    }
  }
  export default AuthToken;