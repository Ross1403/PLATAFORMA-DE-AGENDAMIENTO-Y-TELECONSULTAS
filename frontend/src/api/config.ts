
import axios from 'axios';

export const API_BASE_URL = 'http://localhost:4000/api';

// Configurar axios
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función helper para manejar errores
export const handleApiError = (error: any) => {
  if (error.response) {
    // El servidor respondió con un código de error
    throw new Error(`Error ${error.response.status}: ${error.response.data?.message || 'Error del servidor'}`);
  } else if (error.request) {
    // La petición fue hecha pero no se recibió respuesta
    throw new Error('No se pudo conectar con el servidor');
  } else {
    // Algo pasó al configurar la petición
    throw new Error('Error en la petición');
  }
};
