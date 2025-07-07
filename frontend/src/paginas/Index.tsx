
import { useState, useEffect } from 'react';
import { AuthController } from '../controladores/AuthController';
import { LoginView } from '../vistas/auth/LoginView';
import { DashboardView } from '../vistas/dashboard/DashboardView';
import { User } from '../modelos/User';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = AuthController.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    AuthController.logout();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-700 text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!user ? (
        <LoginView onLogin={handleLogin} />
      ) : (
        <DashboardView user={user} onLogout={handleLogout} />
      )}
    </>
  );
};

export default Index;
