import { tickets, servicios, unaTarea, misTareas, tokereponse, misTaresAsignadas, tareasCreadas } from "./datos.js"

export const getTareas = (req, res) => {

    // const bearerHeader = req.headers['authorization'];
    // if (!bearerHeader) {
    //     return res.status(403);
    // }

    const response = {

        codeError: 200,
        message: "Listado de Tickets",
        content: {
            tickets: tickets.map(ticket => ({
                idTarea: ticket.idTarea,
                tarea: ticket.tarea,
                estado: ticket.estado,
                prioridad: ticket.prioridad,
                asignado: ticket.asignado,
                fechaCreacion: ticket.fechaCreacion,
                detalles: ticket.detalles.map(detalle => ({
                    id: detalle.id,
                    name: detalle.name,
                    value: detalle.value
                }))
            }))
        }
    };

    return res.json(response);
}


    export const getServicios = (req, res) => {

        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(403);
        }

        const response = {
            codeError: 200,
            message: "Listado de Tickets",
            content: {
                // Adding additional service-related information
                estados: servicios[0].content.estados,
                categorias: servicios[0].content.categorias,
                proyecto: servicios[0].content.proyecto,
                prioridades: servicios[0].content.prioridades
            }
        };

        return res.json(response);
    };

    export const getTarea = (req, res) => {
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(403).send("Authorization header is missing");
        }
    
        // Extract idtarea from request parameters
        const idTareaParam = parseInt(req.params.idtarea);
        if (isNaN(idTareaParam)) {
            return res.status(400).send("Invalid idtarea parameter");
        }
    
        const foundTarea = tickets.find(tarea => tarea.idTarea === idTareaParam);
    
        if (!foundTarea) {
            const response = {
                codeError: 500,
                message: "No es posible realizar la acción. La tarea no se encuentra.",
                content: null,
            };
    
            return res.status(500).json(response);
        }
    
        const response = {
            codeError: 200,
            message: "Información del Ticket",
            content: {
                idTarea: foundTarea.idTarea,
                tarea: foundTarea.tarea,
                descripcion: foundTarea.descripcion,
                proyecto: foundTarea.proyecto,
                idEstado: foundTarea.idEstado,
                estado: foundTarea.estado,
                prioridad: foundTarea.prioridad,
                idAutor: foundTarea.idAutor,
                autor: foundTarea.autor,
                asignado: foundTarea.asignado,
                fechaSolicitud: foundTarea.fechaSolicitud,
                fechaContestacion: foundTarea.fechaContestacion,
                detalles: foundTarea.detalles.map(detalle => ({
                    id: detalle.id,
                    name: detalle.name,
                    value: detalle.value
                }))
            }
        };
    
        return res.json(response);
    };
    

export const createTarea = (req, res) => {

    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        return res.status(403);
    }

    const {
        cusuario,
        cAgencia,
        tarea,
        descripcion,
        idPrioridad,
        idCategoria,
        categoria,
        cUsuarioResponsable
    } = req.body;


    if (!cusuario || !cAgencia || !tarea || !descripcion || !idPrioridad || !idCategoria || !categoria || !cUsuarioResponsable) {
        const response = {
            codeError: 500, // Bad Request
            message: "Todos los campos son obligatorios.",
            content: null,
        };

        return res.status(500).json(response);
    }

    const newIdTarea = generateUniqueId();


    const newTarea = {
        codeError: 200,
        message: "Tarea creada exitosamente.",
        content: {
            idTarea: newIdTarea,
            cusuario,
            cAgencia,
            tarea,
            descripcion,
            idPrioridad,
            idCategoria,
            categoria,
            cUsuarioResponsable,
        },
    };

    return res.status(200).json(newTarea);
};

const generateUniqueId = () => {
    return Date.now().toString();
};


export const updateTicket = (req, res) => {

    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        return res.status(401);
    }

    const {
        cusuario,
        idTarea,
        tarea,
        descripcion,
        idEstado,
        idCategoria,
        categoria,
        cUsuarioResponsable,
        notas,
        usuarioMod,
    } = req.body;

    const foundTicketIndex = tickets.findIndex(ticket => ticket.idTarea === idTarea);

    if (foundTicketIndex === -1) {
        const response = {
            codeError: 500,
            message: "No es posible realizar la acción. La tarea no se encuentra.",
            content: null,
        };

        return res.status(500).json(response);
    }

    tickets[foundTicketIndex] = {
        idTarea,
        tarea,
        estado: mapEstadoIdToName(idEstado),
        descripcion,

    };

    const response = {
        codeError: 200,
        message: "Tarea actualizada exitosamente.",
        content: null,
    };

    return res.status(200).json(response);
};

// Function to map estado id to estado name
const mapEstadoIdToName = (idEstado) => {
    switch (idEstado) {
        case 1:
            return "Nueva";
        case 2:
            return "EN DESARROLLO";
        case 7:
            return "Finalizada con éxito";
        case 8:
            return "Finalizada sin éxito";
        default:
            return "";
    }
};

export const TareasAsignadas = (req, res) => {

    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        return res.status(401);
    }

    const { idUsuario, caracter } = req.params;

    if (idUsuario != 78) {
        const responsebad = {
            codeError: 500,
            message: "Ha ocurrido un problema.",
            content: null,
        };

        return res.status(500).json(responsebad);
    }
    const response = {
        codeError: 200,
        message: 'Listado de Tareas',
        content: misTaresAsignadas
    }

    return res.status(200).json(response);
}

export const mistareasCreadas = (req, res) => {

    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        return res.status(401);
    }

    const { idUsuario, caracter } = req.params;

    if (idUsuario != 78) {

        const responsebad = {
            codeError: 500,
            message: "Tareas creadas",
            content: null,
        };
        return res.status(500).json(responsebad);
    }

    const response = {
        codeError: 200,
        message: 'Listado de tareas creadas',
        content: tareasCreadas
    }
    return res.status(200).json(response);

}