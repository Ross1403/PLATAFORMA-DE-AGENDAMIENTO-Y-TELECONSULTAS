
import { Router } from 'express';
import { prisma } from '../../lib/prisma';

const router = Router();

// Obtener todos los pacientes
router.get('/', async (_req, res) => {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        appointments: true,
        prescriptions: true,
        medicalRecords: true
      }
    });
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Error al obtener pacientes' });
  }
});

// Crear nuevo paciente
router.post('/', async (req, res) => {
  try {
    const { nombres, apellidos, dni, fechaNacimiento, correo, telefono } = req.body;
    
    const newPatient = await prisma.patient.create({
      data: {
        nombres,
        apellidos,
        dni,
        fechaNacimiento: new Date(fechaNacimiento),
        correo,
        telefono
      }
    });
    
    res.status(201).json(newPatient);
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ error: 'Error al crear paciente' });
  }
});

// Obtener paciente por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await prisma.patient.findUnique({
      where: { id: parseInt(id) },
      include: {
        appointments: true,
        prescriptions: true,
        medicalRecords: true
      }
    });
    
    if (!patient) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
    
    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Error al obtener paciente' });
  }
});

export default router;
