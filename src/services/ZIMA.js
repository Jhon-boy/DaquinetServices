export const getUsuariosDaquiNet = (req, res) => {
    const usuarios = [
        {
            "cod": "OK",
            "mradicacion": {
                "cu": "121",
                "nc": "APELLIDOP APELLIDOM NOMBRE1 MODIFICADO",
                "age": "PRINCIPAL"
            }

        },
        {
            "cod": "OK",
            "mradicacion": {
                "cu": "104",
                "nc": "AGENTE",
                "age": "CONDAMINE"
            }
        },
        {
            "cod": "OK",
            "mradicacion": {
                "cu": "124",
                "nc": "AGENTE NORMAL",
                "age": "CONDAMINE"
            }
        },
        {
            "cod": "OK",
            "mradicacion": {
                "cu": "78",
                "nc": "DAQUINET - AGENTE",
                "age": "PRINCIPAL"
            }
        }

    ]

    res.json(usuarios);
}