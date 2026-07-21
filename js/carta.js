/*
 * ==========================================
 * 9 Meses V3 Cinematic Edition
 * ------------------------------------------
 * js/carta.js
 *
 * Sistema de carta romántica
 *
 * Gestiona:
 * - Sobre
 * - Apertura
 * - Carta
 * - Máquina de escribir
 * - Imagen modal
 * ==========================================
 */



"use strict";








const Carta = {



    initialized:false,



    typingTimer:null,



    elements:{},











    init(){



        const container =
            document.getElementById(
                "screen-carta"
            );







        if(
            !container
        ){

            return;

        }







        /*
            Evita reconstrucciones
            innecesarias.
        */


        if(
            this.initialized
        ){

            return;

        }







        this.renderSobre();



        this.initialized =
            true;



    },









    renderSobre(){



        const container =
            document.getElementById(
                "screen-carta"
            );







        container.innerHTML = `



            <div class="sobre-container floating-element"
                 id="sobre-container">


                <img

                    src="assets/ui/sobre.png"

                    id="sobre-img"

                    class="sobre-img"

                    alt="Sobre de carta"

                >



                <p>

                    Haz clic para abrir ❤️

                </p>



            </div>



        `;







        this.bindSobre();



    },









    bindSobre(){



        const sobre =
            document.getElementById(
                "sobre-container"
            );







        if(
            !sobre
        ){

            return;

        }







        sobre.addEventListener(
            "click",
            ()=>{



                this.abrirSobre();



            },
            {
                once:true
            }
        );



    },









    abrirSobre(){



        if(
            typeof AudioController !== "undefined"
        ){



            AudioController.play(
                "paper"
            );



        }







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



                this.renderCarta();







                if(
                    overlay
                ){



                    overlay.classList.remove(
                        "overlay-visible"
                    );



                }



            },
            1000
        );



    },
/*
    Render principal de la carta
*/


renderCarta(){

    const container = document.getElementById("screen-carta");

    if(!container) return;

    container.innerHTML = `

        <div class="carta-wrapper carta-aparece">

            <img
                src="${CartaManager.getImage()}"
                id="carta-imagen"
                class="carta-imagen"
                alt="Carta">

            <p class="carta-descripcion">

                Esto es para ti amor
                
                Se que no es mucho en 
                comparacion con otras cosas...

                PEEEEEROOO

                Por lo menos esta carta si 
                la vas a poder entender
                jejeje.

                Te amooo ❤️

            </p>

        </div>

        <div id="modal-carta" class="modal-overlay">

            <img
            id="imagen-modal-carta"
            class="modal-content"
            alt="Carta">

        </div>

        <button
            id="btn-volver-carta"
            class="nav-btn">

        </button>

    `;

    AudioController.play("pop");

    document
    .getElementById("btn-volver-carta")
    .addEventListener("click",()=>{

        AudioController.play("click");

        App.navigate("home");

    });

    const carta = document.getElementById("carta-imagen");
    const modal = document.getElementById("modal-carta");
    const imagen = document.getElementById("imagen-modal-carta");

    carta.addEventListener("click", () => {

        imagen.src = carta.src;

        modal.style.display = "flex";

    });

    modal.addEventListener("click", () => {

        modal.style.display = "none";

    });

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
            ){}

        }
    );



}







};


document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        App.goHome();

    }

});






/*
    Inicialización extra

    El módulo principal App
    controla el llamado init()
*/


document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        if(
            typeof Carta !== "undefined"
        ){


            Carta.bindGlobalEvents();


        }



    }
);