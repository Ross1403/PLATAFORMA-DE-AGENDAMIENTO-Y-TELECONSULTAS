import { useState } from 'react';
import { Button } from "@/componentes/ui/button";
import { Input } from "@/componentes/ui/input";
import { Label } from "@/componentes/ui/label";
import { PatientController } from '../../controladores/PatientController';
import { User, Calendar, Mail, Phone, CreditCard } from 'lucide-react';

interface PatientRegistrationFormProps {
  onRegistrationComplete: () => void;
}

export const PatientRegistrationForm = ({ onRegistrationComplete }: PatientRegistrationFormProps) => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    dni: '',
    fechaNacimiento: '',
    correo: '',
    telefono: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      PatientController.registerPatient(formData);
      alert('¡Registro exitoso! Sus datos han sido guardados correctamente.');
      onRegistrationComplete();
    } catch (error) {
      alert('Error al registrar paciente. Por favor intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-blue-800 mb-2">Registro de Paciente</h2>
        <p className="text-blue-600 text-lg">Complete sus datos personales</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-blue-700 text-lg font-semibold mb-2 block">
              Nombres *
            </Label>
            <Input
              type="text"
              value={formData.nombres}
              onChange={(e) => handleInputChange('nombres', e.target.value)}
              className="h-14 text-lg border-2 border-blue-300 focus:border-blue-500"
              placeholder="Ingrese sus nombres"
              required
            />
          </div>

          <div>
            <Label className="text-blue-700 text-lg font-semibold mb-2 block">
              Apellidos *
            </Label>
            <Input
              type="text"
              value={formData.apellidos}
              onChange={(e) => handleInputChange('apellidos', e.target.value)}
              className="h-14 text-lg border-2 border-blue-300 focus:border-blue-500"
              placeholder="Ingrese sus apellidos"
              required
            />
          </div>

          <div>
            <Label className="text-blue-700 text-lg font-semibold mb-2 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              DNI *
            </Label>
            <Input
              type="text"
              value={formData.dni}
              onChange={(e) => handleInputChange('dni', e.target.value)}
              className="h-14 text-lg border-2 border-blue-300 focus:border-blue-500"
              placeholder="12345678"
              maxLength={8}
              required
            />
          </div>

          <div>
            <Label className="text-blue-700 text-lg font-semibold mb-2 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Fecha de Nacimiento *
            </Label>
            <Input
              type="date"
              value={formData.fechaNacimiento}
              onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
              className="h-14 text-lg border-2 border-blue-300 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <Label className="text-blue-700 text-lg font-semibold mb-2 flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Correo Electrónico *
            </Label>
            <Input
              type="email"
              value={formData.correo}
              onChange={(e) => handleInputChange('correo', e.target.value)}
              className="h-14 text-lg border-2 border-blue-300 focus:border-blue-500"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div>
            <Label className="text-blue-700 text-lg font-semibold mb-2 flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Teléfono *
            </Label>
            <Input
              type="tel"
              value={formData.telefono}
              onChange={(e) => handleInputChange('telefono', e.target.value)}
              className="h-14 text-lg border-2 border-blue-300 focus:border-blue-500"
              placeholder="987654321"
              required
            />
          </div>
        </div>

        <div className="text-center pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-12 py-4 text-xl bg-blue-600 hover:bg-blue-700 h-16"
          >
            {isSubmitting ? 'Registrando...' : 'Registrar Paciente'}
          </Button>
        </div>
      </form>
    </div>
  );
};
