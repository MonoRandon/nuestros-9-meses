/*
 * 9 Meses V3 Cinematic Edition
 * App Core
 *
 * Control principal:
 * - Estado global
 * - Navegación
 * - Transiciones
 * - Sincronización de módulos
 */



"use strict";







const App = {





    state:{



        currentScreen:
            "intro",




        previousScreen:
            null,




        isTransitioning:
            false,




        initialized:
            false




    },









    init(){



        if(
            this.state.initialized
        ){

            return;

        }







        console.log(
            "🌸 9 Meses V3 iniciado"
        );







        this.state.initialized =
            true;







        this.bindEvents();







        if(
            typeof Intro !== "undefined"
        ){



            Intro.start();



        }






    },









    navigate(targetId){



        if(
            !targetId ||
            this.state.isTransitioning
        ){

            return;

        }







        const target =
            document.getElementById(
                `screen-${targetId}`
            );







        if(
            !target
        ){

            console.warn(
                "Pantalla inexistente:",
                targetId
            );

            return;

        }







        this.state.isTransitioning =
            true;







        const overlay =
            document.getElementById(
                "transition-overlay"
            );







        if(
            overlay
        ){



            overlay.classList.add(
                "overlay-visible"
            );



        }







        setTimeout(
            ()=>{



                this.changeScreen(
                    targetId
                );



            },
            900
        );



    },









    changeScreen(targetId){



        document
            .querySelectorAll(
                ".screen"
            )
            .forEach(
                screen=>{


                    screen.classList.remove(
                        "active"
                    );


                }
            );







        const screen =
            document.getElementById(
                `screen-${targetId}`
            );







        if(
            screen
        ){



            screen.classList.add(
                "active"
            );







            this.state.previousScreen =
                this.state.currentScreen;







            this.state.currentScreen =
                targetId;







            this.loadSection(
                targetId
            );



        }







        if(
            typeof Efectos !== "undefined"
        ){
        }








        setTimeout(
            ()=>{



                const overlay =
                    document.getElementById(
                        "transition-overlay"
                    );







                if(
                    overlay
                ){


                    overlay.classList.remove(
                        "overlay-visible"
                    );



                }







                this.state.isTransitioning =
                    false;



            },
            700
        );





    },
/*
    Carga dinámica de secciones

    Cada módulo controla
    su propio contenido.
*/


loadSection(section){



    switch(section){



        case "carta":



            if(
                typeof Carta !== "undefined"
            ){



                Carta.init();



            }



        break;







        case "galeria":



            if(
                typeof Galeria !== "undefined"
            ){



                Galeria.init();



            }



        break;







        case "juego":



            if(
                typeof Juego !== "undefined"
            ){



                Juego.init();



            }



        break;







        case "creditos":



            if(
                typeof Creditos !== "undefined"
            ){



                Creditos.init();



            }



        break;



    }



},







/*
    Eventos globales

    Usa delegación para soportar
    botones creados dinámicamente.
*/


bindEvents(){



    document.addEventListener(
        "click",
        event=>{





            const button =
                event.target.closest(
                    ".nav-btn"
                );








            if(
                !button
            ){

                return;

            }








            const target =
                button.dataset.target;








            if(
                !target
            ){

                return;

            }








            if(
                typeof AudioController !== "undefined"
            ){



                AudioController.play(
                    "click"
                );



            }








            this.navigate(
                target
            );






        }
    );







    document.addEventListener(
        "keydown",
        event=>{



            if(
                event.key === "Escape"
            ){



                if(
                    this.state.currentScreen !== "home" &&
                    this.state.currentScreen !== "intro"
                ){



                    this.goHome();



                }



            }







            if(
                this.state.isTransitioning
            ){



                event.preventDefault();



            }



        }
    );





},







/*
    Regresar al inicio
*/


goHome(){



    this.navigate(
        "home"
    );



},







/*
    Obtener pantalla actual
*/


getCurrentScreen(){



    return this.state.currentScreen;



},







/*
    Reiniciar experiencia

    Utilidad para pruebas
*/


restart(){



    this.state.currentScreen =
        "intro";



    this.state.previousScreen =
        null;



    this.navigate(
        "intro"
    );



}







};








/*
    Inicio seguro
*/


document.addEventListener(
    "DOMContentLoaded",
    ()=>{



        App.init();



    }
);