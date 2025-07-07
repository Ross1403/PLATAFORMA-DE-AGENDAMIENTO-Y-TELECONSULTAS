
import { useState, useEffect } from 'react';
import { Button } from "@/componentes/ui/button";
import { AuthController } from '../../controladores/AuthController';
import { AppointmentController } from '../../controladores/AppointmentController';
import { User } from '../../modelos/User';
import { Appointment } from '../../modelos/Appointment';
import { PatientRegistrationForm } from '../../componentes/forms/PatientRegistrationForm';
import { AppointmentForm } from '../../componentes/forms/AppointmentForm';
import { PrescriptionForm } from '../../componentes/prescription/PrescriptionForm';
import { PrescriptionViewer } from '../../componentes/prescription/PrescriptionViewer';
import { MedicalHistoryView } from '../../componentes/medical/MedicalHistoryView';
import { Calendar, Video, FileText, LogOut, Stethoscope, Clock, User as UserIcon } from 'lucide-react';

interface DashboardViewProps {
  user: User;
  onLogout: () => void;
}

export const DashboardView = ({ user, onLogout }: DashboardViewProps) => {
  const [activeView, setActiveView] = useState<'register' | 'appointments' | 'history' | 'schedule' | 'prescriptions'>('register');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    setAppointments(AppointmentController.getAppointments());
  }, []);

  const handleLogout = () => {
    AuthController.logout();
    onLogout();
  };

  const refreshAppointments = () => {
    setAppointments(AppointmentController.getAppointments());
    setActiveView('appointments');
  };

  const handlePrescriptionClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowPrescriptionForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-800">TeleSalud</h1>
                <p className="text-blue-600">Bienvenido, {user.name}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-2 overflow-x-auto">
            <Button
              onClick={() => setActiveView('register')}
              variant={activeView === 'register' ? 'secondary' : 'ghost'}
              className="h-16 px-6 text-white hover:bg-blue-500 rounded-none whitespace-nowrap"
            >
              <UserIcon className="w-6 h-6 mr-2" />
              <span className="text-lg">Registro</span>
            </Button>
            <Button
              onClick={() => setActiveView('schedule')}
              variant={activeView === 'schedule' ? 'secondary' : 'ghost'}
              className="h-16 px-6 text-white hover:bg-blue-500 rounded-none whitespace-nowrap"
            >
              <Calendar className="w-6 h-6 mr-2" />
              <span className="text-lg">Agendar Cita</span>
            </Button>
            <Button
              onClick={() => setActiveView('appointments')}
              variant={activeView === 'appointments' ? 'secondary' : 'ghost'}
              className="h-16 px-6 text-white hover:bg-blue-500 rounded-none whitespace-nowrap"
            >
              <Video className="w-6 h-6 mr-2" />
              <span className="text-lg">Mis Citas</span>
            </Button>
            <Button
              onClick={() => setActiveView('history')}
              variant={activeView === 'history' ? 'secondary' : 'ghost'}
              className="h-16 px-6 text-white hover:bg-blue-500 rounded-none whitespace-nowrap"
            >
              <FileText className="w-6 h-6 mr-2" />
              <span className="text-lg">Historial Médico</span>
            </Button>
            <Button
              onClick={() => setActiveView('prescriptions')}
              variant={activeView === 'prescriptions' ? 'secondary' : 'ghost'}
              className="h-16 px-6 text-white hover:bg-blue-500 rounded-none whitespace-nowrap"
            >
              <FileText className="w-6 h-6 mr-2" />
              <span className="text-lg">Recetas</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeView === 'register' && (
          <PatientRegistrationForm onRegistrationComplete={() => setActiveView('schedule')} />
        )}

        {activeView === 'schedule' && (
          <AppointmentForm onAppointmentCreated={refreshAppointments} />
        )}

        {activeView === 'appointments' && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              Mis Citas Programadas
            </h2>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border-2 border-blue-200 rounded-xl p-4 hover:bg-blue-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800">
                        {appointment.type === 'teleconsulta' ? 'Teleconsulta' : 'Consulta Presencial'}
                      </h3>
                      <p className="text-blue-600">
                        {appointment.date.toLocaleDateString()} - {appointment.time}
                      </p>
                      <p className="text-sm text-blue-500 mt-1">
                        Estado: {appointment.status}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {appointment.type === 'teleconsulta' && appointment.meetingLink && (
                        <Button
                          onClick={() => window.open(appointment.meetingLink, '_blank')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Unirse
                        </Button>
                      )}
                      {user.role === 'doctor' && (
                        <Button
                          onClick={() => handlePrescriptionClick(appointment)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Receta
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {appointments.length === 0 && (
                <p className="text-center text-blue-600 text-lg py-8">
                  No tienes citas programadas
                </p>
              )}
            </div>
          </div>
        )}

        {activeView === 'history' && (
          <MedicalHistoryView />
        )}

        {activeView === 'prescriptions' && (
          <PrescriptionViewer patientId={user.role === 'patient' ? user.id : undefined} />
        )}

        {showPrescriptionForm && selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <Button
                  onClick={() => {
                    setShowPrescriptionForm(false);
                    setSelectedAppointment(null);
                  }}
                  variant="outline"
                  className="absolute top-4 right-4 z-10"
                >
                  Cerrar
                </Button>
                <PrescriptionForm
                  patientId={selectedAppointment.patientId}
                  doctorId={selectedAppointment.doctorId}
                  appointmentId={selectedAppointment.id}
                  onPrescriptionCreated={() => {
                    setShowPrescriptionForm(false);
                    setSelectedAppointment(null);
                    // Actualizar la vista de recetas si está activa
                    if (activeView === 'prescriptions') {
                      setActiveView('prescriptions');
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
