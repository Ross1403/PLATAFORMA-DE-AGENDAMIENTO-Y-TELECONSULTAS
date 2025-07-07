
# TeleSalud - Sistema de Telemedicina

## Estructura del Proyecto

```
salud-alegre-senior/
├── frontend/           # Aplicación React con Vite
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/            # API Express con Prisma
│   ├── src/
│   ├── prisma/
│   ├── lib/
│   ├── package.json
│   └── .env
└── README.md
```

## Configuración del Backend

### 1. Configurar XAMPP
- Inicia XAMPP y asegúrate de que MySQL esté corriendo en el puerto 3309
- Crea la base de datos `salud_alegre_db` en phpMyAdmin

### 2. Instalar dependencias del backend
```bash
cd backend
npm install
```

### 3. Configurar base de datos
```bash
# Generar cliente de Prisma
npx prisma generate

# Sincronizar esquema con la base de datos
npx prisma db push

# Ejecutar seed (opcional)
npm run seed
```

### 4. Iniciar servidor backend
```bash
npm run dev
```
El servidor estará disponible en http://localhost:4000

## Configuración del Frontend

### 1. Instalar dependencias del frontend
```bash
cd frontend
npm install
```

### 2. Iniciar aplicación frontend
```bash
npm run dev
```
La aplicación estará disponible en http://localhost:5173

## Verificación

1. **Backend**: Visita http://localhost:4000/api/health - Debe mostrar `{"status":"ok"}`
2. **Frontend**: La aplicación debe conectarse automáticamente al backend
3. **Base de datos**: Verifica las tablas en phpMyAdmin

## Funcionalidades

- ✅ Registro de pacientes
- ✅ Gestión de doctores  
- ✅ Agendamiento de citas
- ✅ Prescripciones médicas
- ✅ Historial médico
- ✅ Teleconsultas

## Tecnologías

### Backend
- Express.js + TypeScript
- Prisma ORM
- MySQL (XAMPP)
- CORS

### Frontend  
- React + TypeScript
- Vite
- TailwindCSS + shadcn/ui
- React Query
- React Router
