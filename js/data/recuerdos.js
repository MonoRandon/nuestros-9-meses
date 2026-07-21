/*
 * ==========================================
 * 9 Meses V3 Cinematic Edition
 * ------------------------------------------
 * data/recuerdos.js
 *
 * Base de datos de recuerdos
 *
 * Para agregar nuevos momentos:
 *
 * {
 *   imagen:"",
 *   titulo:"",
 *   fecha:"",
 *   descripcion:""
 * }
 *
 * No modificar galeria.js
 * ==========================================
 */



"use strict";







const recuerdos = [



    {

        imagen:
        "assets/recuerdos/recuerdo1.jpg",

        titulo:
        "Nuestro primer momento ❤️",

        fecha:
        "Día especial",

        descripcion:
        "El inicio de una historia que siempre voy a guardar."

    },





    {

        imagen:
        "assets/recuerdos/recuerdo2.jpg",

        titulo:
        "La primera vez que entre :(",

        fecha:
        "Un recuerdo miedoso",

        descripcion:
        "Me senti raro y triste.. pero despues feliz :]."

    },





    {

        imagen:
        "assets/recuerdos/recuerdo3.jpg",

        titulo:
        "Donde tu  abueli :]",

        fecha:
        "Conoci parte de tu famiia",

        descripcion:
        "Fue agradable la situacion, me gusto."

    },





    {

        imagen:
        "assets/recuerdos/recuerdo4.jpg",

        titulo:
        "El mejor Tutito",

        fecha:
        "Me quede raja...",

        descripcion:
        "El dia hermoso, ni calor, ni frio, al aire libre, todo perfecto."

    },

    {

        imagen:
        "assets/recuerdos/recuerdo5.jpg",

        titulo:
        "La cagaita jsjs",

        fecha:
        "Me queria matar",

        descripcion:
        "ME PANIQUIE DE UNA MANERA SOBREHUMANA."

    },

    {

        imagen:
        "assets/recuerdos/recuerdo6.jpg",

        titulo:
        "Salida a la Playaaaa",

        fecha:
        "Inconvenientemente bueno",

        descripcion:
        "Se dio la oportunidad, y para mi, fue lo mejor."

    },

    {

        imagen:
        "assets/recuerdos/recuerdo7.jpg",

        titulo:
        "Virgen del pelo :[",

        fecha:
        "Moradito",

        descripcion:
        "Siempre queria teñirme el pelo, pero menos mal que fue contigo."

    },

    {

        imagen:
        "assets/recuerdos/recuerdo8.jpg",

        titulo:
        "7 meses ❤️",

        fecha:
        "Estaba bonito..",

        descripcion:
        "Cada que estamos mal, le prendo una vela.., Pienso que asi se hace mas fuerte el vinculo..."

    },

    {

        imagen:
        "assets/recuerdos/recuerdo9.jpg",

        titulo:
        "Una fotito juntos :]",

        fecha:
        "Fue lindo el momento",

        descripcion:
        "Viendo peli, calentitos, y la fotito, todo muy lindo :]"

    },

    {

        imagen:
        "assets/recuerdos/recuerdo10.jpg",

        titulo:
        "Papitas ñomi ñomi",

        fecha:
        "9 meses ❤️",

        descripcion:
        "La mejor salida la verdad.... Me encanto y donde te saque mas fotos jsjs"

    }


];
/*
 * ==========================================
 * Gestor de recuerdos
 * ==========================================
 */


const RecuerdosManager = {



    /*
        Obtener todos los recuerdos
    */


    getAll(){



        return recuerdos;



    },









    /*
        Obtener un recuerdo

        Si el índice supera
        la cantidad disponible,
        vuelve al inicio.
    */


    get(index){



        if(
            recuerdos.length === 0
        ){

            return null;

        }







        
        const safeIndex =
        (
            (index % recuerdos.length)
            +
            recuerdos.length
        )
        %
        recuerdos.length;







        return recuerdos[
            safeIndex
        ];



    },









    /*
        Cantidad total
    */


    count(){



        return recuerdos.length;



    },









    /*
        Agregar nuevo recuerdo

        Permite ampliar la galería
        sin tocar otros archivos.
    */


    add(recuerdo){



        if(
            !recuerdo
        ){

            return false;

        }







        if(
            !recuerdo.imagen ||
            !recuerdo.titulo
        ){

            console.warn(
                "Recuerdo incompleto:",
                recuerdo
            );


            return false;

        }







        recuerdos.push(
            recuerdo
        );







        return true;



    },









    /*
        Buscar recuerdos
    */


    search(texto){



        if(
            !texto
        ){

            return recuerdos;

        }







        return recuerdos.filter(
            recuerdo=>{


                return (

                    recuerdo.titulo
                    .toLowerCase()
                    .includes(
                        texto.toLowerCase()
                    )

                    ||

                    recuerdo.descripcion
                    .toLowerCase()
                    .includes(
                        texto.toLowerCase()
                    )

                );


            }
        );



    },









    /*
        Obtener primer recuerdo
    */


    first(){



        return recuerdos[0];



    }







};









/*
    Confirmación de carga
*/


console.log(
    "❤️ Recuerdos cargados:",
    RecuerdosManager.count()
);