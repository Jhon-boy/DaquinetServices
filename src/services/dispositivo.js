import { tokereponse } from "./datos.js";

export const dispositivoDiscofianza = (req, res) => {


    const {
        IDDISPOSITIVO,
        MODELO,
        TIPO,
        MARCA,
        VERSION
    } = req.body;
    if (!IDDISPOSITIVO || !MODELO || !TIPO || !MARCA || !VERSION) {
        const response = {
            codeError: 500, // Bad Request
            message: "Todos los campos son obligatorios.",
            content: null,
        };

        return res.status(500).json(response);
    }

    const response = {
        codeError: 200,
        message: "Autentificacion exitosa",
        content: {
            autenticacionExitosa: true,
            IdDispositivo: IDDISPOSITIVO,
            cusuario: "78",
            token: tokereponse
        }
    };

    return res.status(200).json(response);
}