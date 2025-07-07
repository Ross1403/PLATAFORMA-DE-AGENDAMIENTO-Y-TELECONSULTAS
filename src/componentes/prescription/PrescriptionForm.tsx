
import { useState } from 'react';
import { Button } from "@/componentes/ui/button";
import { Input } from "@/componentes/ui/input";
import { Label } from "@/componentes/ui/label";
import { Textarea } from "@/componentes/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DoctorController } from '../../controladores/DoctorController';
import { Medication } from '../../modelos/Doctor';
import { FileText, Plus, Trash2 } from 'lucide-react';

interface PrescriptionFormProps {
  patientId: string;
  doctorId: string;
  appointmentId: string;
  onPrescriptionCreated: () => void;
}

export const PrescriptionForm = ({ patientId, doctorId, appointmentId, onPrescriptionCreated }: PrescriptionFormProps) => {
  const [medications, setMedications] = useState<Medication[]>([
    { name: '', dosage: '', frequency: '', duration: '' }
  ]);
  const [instructions, setInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const addMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const removeMedication = (index: number) => {
    if (medications.length > 1) {
      setMedications(medications.filter((_, i) => i !== index));
    }
  };

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    const updated = medications.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setMedications(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validMedications = medications.filter(med => med.name.trim() !== '');
      
      if (validMedications.length === 0) {
        toast({
          title: "Error",
          description: "Debe agregar al menos un medicamento",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      DoctorController.createPrescription({
        patientId,
        doctorId,
        appointmentId,
        medications: validMedications,
        instructions,
        date: new Date()
      });
      
      toast({
        title: "¡Éxito!",
        description: "Receta médica generada exitosamente",
        variant: "default",
      });

      onPrescriptionCreated();
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al generar la receta. Por favor intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-blue-800 mb-2">Generar Receta Médica</h2>
        <p className="text-blue-600 text-lg">Complete la información de los medicamentos</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-blue-700 text-xl font-semibold">
              Medicamentos Recetados
            </Label>
            <Button
              type="button"
              onClick={addMedication}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Medicamento
            </Button>
          </div>

          {medications.map((medication, index) => (
            <div key={index} className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-blue-800">
                  Medicamento {index + 1}
                </h3>
                {medications.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeMedication(index)}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-blue-700 font-semibold mb-2 block">
                    Nombre del Medicamento *
                  </Label>
                  <Input
                    value={medication.name}
                    onChange={(e) => updateMedication(index, 'name', e.target.value)}
                    className="h-12 border-2 border-blue-300"
                    placeholder="Ej: Paracetamol"
                    required
                  />
                </div>
                
                <div>
                  <Label className="text-blue-700 font-semibold mb-2 block">
                    Dosis *
                  </Label>
                  <Input
                    value={medication.dosage}
                    onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                    className="h-12 border-2 border-blue-300"
                    placeholder="Ej: 500mg"
                    required
                  />
                </div>
                
                <div>
                  <Label className="text-blue-700 font-semibold mb-2 block">
                    Frecuencia *
                  </Label>
                  <Input
                    value={medication.frequency}
                    onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                    className="h-12 border-2 border-blue-300"
                    placeholder="Ej: Cada 8 horas"
                    required
                  />
                </div>
                
                <div>
                  <Label className="text-blue-700 font-semibold mb-2 block">
                    Duración *
                  </Label>
                  <Input
                    value={medication.duration}
                    onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                    className="h-12 border-2 border-blue-300"
                    placeholder="Ej: 7 días"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <Label className="text-blue-700 text-lg font-semibold mb-3 block">
            Instrucciones Generales
          </Label>
          <Textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="min-h-[120px] text-lg border-2 border-blue-300"
            placeholder="Instrucciones adicionales para el paciente..."
          />
        </div>

        <div className="text-center pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-12 py-4 text-xl bg-green-600 hover:bg-green-700 h-16"
          >
            {isSubmitting ? 'Generando...' : 'Generar Receta'}
          </Button>
        </div>
      </form>
    </div>
  );
};
