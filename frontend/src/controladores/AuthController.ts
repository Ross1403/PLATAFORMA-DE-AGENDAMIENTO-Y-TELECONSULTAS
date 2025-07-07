
// Controlador simplificado para autenticación (mock para demo)
export class AuthController {
  private static readonly STORAGE_KEY = 'telesalud_user';

  static async login(email: string, password: string) {
    // Mock de login - en producción esto debería conectar con el backend
    const mockUsers = [
      { id: '1', name: 'Dr. García', email: 'doctor@example.com', role: 'doctor' as const },
      { id: '2', name: 'María González', email: 'paciente@example.com', role: 'patient' as const },
    ];

    const user = mockUsers.find(u => u.email === email && password === '123456');
    
    if (user) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      return user;
    }
    
    return null;
  }

  static getCurrentUser() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  static logout() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
