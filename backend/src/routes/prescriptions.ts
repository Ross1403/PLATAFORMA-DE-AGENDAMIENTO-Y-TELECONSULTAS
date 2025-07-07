
import { Router } from 'express';
import { prisma } from '../../lib/prisma';

const router = Router();

// Obtener todas las recetas
router.get('/', async (_req, res) => {
  try {
    const prescriptions = await prisma.prescription.findMany({
      include: {
        patient: true,
        doctor: true,
        appointment: true
      }
    });
    res.json(prescriptions);
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({ error: 'Error al obtener recetas' });
  }
});

// Crear nueva receta
router.post('/', async (req, res) => {
  try {
    const { patientId, doctorId, appointmentId, medications, instructions } = req.body;
    
    const newPrescription = await prisma.prescription.create({
      data: {
        patientId: parseInt(patientId),
        doctorId: parseInt(doctorId),
        appointmentId: parseInt(appointmentId),
        medications,
        instructions
      },
      include: {
        patient: true,
        doctor: true,
        appointment: true
      }
    });
    
    res.status(201).json(newPrescription);
  } catch (error) {
    console.error('Error creating prescription:', error);
    res.status(500).json({ error: 'Error al crear receta' });
  }
});

// Obtener recetas por paciente
router.get('/patient/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const prescriptions = await prisma.prescription.findMany({
      where: { patientId: parseInt(patientId) },
      include: {
        patient: true,
        doctor: true,
        appointment: true
      }
    });
    res.json(prescriptions);
  } catch (error) {
    console.error('Error fetching patient prescriptions:', error);
    res.status(500).json({ error: 'Error al obtener recetas del paciente' });
  }
});

export default router;
