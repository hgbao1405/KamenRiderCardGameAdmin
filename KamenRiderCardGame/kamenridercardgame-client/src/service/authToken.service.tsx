
class AuthToken {
    private static tokenKey = 'auth_token';
    private static expirationTimeKey = 'expirationTime';

    public static headerAuth=()=> {return{
        'Authorization': `Bearer ${this.getToken()}`,
    }}
    public static headerJsonAuth=()=> { return {
        'Authorization': `Bearer ${this.getToken()}`,
        'Content-Type': 'application/json',
    }}
    static isTokenExpired(): boolean {
        const expirationTime = localStorage.getItem(this.expirationTimeKey);
        if (!expirationTime) {
            return false;
        }else{
            return Date.parse(expirationTime) < new Date().getTime();
        }
    }
    // Lưu token
    static setToken(newToken: string, expirationTime: Date): void {
        localStorage.setItem(this.tokenKey, newToken);
        localStorage.setItem(this.expirationTimeKey, expirationTime.toString());
    }

    // Lấy token
    static getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }
    static getExpirationTime(): Date | null {
        const expirationTime = localStorage.getItem(this.expirationTimeKey);
        if (!expirationTime) {
            return null;
        }else{
            return new Date(expirationTime);
        }
    }
    // Xóa token
    static clearToken(): void {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.expirationTimeKey);
    }
  }
  export default AuthToken;