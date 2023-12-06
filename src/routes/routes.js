import { Router } from 'express';
import { getServicios, getTareas, getTarea, createTarea, updateTicket } from '../services/tareas.js';


const router = new Router();

router.get('/RD/tareas', getTareas)
router.get('/RD/tarea/:idtarea', getTarea)
router.get('/RD/servicios', getServicios)
router.post('/RD/tarea', createTarea)
router.put('/RD/tarea', updateTicket)
export default router;