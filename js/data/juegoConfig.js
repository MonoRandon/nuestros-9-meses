/*
 * ==========================================
 * 9 Meses V3 Cinematic Edition
 * ------------------------------------------
 * data/juegoConfig.js
 *
 * Configuración del minijuego
 *
 * Aquí se controla:
 *
 * - Tiempo
 * - Velocidad
 * - Puntos
 * - Aparición
 * - Animaciones
 * ==========================================
 */


"use strict";







const JuegoConfig = {



    /*
        Duración total
        de una partida
    */


    tiempo:

        30,









    /*
        Intervalo entre
        aparición de objetos
    */


    intervaloSpawn:

        900,









    /*
        Velocidad inicial
        de movimiento
    */


    velocidad:

        2,









    /*
        Tamaño del objeto
    */


    tamanoObjeto:

        120,









    /*
        Puntos base
        por captura
    */


    puntosBase:

        5,









    /*
        Tiempo que permanece
        un corazón en pantalla
    */


    duracionObjeto:

        5000,









    /*
        Cantidad de partículas
    */


    particulas:

        8,









    /*
        Dificultad futura
    */


    nivel:



    {

        facil:{

            velocidad:1.5,

            intervalo:1200

        },



        normal:{

            velocidad:2,

            intervalo:900

        },



        dificil:{

            velocidad:3,

            intervalo:600

        }



    }







};







console.log(
    "🎮 Configuración del juego cargada."
);

/*
 * ==========================================
 * Gestor de configuración del juego
 * ==========================================
 */


const JuegoConfigManager = {



    dificultadActual:

        "facil",










    /*
        Obtener configuración actual
    */


    get(){



        const dificultad =

            JuegoConfig.nivel[
                this.dificultadActual
            ];







        return {



            tiempo:

                JuegoConfig.tiempo,



            intervaloSpawn:

                dificultad.intervalo,



            velocidad:

                dificultad.velocidad,



            tamanoObjeto:

                JuegoConfig.tamanoObjeto,



            puntosBase:

                JuegoConfig.puntosBase,



            duracionObjeto:

                JuegoConfig.duracionObjeto,



            particulas:

                JuegoConfig.particulas



        };



    },









    /*
        Cambiar dificultad
    */


    setDifficulty(nombre){



        if(
            JuegoConfig.nivel[nombre]
        ){



            this.dificultadActual =
                nombre;



        }



    },









    /*
        Ajustar valores
        durante ejecución
    */


    update(data){



        if(
            !data
        ){

            return;

        }







        Object.keys(data)
            .forEach(
                key=>{



                    if(
                        JuegoConfig[key]
                        !==
                        undefined
                    ){



                        JuegoConfig[key] =
                            data[key];



                    }



                }
            );



    }







};








console.log(
    "⚙️ Gestor de juego preparado."
);
