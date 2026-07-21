/*
 * 9 Meses V3 Cinematic Edition
 * Navigation System
 *
 * Control:
 * - Rutas permitidas
 * - Navegación secundaria
 * - Historial interno
 * - Teclado
 */


const Navigation = {


    /*
        Pantallas disponibles
    */


    routes:[


        "home",

        "carta",

        "galeria",

        "juego",

        "creditos"


    ],






    /*
        Historial de navegación

        Permite saber dónde estuvo
        el usuario dentro de la experiencia.
    */


    history:[






    ],






    /*
        Ir a inicio
    */


    goHome(){



        if(
            typeof App === "undefined"
        ){

            return;

        }





        App.navigate(
            "home"
        );



    },







    /*
        Navegación segura

        Evita enviar rutas inexistentes.
    */


    navigate(route){



        if(
            !this.validateRoute(route)
        ){


            console.warn(
                "Ruta inválida:",
                route
            );


            return;


        }







        if(
            typeof App !== "undefined"
        ){



            this.history.push(
                route
            );



            App.navigate(
                route
            );



        }



    },







    /*
        ESC para volver al inicio
    */


    initKeyboardNavigation(){



        document.addEventListener(
            "keydown",
            event=>{





                if(
                    event.key !== "Escape"
                ){

                    return;

                }







                if(
                    typeof App === "undefined"
                ){

                    return;

                }







                const current =
                    App.state.currentScreen;








                if(


                    current !== "home" &&

                    current !== "intro" &&

                    !App.state.isTransitioning


                ){



                    this.goHome();



                }





            }
        );




    },

/*
    Validación de rutas disponibles

    Mantiene control sobre las pantallas
    que realmente existen en el proyecto.
*/


validateRoute(route){



    return this.routes.includes(
        route
    );



},







/*
    Obtener pantalla anterior

    Útil para futuras funciones:
    - botón volver
    - animaciones distintas
    - navegación interna
*/


getPreviousRoute(){



    if(
        this.history.length < 2
    ){

        return "home";

    }




    return this.history[
        this.history.length - 2
    ];



},







/*
    Limpiar historial

    Usado al reiniciar experiencia
*/


clearHistory(){



    this.history = [];



},







/*
    Inicialización
*/


init(){



    this.initKeyboardNavigation();



    console.log(
        "Navigation System listo."
    );



}





};








/*
    Inicio seguro del módulo

    Espera a que App exista
*/


document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        Navigation.init();



    }
);
