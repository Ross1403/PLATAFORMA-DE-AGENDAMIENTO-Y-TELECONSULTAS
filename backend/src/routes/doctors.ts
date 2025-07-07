
import { Router } from 'express';
import { prisma } from '../../lib/prisma';

const router = Router();

// Obtener todos los doctores
router.get('/', async (_req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        appointments: true,
        prescriptions: true
      }
    });
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Error al obtener doctores' });
  }
});

// Crear nuevo doctor
router.post('/', async (req, res) => {
  try {
    const { nombres, apellidos, especialidad, numeroLicencia, telefono, correo } = req.body;
    
    const newDoctor = await prisma.doctor.create({
      data: {
        nombres,
        apellidos,
        especialidad,
        numeroLicencia,
        telefono,
        correo
      }
    });
    
    res.status(201).json(newDoctor);
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({ error: 'Error al crear doctor' });
  }
});

export default router;
