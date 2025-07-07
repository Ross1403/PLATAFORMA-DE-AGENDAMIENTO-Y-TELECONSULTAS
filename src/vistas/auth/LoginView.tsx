import { useState } from 'react';
import { Button } from "@/componentes/ui/button";
import { Input } from "@/componentes/ui/input";
import { Label } from "@/componentes/ui/label";
import { AuthController } from '../../controladores/AuthController';
import { User, UserCircle } from 'lucide-react';

interface LoginViewProps {
  onLogin: (user: any) => void;
}

export const LoginView = ({ onLogin }: LoginViewProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const user = await AuthController.login(email, password);
      if (user) {
        onLogin(user);
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      alert('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <UserCircle className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-blue-800 mb-2">TeleSalud</h1>
          <p className="text-blue-600">Plataforma para Adultos Mayores</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-lg text-blue-700 mb-2 block">
              Correo Electrónico
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-lg border-2 border-blue-300 focus:border-blue-500"
              placeholder="Ingrese su correo"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-lg text-blue-700 mb-2 block">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 text-lg border-2 border-blue-300 focus:border-blue-500"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-700 text-center mb-2">
            <strong>Datos de prueba:</strong>
          </p>
          <p className="text-xs text-blue-600 text-center">
            Paciente: paciente@example.com<br/>
            Doctor: doctor@example.com<br/>
            Contraseña: 123456
          </p>
        </div>
      </div>
    </div>
  );
};
