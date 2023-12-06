

export const loginByUsuarioAndPass = (req, res) => {

    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        return res.status(401);
    }


    const {
        IDDISPOSITIVO,
        CUSUARIO,
        CONTRASEÑA
    } = req.body;

    if(!IDDISPOSITIVO || !CUSUARIO  ||!CONTRASEÑA) {

        const response = {
            codeError: 500, // Bad Request
            message: "Todos los campos son obligatorios.",
            content: null,
        };

        return res.status(500).json(response);
    }
    if(CUSUARIO != '78'){
        const response = {
            codeError: 500, // Bad Request
            message: "Autentificación fallida. Intentalo mas tarde",
            content: null,
        };

        return res.status(500).json(response);
    }
    const response = {
        codeError: 200,
        message: "Logeo exitosa",
        content: {
            autenticacionExitosa: true,
            IdDispositivo: IDDISPOSITIVO,
            cusuario: "78",
            cAgencia : '1'
        }
    };

    return res.status(200).json(response);

}