
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">404 - Página no encontrada</h1>
        <p className="text-xl text-blue-600 mb-8">La página que buscas no existe.</p>
        <a 
          href="/" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
