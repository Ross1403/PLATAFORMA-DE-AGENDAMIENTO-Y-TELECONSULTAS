import { User } from '../modelos/User';

export class AuthController {
  private static currentUser: User | null = null;

  static async login(email: string, password: string): Promise<User | null> {
    // Simulación de login - en producción conectar con backend
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'paciente@example.com',
        name: 'María González',
        phone: '555-0123',
        birthDate: '1950-05-15',
        role: 'patient',
        createdAt: new Date()
      },
      {
        id: '2',
        email: 'doctor@example.com',
        name: 'Dr. Juan Pérez',
        phone: '555-0124',
        birthDate: '1970-03-20',
        role: 'doctor',
        createdAt: new Date()
      }
    ];

    const user = mockUsers.find(u => u.email === email);
    if (user && password === '123456') {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    return null;
  }

  static logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  static getCurrentUser(): User | null {
    if (!this.currentUser) {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
    return this.currentUser;
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}
