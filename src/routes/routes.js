import { Router } from 'express';
import { getServicios, getTareas, getTarea, createTarea, updateTicket, TareasAsignadas, mistareasCreadas } from '../services/tareas.js';
import { dispositivoDiscofianza } from '../services/dispositivo.js';
import { loginByUsuarioAndPass } from '../services/usuario.js';
import { getUsuariosDaquiNet } from '../services/ZIMA.js';


const router = new Router();
const BASE_PATH = '/daquinet'

router.get('/daquinet/servicioUsuario', getUsuariosDaquiNet)
/**
 * @openapi
 * /daquinet/RD/tareas:
 *   get:
 *     summary: Obtener lista de tareas
 *     description: Obtiene todas las tareas disponibles.
 *     tags:
 *       - Tareas
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codeError:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Listado de Tickets
 *                 content:
 *                   type: object
 *                   properties:
 *                     tickets:
 *                       type: array
 *                       items:
 *                         $ref: "#/components/schemas/Tarea"
 *       403:
 *         description: No se proporcionó un token de autorización
 */


router.get('/daquinet/RD/tareas', getTareas)

/**
 * @openapi
 * /daquinet/RD/tarea/{idtarea}:
 *   get:
 *     summary: Obtener detalles de una tarea por ID
 *     description: Obtiene información detallada de una tarea específica por su ID.
 *     tags:
 *       - Tareas
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idtarea
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codeError:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Información del Ticket
 *                 content:
 *                   $ref: "#/components/schemas/TareaDetallada"
 *       403:
 *         description: No se proporcionó un token de autorización
 *       500:
 *         description: No es posible realizar la acción. La tarea no se encuentra.
 */
router.get('/daquinet/RD/tarea/:idtarea', getTarea)

/**
 * @openapi
 * /daquinet/RD/servicios:
 *   get:
 *     summary: Obtener lista de servicios
 *     description: Obtiene información sobre los servicios y sus detalles.
 *     tags:
 *       - Servicios
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codeError:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Listado de Tickets
 *                 content:
 *                   type: object
 *                   properties:
 *                     servicios:
 *                       type: array
 *                       items:
 *                         $ref: "#/components/schemas/Tarea"
 *                     estados:
 *                       type: array
 *                       items:
 *                         $ref: "#/components/schemas/Estado"
 *                     categorias:
 *                       type: array
 *                       items:
 *                         $ref: "#/components/schemas/Categoria"
 *                     proyecto:
 *                       type: string
 *                       example: "Nombre del proyecto"
 *                     prioridades:
 *                       type: array
 *                       items:
 *                         $ref: "#/components/schemas/Prioridad"
 *       403:
 *         description: No se proporcionó un token de autorización
 */

router.get('/daquinet/RD/servicios', getServicios)

/**
 * @openapi
 * /daquinet/RD/tarea:
 *   post:
 *     summary: Crear nueva tarea
 *     description: Crea una nueva tarea.
 *     tags:
 *       - Tareas
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cusuario:
 *                 type: string
 *                 example: "Nombre del usuario"
 *               cAgencia:
 *                 type: string
 *                 example: "Nombre de la agencia"
 *               tarea:
 *                 type: string
 *                 example: "Descripción de la tarea"
 *               descripcion:
 *                 type: string
 *                 example: "Detalles adicionales de la tarea"
 *               idPrioridad:
 *                 type: number
 *                 example: 1
 *               idCategoria:
 *                 type: number
 *                 example: 1
 *               categoria:
 *                 type: string
 *                 example: "Nombre de la categoría"
 *               cUsuarioResponsable:
 *                 type: string
 *                 example: "Responsable de la tarea"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codeError:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Tarea creada exitosamente.
 *                 content:
 *                   $ref: "#/components/schemas/TareaCreada"
 *       403:
 *         description: No se proporcionó un token de autorización
 *       500:
 *         description: Todos los campos son obligatorios.
 */


router.post('/daquinet/RD/tarea', createTarea)

/**
 * @openapi
 * /daquinet/RD/tarea:
 *   put:
 *     summary: Actualizar tarea
 *     description: Actualiza la información de una tarea existente.
 *     tags:
 *       - Tareas
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cusuario:
 *                 type: string
 *                 example: "Nombre del usuario"
 *               idTarea:
 *                 type: string
 *                 example: "ID de la tarea"
 *               tarea:
 *                 type: string
 *                 example: "Descripción de la tarea actualizada"
 *               descripcion:
 *                 type: string
 *                 example: "Detalles adicionales de la tarea actualizada"
 *               idEstado:
 *                 type: number
 *                 example: 1
 *               idCategoria:
 *                 type: number
 *                 example: 1
 *               categoria:
 *                 type: string
 *                 example: "Nombre de la categoría actualizada"
 *               cUsuarioResponsable:
 *                 type: string
 *                 example: "Responsable de la tarea actualizada"
 *               notas:
 *                 type: string
 *                 example: "Notas adicionales"
 *               usuarioMod:
 *                 type: string
 *                 example: "Usuario que realiza la modificación"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codeError:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Tarea actualizada exitosamente.
 *                 content: null
 *       401:
 *         description: No se proporcionó un token de autorización
 *       500:
 *         description: No es posible realizar la acción. La tarea no se encuentra.
 */

router.put('/daquinet/RD/tarea', updateTicket)

/**
 * @openapi
 * /daquinet/RD/tarea/misTareas/{idUsuario}/{caracter}:
 *   get:
 *     summary: Obtener lista de tareas asignadas a un usuario
 *     description: Obtiene todas las tareas asignadas a un usuario específico.
 *     tags:
 *       - Tareas
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *       - in: path
 *         name: caracter
 *         required: true
 *         description: Caracter específico
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codeError:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Listado de Tareas
 *                 content:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Tarea"
 *       401:
 *         description: No se proporcionó un token de autorización
 *       500:
 *         description: Ha ocurrido un problema.
 */

router.get('/daquinet/RD/tarea/misTareas/:idUsuario/:caracter', TareasAsignadas)
/**
 * @openapi
 * /daquinet/RD/tarea/misTareasCreadas/{idUsuario}/{caracter}:
 *   get:
 *     summary: Obtener lista de tareas creadas por un usuario
 *     description: Obtiene todas las tareas creadas por un usuario específico.
 *     tags:
 *       - Tareas
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *       - in: path
 *         name: caracter
 *         required: true
 *         description: Caracter específico
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codeError:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Listado de tareas creadas
 *                 content:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Tarea"
 *       401:
 *         description: No se proporcionó un token de autorización
 *       500:
 *         description: Tareas creadas
 */

router.get('/daquinet/RD/tarea/misTareasCreadas/:idUsuario/:caracter', mistareasCreadas)

// dispositivo Confianza
/**
 * @openapi
 * /daquinet/login:
 *   post:
 *     summary: Autenticación de dispositivo
 *     description: Realiza la autenticación de un dispositivo mediante sus datos.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IDDISPOSITIVO:
 *                 type: string
 *                 example: "ID del dispositivo"
 *               MODELO:
 *                 type: string
 *                 example: "Modelo del dispositivo"
 *               TIPO:
 *                 type: string
 *                 example: "Tipo de dispositivo"
 *               MARCA:
 *                 type: string
 *                 example: "Marca del dispositivo"
 *               VERSION:
 *                 type: string
 *                 example: "Versión del dispositivo"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codeError:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Autenticación exitosa
 *                 content:
 *                   type: object
 *                   properties:
 *                     autenticacionExitosa:
 *                       type: boolean
 *                       example: true
 *                     IdDispositivo:
 *                       type: string
 *                       example: "ID del dispositivo"
 *                     cusuario:
 *                       type: string
 *                       example: "78"
 *                     token:
 *                       type: string
 *                       example: "Token generado"
 *       500:
 *         description: Todos los campos son obligatorios.
 */

router.post('/daquinet/login', dispositivoDiscofianza)

/**
 * @openapi
 * /daquinet/inicioSesion:
 *   post:
 *     summary: Inicio de sesión por usuario y contraseña
 *     description: Inicia sesión utilizando las credenciales de usuario y contraseña.
 *     tags:
 *       - Inicio de Sesión
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IDDISPOSITIVO:
 *                 type: string
 *                 example: "ID del dispositivo"
 *               CUSUARIO:
 *                 type: string
 *                 example: "Nombre de usuario"
 *               CONTRASEÑA:
 *                 type: string
 *                 example: "Contraseña del usuario"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codeError:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Logeo exitosa
 *                 content:
 *                   type: object
 *                   properties:
 *                     autenticacionExitosa:
 *                       type: boolean
 *                       example: true
 *                     IdDispositivo:
 *                       type: string
 *                       example: "ID del dispositivo"
 *                     cusuario:
 *                       type: string
 *                       example: "78"
 *                     cAgencia:
 *                       type: string
 *                       example: "1"
 *       401:
 *         description: No se proporcionó un token de autorización
 *       500:
 *         description: Todos los campos son obligatorios o Autentificación fallida. Inténtalo más tarde.
 */

router.post('/daquinet/inicioSesion', loginByUsuarioAndPass)
    
export default router;