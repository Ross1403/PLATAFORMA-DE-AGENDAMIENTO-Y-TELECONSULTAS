
# Backend - TeleSalud

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar base de datos en `.env`:
```
DATABASE_URL="mysql://root:@localhost:3309/salud_alegre_db"
```

3. Configurar Prisma:
```bash
npx prisma generate
npx prisma db push
npm run seed
```

4. Iniciar servidor:
```bash
npm run dev
```

## Endpoints API

### Pacientes
- `GET /api/patients` - Obtener todos los pacientes
- `POST /api/patients` - Crear nuevo paciente
- `GET /api/patients/:id` - Obtener paciente por ID

### Doctores
- `GET /api/doctors` - Obtener todos los doctores
- `POST /api/doctors` - Crear nuevo doctor

### Citas
- `GET /api/appointments` - Obtener todas las citas
- `POST /api/appointments` - Crear nueva cita

### Recetas
- `GET /api/prescriptions` - Obtener todas las recetas
- `POST /api/prescriptions` - Crear nueva receta
- `GET /api/prescriptions/patient/:patientId` - Obtener recetas por paciente

### Health Check
- `GET /api/health` - Verificar estado del servidor
