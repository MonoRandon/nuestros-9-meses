/*
 * ==========================================
 * 9 Meses V3 Cinematic Edition
 * ------------------------------------------
 * data/cartaContenido.js
 *
 * Contenido editable de la carta
 *
 * Este archivo contiene solamente
 * información romántica.
 *
 * No contiene lógica.
 * ==========================================
 */


"use strict";







const CartaContenido = {

    imagen: "assets/ui/carta.png",

    titulo: "Esto es para ti ❤️",

    texto:
    `Aquí irá la carta completa.

    Después la iremos escribiendo juntos.`,

    firma:
    "Con amor, Brandon ❤️",

    boton:"Continuar"

};







console.log(
    "💌 Carta cargada."
);

/*
 * ==========================================
 * Gestor del contenido de carta
 * ==========================================
 */


const CartaManager = {



    /*
        Obtener título
    */


    getTitle(){



        return CartaContenido.titulo;



    },









    /*
        Obtener texto principal
    */


    getText(){



        return CartaContenido.texto;



    },









    /*
        Obtener imagen asociada
    */


    getImage(){



        return CartaContenido.imagen;



    },









    /*
        Obtener firma
    */


    getSignature(){



        return CartaContenido.firma;



    },









    /*
        Actualizar contenido

        Útil para futuras versiones
    */


    update(data){



        if(
            !data
        ){

            return;

        }







        if(
            data.titulo
        ){

            CartaContenido.titulo =
                data.titulo;

        }







        if(
            data.texto
        ){

            CartaContenido.texto =
                data.texto;

        }







        if(
            data.imagen
        ){

            CartaContenido.imagen =
                data.imagen;

        }







        if(
            data.firma
        ){

            CartaContenido.firma =
                data.firma;

        }



    }







};









console.log(
    "💗 Gestor de carta listo."
);