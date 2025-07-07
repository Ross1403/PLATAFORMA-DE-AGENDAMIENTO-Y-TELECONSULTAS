
import { useState } from 'react';
import { Button } from "@/componentes/ui/button";
import { Input } from "@/componentes/ui/input";
import { Label } from "@/componentes/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/componentes/ui/select";
import { Textarea } from "@/componentes/ui/textarea";
import { DoctorController } from '../../controladores/DoctorController';
import { AppointmentController } from '../../controladores/AppointmentController';
import { Calendar, Clock, Video, Stethoscope, User } from 'lucide-react';

interface AppointmentFormProps {
  onAppointmentCreated: () => void;
}

export const AppointmentForm = ({ onAppointmentCreated }: AppointmentFormProps) => {
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    type: 'presencial' as 'presencial' | 'teleconsulta',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const doctors = DoctorController.getAllDoctors();

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await AppointmentController.createAppointment(formData);
      alert(`¡Cita ${formData.type === 'teleconsulta' ? 'de teleconsulta' : 'presencial'} agendada exitosamente!`);
      onAppointmentCreated();
      setFormData({
        doctorId: '',
        date: '',
        time: '',
        type: 'presencial',
        notes: ''
      });
    } catch (error) {
      alert('Error al agendar la cita. Por favor intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-blue-800 mb-2">Agendar Nueva Cita</h2>
        <p className="text-blue-600 text-lg">Complete los datos de su cita médica</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Label className="text-blue-700 text-lg font-semibold mb-3 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Seleccionar Doctor *
            </Label>
            <Select 
              value={formData.doctorId} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, doctorId: value }))}
            >
              <SelectTrigger className="h-14 text-lg border-2 border-blue-300">
                <SelectValue placeholder="Seleccione un doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id} className="text-lg p-4">
                    <div>
                      <div className="font-semibold">
                        Dr. {doctor.nombres} {doctor.apellidos}
                      </div>
                      <div className="text-sm text-blue-600">
                        {doctor.especialidad}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-blue-700 text-lg font-semibold mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Fecha *
            </Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="h-14 text-lg border-2 border-blue-300 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <Label className="text-blue-700 text-lg font-semibold mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Hora *
            </Label>
            <Select 
              value={formData.time} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}
            >
              <SelectTrigger className="h-14 text-lg border-2 border-blue-300">
                <SelectValue placeholder="Seleccione hora" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time} className="text-lg p-3">
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-blue-700 text-lg font-semibold mb-3 block">
            Tipo de Consulta *
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              type="button"
              variant={formData.type === 'presencial' ? 'default' : 'outline'}
              className="h-16 text-lg border-2 border-blue-300"
              onClick={() => setFormData(prev => ({ ...prev, type: 'presencial' }))}
            >
              <Stethoscope className="w-6 h-6 mr-2" />
              Consulta Presencial
            </Button>
            <Button
              type="button"
              variant={formData.type === 'teleconsulta' ? 'default' : 'outline'}
              className="h-16 text-lg border-2 border-blue-300"
              onClick={() => setFormData(prev => ({ ...prev, type: 'teleconsulta' }))}
            >
              <Video className="w-6 h-6 mr-2" />
              Teleconsulta
            </Button>
          </div>
        </div>

        <div>
          <Label className="text-blue-700 text-lg font-semibold mb-3 block">
            Notas Adicionales (Opcional)
          </Label>
          <Textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            className="min-h-[100px] text-lg border-2 border-blue-300 focus:border-blue-500"
            placeholder="Describa brevemente el motivo de su consulta..."
          />
        </div>

        <div className="text-center pt-6">
          <Button
            type="submit"
            disabled={isSubmitting || !formData.doctorId || !formData.date || !formData.time}
            className="px-12 py-4 text-xl bg-green-600 hover:bg-green-700 h-16"
          >
            {isSubmitting ? 'Agendando...' : 'Confirmar Cita'}
          </Button>
        </div>
      </form>
    </div>
  );
};
