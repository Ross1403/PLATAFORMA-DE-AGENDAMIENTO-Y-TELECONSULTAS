
import { useState, useEffect } from 'react';
import { Button } from "@/componentes/ui/button";
import { DoctorController } from '../../controladores/DoctorController';
import { Prescription } from '../../modelos/Doctor';
import { FileText, Calendar, User, Pill } from 'lucide-react';

interface PrescriptionViewerProps {
  patientId?: string;
}

export const PrescriptionViewer = ({ patientId }: PrescriptionViewerProps) => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  useEffect(() => {
    if (patientId) {
      const patientPrescriptions = DoctorController.getPrescriptionsByPatient(patientId);
      setPrescriptions(patientPrescriptions);
    }
  }, [patientId]);

  const handleViewPrescription = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
  };

  const handlePrint = () => {
    window.print();
  };

  if (selectedPrescription) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => setSelectedPrescription(null)}
            variant="outline"
            className="border-2 border-blue-300"
          >
            ← Volver a la lista
          </Button>
          <Button
            onClick={handlePrint}
            className="bg-green-600 hover:bg-green-700"
          >
            Imprimir Receta
          </Button>
        </div>

        {/* Receta completa para visualizar */}
        <div className="prescription-content border-2 border-gray-300 p-8 rounded-xl bg-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">RECETA MÉDICA</h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <p className="text-lg"><strong>Fecha:</strong> {selectedPrescription.date.toLocaleDateString()}</p>
              <p className="text-lg"><strong>ID Paciente:</strong> {selectedPrescription.patientId}</p>
            </div>
            <div className="space-y-2">
              <p className="text-lg"><strong>ID Doctor:</strong> {selectedPrescription.doctorId}</p>
              <p className="text-lg"><strong>ID Cita:</strong> {selectedPrescription.appointmentId}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
              <Pill className="w-6 h-6 mr-2" />
              Medicamentos Recetados
            </h2>
            <div className="space-y-4">
              {selectedPrescription.medications.map((medication, index) => (
                <div key={index} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <strong className="text-blue-700">Medicamento:</strong>
                      <p className="text-lg">{medication.name}</p>
                    </div>
                    <div>
                      <strong className="text-blue-700">Dosis:</strong>
                      <p className="text-lg">{medication.dosage}</p>
                    </div>
                    <div>
                      <strong className="text-blue-700">Frecuencia:</strong>
                      <p className="text-lg">{medication.frequency}</p>
                    </div>
                    <div>
                      <strong className="text-blue-700">Duración:</strong>
                      <p className="text-lg">{medication.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedPrescription.instructions && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Instrucciones Generales</h2>
              <div className="border border-blue-200 rounded-lg p-4 bg-gray-50">
                <p className="text-lg leading-relaxed">{selectedPrescription.instructions}</p>
              </div>
            </div>
          )}

          <div className="text-center mt-8 pt-8 border-t-2 border-gray-300">
            <p className="text-gray-600">Esta receta ha sido generada digitalmente</p>
            <p className="text-sm text-gray-500 mt-2">ID de Receta: {selectedPrescription.id}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-blue-800 mb-2">Recetas Médicas</h2>
        <p className="text-blue-600 text-lg">Historial de recetas generadas</p>
      </div>

      {prescriptions.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500">No hay recetas disponibles</p>
          <p className="text-gray-400 mt-2">Las recetas aparecerán aquí una vez que sean generadas</p>
        </div>
      ) : (
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <div key={prescription.id} className="border-2 border-blue-200 rounded-xl p-6 hover:bg-blue-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-lg font-semibold text-blue-800">
                      {prescription.date.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <User className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-blue-600">Paciente ID: {prescription.patientId}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Pill className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-blue-600">
                      {prescription.medications.length} medicamento(s) recetado(s)
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Medicamentos:</strong> {prescription.medications.map(med => med.name).join(', ')}
                  </div>
                </div>
                <Button
                  onClick={() => handleViewPrescription(prescription)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Ver Receta
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
