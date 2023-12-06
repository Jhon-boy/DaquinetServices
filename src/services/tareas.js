import { tickets, servicios, unaTarea, misTareas } from "./datos.js"

export const getTareas = (req, res) => {

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
    const response = {
        codeError: 200,
        message: "Listado de Tickets",
        content: {
            servicios: tickets.map(ticket => ({
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
            })),
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
    // Extract idtarea from request parameters
    const idTareaParam = req.params.idtarea;

    // Find the corresponding unaTarea based on idTarea
    const foundTarea = unaTarea.find(tarea => tarea.content.idTarea === parseInt(idTareaParam));

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
            idTarea: unaTarea[0].content.idTarea,
            tarea: unaTarea[0].content.tarea,
            descripcion: unaTarea[0].content.descripcion,
            proyecto: unaTarea[0].content.proyecto,
            idEstado: unaTarea[0].content.idEstado,
            estado: unaTarea[0].content.estado,
            prioridad: unaTarea[0].content.prioridad,
            idAutor: unaTarea[0].content.idAutor,
            autor: unaTarea[0].content.autor,
            asignado: unaTarea[0].content.asignado,
            fechaSolicitud: unaTarea[0].content.fechaSolicitud,
            fechaContestacion: unaTarea[0].content.fechaContestacion,
            detalles: unaTarea[0].content.detalles.map(detalle => ({
                id: detalle.id,
                name: detalle.name,
                value: detalle.value
            }))
        }
    };

    return res.json(response);
}

export const createTarea = (req, res) => {
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

        return res.status(400).json(response);
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