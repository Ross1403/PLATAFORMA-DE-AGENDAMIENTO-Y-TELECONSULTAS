
import { Router } from 'express';
import { prisma } from '../../lib/prisma';

const router = Router();

// Obtener todas las citas
router.get('/', async (_req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true,
        doctor: true,
        prescriptions: true
      }
    });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Error al obtener citas' });
  }
});

// Crear nueva cita
router.post('/', async (req, res) => {
  try {
    const { patientId, doctorId, date, time, type, notes, meetingLink } = req.body;
    
    const newAppointment = await prisma.appointment.create({
      data: {
        patientId: parseInt(patientId),
        doctorId: parseInt(doctorId),
        date: new Date(date),
        time,
        type,
        notes,
        meetingLink
      },
      include: {
        patient: true,
        doctor: true
      }
    });
    
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Error al crear cita' });
  }
});

export default router;
