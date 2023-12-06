import { Router } from 'express';
import { getServicios, getTareas, getTarea, createTarea, updateTicket } from '../services/tareas.js';
import { dispositivoDiscofianza } from '../services/dispositivo.js';
import { loginByUsuarioAndPass } from '../services/usuario.js';


const router = new Router();

router.get('/RD/tareas', getTareas)
router.get('/RD/tarea/:idtarea', getTarea)
router.get('/RD/servicios', getServicios)
router.post('/RD/tarea', createTarea)
router.put('/RD/tarea', updateTicket)

// dispositivo Confianza
router.post('/login', dispositivoDiscofianza)
router.post('/inicioSesion', loginByUsuarioAndPass)

export default router;