
import { Button } from "@/componentes/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Página no encontrada</h2>
        <p className="text-blue-500 mb-8">La página que buscas no existe.</p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
