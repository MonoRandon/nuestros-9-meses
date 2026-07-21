/*
 * ==========================================
 * 9 Meses V3 Cinematic Edition
 * ------------------------------------------
 * js/creditos.js
 *
 * Pantalla de créditos románticos
 *
 * Gestiona:
 * - Mensaje final
 * - Máquina de escribir
 * - Animaciones
 * - Firma final
 * ==========================================
 */


"use strict";








const Creditos = {



    initialized:false,



    typingSpeed:38,



    typingTimer:null,



    elements:{},










    init(){



        if(
            this.initialized
        ){

            this.start();

            return;

        }







        this.render();
        this.cacheDOM();
        this.bindEvents();
        this.initialized = true;
        this.start();



    },









    render(){



        const container =

            document.getElementById(
                "screen-creditos"
            );







        if(
            !container
        ){

            return;

        }







        container.innerHTML = `



            <div class="creditos-container">





                <div

                    id="typing-container"

                    class="typing-container"

                >



                    <p

                        id="typing-text"

                    ></p>



                </div>







                <div

                    class="final-sign"

                >



                    <span>

                        De:

                    </span>



                    <strong>

                        Tu Pololito lindo :]]

                    </strong>



                </div>







                <div

                    class="final-heart"

                >

                    ❤️

                </div>
            </div>
            <button

                    id="btn-volver-creditos"

                    class="nav-btn btn-final"

                >

                    Volver al inicio

                </button>



        `;



    },









    cacheDOM(){



        this.elements.container =

            document.getElementById(
                "typing-container"
            );







        this.elements.text =

            document.getElementById(
                "typing-text"
            );







        this.elements.heart =

            document.querySelector(
                ".final-heart"
            );



    },
/*
    Iniciar créditos
*/


start(){

    document.body.classList.add("creditos-mode");



    this.reset();







    const texto = `


    ❤️ Gracias por llegar hasta aquí ❤️

    ❤️Hace nueve meses comenzó una historia
    que jamás imaginé que sería tan bonita.

    Cada fotografía,
    cada momento,
    cada recuerdo...

    es una pequeña parte
    de todo lo que hemos vivido.

    Esta página es solamente
    una forma de decirte
    lo muchísimo que significas para mí.

    Gracias por cada sonrisa.

    Gracias por cada abrazo.

    Gracias por hacerme feliz.

    Espero seguir creando
    muchos recuerdos más contigo.

    Porque esta historia...

    recién comienza.

    Te amo muchísimo mi amor ❤️

`;







    this.typeWriter(
        texto
    );



},










/*
    Máquina de escribir
*/


typeWriter(text){



    if(
        !this.elements.text
    ){

        return;

    }







    let index = 0;







    this.typingTimer =

        setInterval(
            ()=>{



                this.elements.text.textContent +=

                    text[index];







                index++;







                if(
                    index >= text.length
                ){



                    clearInterval(
                        this.typingTimer
                    );







                    this.showFinal();



                }



            },
            this.typingSpeed
        );



},










/*
    Mostrar elementos finales
*/


showFinal(){

    this.elements.heart?.classList.add("show");

    document
        .querySelector(".final-sign")
        ?.classList.add("show");

    document
        .getElementById("btn-volver-creditos")
        ?.classList.add("show");

},

/*
    Eventos
*/


bindEvents(){



    const button =

        document.getElementById(
            "btn-volver-creditos"
        );







    if(
        button
    ){



        button.addEventListener(
            "click",
            ()=>{



                AudioController.play(
                    "click"
                );



                App.navigate(
                    "home"
                );



            }
        );



    }



},










/*
    Reiniciar pantalla
*/


reset(){



    clearInterval(
        this.typingTimer
    );







    if(
        this.elements.text
    ){



        this.elements.text.textContent =
            "";



    }







    this.elements.heart
        ?.classList.remove(
            "show"
        );







    document
        .querySelector(
            ".final-sign"
        )
        ?.classList.remove(
            "show"
        );



},
/*
    Eventos globales
*/


bindGlobalEvents(){



    document.addEventListener(
        "keydown",
        event=>{



            if(
                event.key === "Escape"
            ){



                if(
                    App.getCurrentScreen()
                    ===
                    "creditos"
                ){



                    App.navigate(
                        "home"
                    );



                }



            }



        }
    );



},










/*
    Limpieza completa
*/


destroy(){



    clearInterval(
        this.typingTimer
    );







    this.elements = {};







    this.initialized = false;



}







};









/*
    Preparación del módulo
*/


document.addEventListener(
    "DOMContentLoaded",
    ()=>{



        if(
            typeof Creditos !== "undefined"
        ){



            Creditos.bindGlobalEvents();



        }



    }
);