-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-07-2025 a las 19:54:26
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `teleconsultas_db`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarDoctor` (IN `p_nombre` VARCHAR(100), IN `p_especialidad` VARCHAR(100))   BEGIN
    INSERT INTO Doctor (Nombre, Especialidad)
    VALUES (p_nombre, p_especialidad);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarPaciente` (IN `p_nombre` VARCHAR(100), IN `p_apellido` VARCHAR(100), IN `p_fechaNacimiento` DATE, IN `p_correo` VARCHAR(100), IN `p_telefono` VARCHAR(15))   BEGIN
    INSERT INTO Paciente (Nombre, Apellido, FechaNacimiento, Correo, Telefono)
    VALUES (p_nombre, p_apellido, p_fechaNacimiento, p_correo, p_telefono);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `RegistrarCita` (IN `p_id_paciente` INT, IN `p_id_doctor` INT, IN `p_fecha` DATE, IN `p_hora` TIME, IN `p_tipo_consulta` ENUM('Presencial','Teleconsulta'))   BEGIN
    DECLARE v_existencia INT;

    SELECT COUNT(*) INTO v_existencia
    FROM Cita
    WHERE ID_Doctor = p_id_doctor
      AND Fecha = p_fecha
      AND Hora = p_hora
      AND Estado = 'Confirmada';

    IF v_existencia = 0 THEN
        INSERT INTO Cita (ID_Paciente, ID_Doctor, Fecha, Hora, TipoConsulta, Estado)
        VALUES (p_id_paciente, p_id_doctor, p_fecha, p_hora, p_tipo_consulta, 'Confirmada');
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El horario no está disponible';
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `RegistrarHistorial` (IN `p_id_paciente` INT, IN `p_fecha` DATE, IN `p_diagnostico` VARCHAR(255), IN `p_tratamiento` VARCHAR(255))   BEGIN
    INSERT INTO HistorialMedico (ID_Paciente, Fecha, Diagnostico, Tratamiento)
    VALUES (p_id_paciente, p_fecha, p_diagnostico, p_tratamiento);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `ID_Cita` int(11) NOT NULL,
  `ID_Paciente` int(11) DEFAULT NULL,
  `ID_Doctor` int(11) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Hora` time DEFAULT NULL,
  `TipoConsulta` enum('Presencial','Teleconsulta') DEFAULT NULL,
  `Estado` enum('Pendiente','Confirmada','Cancelada') DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cita`
--

INSERT INTO `cita` (`ID_Cita`, `ID_Paciente`, `ID_Doctor`, `Fecha`, `Hora`, `TipoConsulta`, `Estado`) VALUES
(1, 1, 1, '2025-07-10', '09:00:00', 'Teleconsulta', 'Confirmada'),
(2, 2, 2, '2025-07-11', '10:00:00', 'Presencial', 'Confirmada'),
(3, 3, 3, '2025-07-12', '11:00:00', 'Teleconsulta', 'Confirmada'),
(4, 4, 4, '2025-07-13', '12:00:00', 'Presencial', 'Confirmada'),
(5, 5, 5, '2025-07-14', '13:00:00', 'Teleconsulta', 'Confirmada');

--
-- Disparadores `cita`
--
DELIMITER $$
CREATE TRIGGER `Cita_BD` BEFORE DELETE ON `cita` FOR EACH ROW BEGIN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se permite eliminar citas';
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Cita_BI` BEFORE INSERT ON `cita` FOR EACH ROW BEGIN
    DECLARE v_count INT;
    SELECT COUNT(*) INTO v_count FROM Cita
    WHERE ID_Doctor = NEW.ID_Doctor AND Fecha = NEW.Fecha AND Hora = NEW.Hora AND Estado = 'Confirmada';
    IF v_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El horario no está disponible';
    ELSE
        SET NEW.Estado = 'Confirmada';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Cita_BU` BEFORE UPDATE ON `cita` FOR EACH ROW BEGIN
    DECLARE v_count INT;
    SELECT COUNT(*) INTO v_count FROM Cita
    WHERE ID_Doctor = NEW.ID_Doctor AND Fecha = NEW.Fecha AND Hora = NEW.Hora AND Estado = 'Confirmada' AND ID_Cita <> OLD.ID_Cita;
    IF v_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El horario ya está ocupado';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctor`
--

CREATE TABLE `doctor` (
  `ID_Doctor` int(11) NOT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `Especialidad` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `doctor`
--

INSERT INTO `doctor` (`ID_Doctor`, `Nombre`, `Especialidad`) VALUES
(1, 'Dr. Carlos Pérez', 'Geriatría'),
(2, 'Dra. Ana Torres', 'Medicina Interna'),
(3, 'Dr. Jorge Medina', 'Cardiología'),
(4, 'Dra. Laura Chávez', 'Neurología'),
(5, 'Dr. Marco Díaz', 'Medicina Familiar');

--
-- Disparadores `doctor`
--
DELIMITER $$
CREATE TRIGGER `Doctor_BD` BEFORE DELETE ON `doctor` FOR EACH ROW BEGIN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se permite eliminar doctores';
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Doctor_BI` BEFORE INSERT ON `doctor` FOR EACH ROW BEGIN
    DECLARE v_count INT;
    SELECT COUNT(*) INTO v_count FROM Doctor WHERE Nombre = NEW.Nombre AND Especialidad = NEW.Especialidad;
    IF v_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Doctor ya registrado con esa especialidad';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Doctor_BU` BEFORE UPDATE ON `doctor` FOR EACH ROW BEGIN
    DECLARE v_count INT;
    SELECT COUNT(*) INTO v_count FROM Doctor WHERE Nombre = NEW.Nombre AND Especialidad = NEW.Especialidad AND ID_Doctor <> OLD.ID_Doctor;
    IF v_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Doctor ya registrado con esa especialidad';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historialmedico`
--

CREATE TABLE `historialmedico` (
  `ID_Historial` int(11) NOT NULL,
  `ID_Paciente` int(11) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Diagnostico` varchar(255) DEFAULT NULL,
  `Tratamiento` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historialmedico`
--

INSERT INTO `historialmedico` (`ID_Historial`, `ID_Paciente`, `Fecha`, `Diagnostico`, `Tratamiento`) VALUES
(1, 1, '2025-07-10', 'Hipertensión controlada', 'Losartán 50mg'),
(2, 2, '2025-07-11', 'Diabetes Mellitus', 'Metformina 850mg'),
(3, 3, '2025-07-12', 'Arritmia leve', 'Atenolol 25mg'),
(4, 4, '2025-07-13', 'Migraña crónica', 'Ibuprofeno 400mg'),
(5, 5, '2025-07-14', 'Artritis leve', 'Diclofenaco 50mg');

--
-- Disparadores `historialmedico`
--
DELIMITER $$
CREATE TRIGGER `Historial_BD` BEFORE DELETE ON `historialmedico` FOR EACH ROW BEGIN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se permite eliminar historial médico';
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Historial_BI` BEFORE INSERT ON `historialmedico` FOR EACH ROW BEGIN
    DECLARE v_count INT;
    SELECT COUNT(*) INTO v_count FROM HistorialMedico
    WHERE ID_Paciente = NEW.ID_Paciente AND Fecha = NEW.Fecha;
    IF v_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ya existe un historial para este paciente en esta fecha';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Historial_BU` BEFORE UPDATE ON `historialmedico` FOR EACH ROW BEGIN
    DECLARE v_count INT;
    SELECT COUNT(*) INTO v_count FROM HistorialMedico
    WHERE ID_Paciente = NEW.ID_Paciente AND Fecha = NEW.Fecha AND ID_Historial <> OLD.ID_Historial;
    IF v_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ya existe un historial para este paciente en esa fecha';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `ID_Paciente` int(11) NOT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `Apellido` varchar(100) DEFAULT NULL,
  `FechaNacimiento` date DEFAULT NULL,
  `Correo` varchar(100) DEFAULT NULL,
  `Telefono` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`ID_Paciente`, `Nombre`, `Apellido`, `FechaNacimiento`, `Correo`, `Telefono`) VALUES
(1, 'Luis', 'Ramírez', '1950-05-12', 'luis@mail.com', '987654321'),
(2, 'María', 'Lozano', '1945-08-25', 'maria@mail.com', '912345678'),
(3, 'Carlos', 'Torres', '1947-01-30', 'carlos@mail.com', '922334455'),
(4, 'Ana', 'Gómez', '1952-12-05', 'ana@mail.com', '933221100'),
(5, 'Pedro', 'Quispe', '1948-03-14', 'pedro@mail.com', '944556677');

--
-- Disparadores `paciente`
--
DELIMITER $$
CREATE TRIGGER `Paciente_BD` BEFORE DELETE ON `paciente` FOR EACH ROW BEGIN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se permite eliminar pacientes';
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Paciente_BI` BEFORE INSERT ON `paciente` FOR EACH ROW BEGIN
    DECLARE v_count INT;
    SELECT COUNT(*) INTO v_count FROM Paciente WHERE Correo = NEW.Correo;
    IF v_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Correo ya registrado';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Paciente_BU` BEFORE UPDATE ON `paciente` FOR EACH ROW BEGIN
    DECLARE v_count INT;
    SELECT COUNT(*) INTO v_count FROM Paciente WHERE Correo = NEW.Correo AND ID_Paciente <> OLD.ID_Paciente;
    IF v_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Correo ya registrado en otro paciente';
    END IF;
END
$$
DELIMITER ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`ID_Cita`),
  ADD KEY `ID_Paciente` (`ID_Paciente`),
  ADD KEY `ID_Doctor` (`ID_Doctor`);

--
-- Indices de la tabla `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`ID_Doctor`);

--
-- Indices de la tabla `historialmedico`
--
ALTER TABLE `historialmedico`
  ADD PRIMARY KEY (`ID_Historial`),
  ADD KEY `ID_Paciente` (`ID_Paciente`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`ID_Paciente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `ID_Cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `doctor`
--
ALTER TABLE `doctor`
  MODIFY `ID_Doctor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `historialmedico`
--
ALTER TABLE `historialmedico`
  MODIFY `ID_Historial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `ID_Paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `cita_ibfk_1` FOREIGN KEY (`ID_Paciente`) REFERENCES `paciente` (`ID_Paciente`),
  ADD CONSTRAINT `cita_ibfk_2` FOREIGN KEY (`ID_Doctor`) REFERENCES `doctor` (`ID_Doctor`);

--
-- Filtros para la tabla `historialmedico`
--
ALTER TABLE `historialmedico`
  ADD CONSTRAINT `historialmedico_ibfk_1` FOREIGN KEY (`ID_Paciente`) REFERENCES `paciente` (`ID_Paciente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
