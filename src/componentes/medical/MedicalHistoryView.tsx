
import { useState, useEffect } from 'react';
import { Button } from "@/componentes/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/componentes/ui/card";
import { Badge } from "@/componentes/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/componentes/ui/tabs";
import { MedicalHistoryController } from '../../controladores/MedicalHistoryController';
import { MedicalRecord, MedicalHistorySummary } from '../../modelos/MedicalHistory';
import { AuthController } from '../../controladores/AuthController';
import { FileText, Calendar, Pill, Activity, AlertCircle, CheckCircle } from 'lucide-react';

export const MedicalHistoryView = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [summary, setSummary] = useState<MedicalHistorySummary | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const currentUser = AuthController.getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      const medicalRecords = MedicalHistoryController.getMedicalHistory();
      setRecords(medicalRecords);
      
      if (currentUser.role === 'patient') {
        const patientSummary = MedicalHistoryController.getMedicalSummary(currentUser.id);
        setSummary(patientSummary);
      }
    }
  }, [currentUser]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConsultationTypeColor = (type: string) => {
    return type === 'teleconsulta' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-orange-100 text-orange-800';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-800 flex items-center">
          <FileText className="w-6 h-6 mr-2" />
          Historial Médico Completo
        </h2>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="history">Historial de Consultas</TabsTrigger>
          {currentUser?.role === 'patient' && (
            <TabsTrigger value="summary">Resumen Médico</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          {records.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                <p className="text-blue-600 text-lg">No hay registros médicos disponibles</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {records.map((record) => (
                <Card key={record.id} className="border-2 border-blue-200 hover:bg-blue-50 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-blue-800">
                        {record.diagnosis}
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Badge className={getConsultationTypeColor(record.consultationType)}>
                          {record.consultationType}
                        </Badge>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center text-blue-600 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {record.consultationDate.toLocaleDateString()} - Dr. {record.doctorId}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-1">Síntomas:</h4>
                        <p className="text-blue-600">{record.symptoms}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-1">Tratamiento:</h4>
                        <p className="text-blue-600">{record.treatment}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-blue-700 mb-1">Recomendaciones:</h4>
                        <p className="text-blue-600">{record.recommendations}</p>
                      </div>

                      {record.medications.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                            <Pill className="w-4 h-4 mr-1" />
                            Medicamentos:
                          </h4>
                          <div className="space-y-2">
                            {record.medications.map((med, index) => (
                              <div key={index} className="bg-blue-50 p-3 rounded-lg">
                                <div className="flex justify-between items-start">
                                  <span className="font-medium text-blue-800">{med.name}</span>
                                  <span className="text-sm text-blue-600">{med.dosage}</span>
                                </div>
                                <p className="text-sm text-blue-600 mt-1">
                                  {med.frequency} por {med.duration}
                                </p>
                                <p className="text-xs text-blue-500 mt-1">{med.instructions}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {record.vitalSigns && (
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                            <Activity className="w-4 h-4 mr-1" />
                            Signos Vitales:
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {record.vitalSigns.bloodPressure && (
                              <div className="bg-blue-50 p-2 rounded">
                                <p className="text-xs text-blue-600">Presión Arterial</p>
                                <p className="font-medium text-blue-800">{record.vitalSigns.bloodPressure}</p>
                              </div>
                            )}
                            {record.vitalSigns.heartRate && (
                              <div className="bg-blue-50 p-2 rounded">
                                <p className="text-xs text-blue-600">Frecuencia Cardíaca</p>
                                <p className="font-medium text-blue-800">{record.vitalSigns.heartRate} bpm</p>
                              </div>
                            )}
                            {record.vitalSigns.temperature && (
                              <div className="bg-blue-50 p-2 rounded">
                                <p className="text-xs text-blue-600">Temperatura</p>
                                <p className="font-medium text-blue-800">{record.vitalSigns.temperature}°C</p>
                              </div>
                            )}
                            {record.vitalSigns.weight && (
                              <div className="bg-blue-50 p-2 rounded">
                                <p className="text-xs text-blue-600">Peso</p>
                                <p className="font-medium text-blue-800">{record.vitalSigns.weight} kg</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {record.followUpRequired && (
                        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                          <div className="flex items-center">
                            <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                            <span className="text-yellow-800 font-medium">Seguimiento requerido</span>
                          </div>
                          {record.followUpDate && (
                            <p className="text-yellow-700 text-sm mt-1">
                              Próxima cita: {record.followUpDate.toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      )}

                      {record.notes && (
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-1">Notas adicionales:</h4>
                          <p className="text-blue-600 italic">{record.notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {currentUser?.role === 'patient' && summary && (
          <TabsContent value="summary">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-800">Resumen General</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{summary.totalConsultations}</div>
                      <div className="text-sm text-blue-500">Total Consultas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg text-blue-600">
                        {summary.lastConsultation?.toLocaleDateString() || 'N/A'}
                      </div>
                      <div className="text-sm text-blue-500">Última Consulta</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{summary.chronicConditions.length}</div>
                      <div className="text-sm text-blue-500">Condiciones Crónicas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{summary.currentMedications.length}</div>
                      <div className="text-sm text-blue-500">Medicamentos Actuales</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {summary.chronicConditions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800">Condiciones Crónicas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {summary.chronicConditions.map((condition, index) => (
                        <Badge key={index} className="bg-orange-100 text-orange-800">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {summary.currentMedications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 flex items-center">
                      <Pill className="w-5 h-5 mr-2" />
                      Medicamentos Actuales
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {summary.currentMedications.map((med, index) => (
                        <div key={index} className="border border-blue-200 p-3 rounded-lg">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-blue-800">{med.name}</span>
                            <Badge className="bg-green-100 text-green-800">Activo</Badge>
                          </div>
                          <p className="text-sm text-blue-600 mt-1">
                            {med.dosage} - {med.frequency}
                          </p>
                          <p className="text-xs text-blue-500">{med.instructions}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
