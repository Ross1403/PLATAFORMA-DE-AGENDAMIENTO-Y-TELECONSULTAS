
import { Button } from '@/componentes/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/componentes/ui/card';
import { User } from '@/modelos/User';

interface DashboardViewProps {
  user: User;
  onLogout: () => void;
}

export const DashboardView = ({ user, onLogout }: DashboardViewProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-blue-800">
              Salud Alegre Senior
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bienvenido, {user.name}
              </span>
              <Button 
                onClick={onLogout}
                variant="outline"
                size="sm"
              >
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-700">Pacientes</CardTitle>
              <CardDescription>
                Gestionar información de pacientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Ver Pacientes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-700">Citas</CardTitle>
              <CardDescription>
                Programar y gestionar citas médicas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Ver Citas
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-700">Historial Médico</CardTitle>
              <CardDescription>
                Consultar historiales médicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Ver Historiales
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
