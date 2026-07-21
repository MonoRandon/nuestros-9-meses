/*
 * ==========================================
 * 9 Meses V3 Cinematic Edition
 * ------------------------------------------
 * js/galeria.js
 *
 * Sistema de galería interactiva
 *
 * Gestiona:
 * - Recuerdos
 * - Carrusel infinito
 * - Contador
 * - Modal
 * - Navegación
 * ==========================================
 */



"use strict";


const Galeria = {



    initialized:false,



    currentIndex:0,



    elements:{},


    init(){



        if(
            this.initialized
        ){

            this.render();

            return;

        }

        this.renderBase();
        this.cacheDOM();
        this.bindEvents();
        this.bindGlobalEvents();
        this.render();

        this.initialized = true;

    },


    renderBase(){



        const container =
            document.getElementById(
                "screen-galeria"
            );


        if(
            !container
        ){

            return;

        }


        container.innerHTML = `



            <div class="galeria-container">



                <h2 class="galeria-titulo">

                    Nuestros Recuerdos ❤️

                </h2>



                <div class="carrusel">



                    <button

                        id="btn-prev"

                        class="nav-btn"

                    >

                        ❮

                    </button>



                    <div

                        id="recuerdo-card"

                        class="recuerdo-card"

                    ></div>







                    <button

                        id="btn-next"

                        class="nav-btn"

                    >

                        ❯

                    </button>





                </div>







                <div

                    id="contador-recuerdos"

                    class="meta-info"

                ></div>







                <button

                    id="btn-volver-galeria"

                    class="nav-btn"

                >

                    Volver

                </button>





            </div>







            <div
                id="modal-galeria"
                class="modal-overlay"
            >

                <img
                    id="imagen-modal-galeria"
                    class="modal-content"
                    alt="Recuerdo"
                >

                <p
                    id="texto-modal-galeria"
                ></p>

            </div>



        `;



    },









    cacheDOM(){



        this.elements.card =
            document.getElementById(
                "recuerdo-card"
            );







        this.elements.counter =
            document.getElementById(
                "contador-recuerdos"
            );







        this.elements.modal =
            document.getElementById(
                "modal-galeria"
            );







        this.elements.modalImage =
            document.getElementById(
                "imagen-modal-galeria"
            );







        this.elements.modalText =
            document.getElementById(
                "texto-modal-galeria"
            );

        if(this.elements.modalImage){

            this.elements.modalImage.addEventListener(
                "click",
                ()=>{

                    this.closeModal();

                }
            );

        }



    },
/*
    Eventos de galería
*/


bindEvents(){



    const next =
        document.getElementById(
            "btn-next"
        );







    const prev =
        document.getElementById(
            "btn-prev"
        );







    const back =
        document.getElementById(
            "btn-volver-galeria"
        );








    if(
        next
    ){



        next.addEventListener(
            "click",
            ()=>{



                AudioController.play(
                    "click"
                );



                this.next();



            }
        );



    }








    if(
        prev
    ){



        prev.addEventListener(
            "click",
            ()=>{



                AudioController.play(
                    "click"
                );



                this.previous();



            }
        );



    }








    if(
        back
    ){



        back.addEventListener(
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
    Mostrar recuerdo actual
*/


render(){



    if(
        !this.elements.card
    ){

        return;

    }







    const recuerdo =
        RecuerdosManager.get(
            this.currentIndex
        );







    if(
        !recuerdo
    ){

        return;

    }







    this.elements.card.classList.remove("recuerdo-enter");

    void this.elements.card.offsetWidth;

    this.elements.card.classList.add("recuerdo-enter");

    this.elements.card.animate(
        [
            {
                opacity:0,
                transform:"translateX(30px) scale(.96)"
            },
            {
                opacity:1,
                transform:"translateX(0) scale(1)"
            }
        ],
        {
            duration:350,
            easing:"ease-out"
        }
    );







    this.elements.card.innerHTML = `



        <img

            src="${recuerdo.imagen}"

            class="recuerdo-imagen"

            alt="${recuerdo.titulo}"

        >





        <div class="recuerdo-info">



            <h3>

                ${recuerdo.titulo}

            </h3>





            <span>

                ${recuerdo.fecha}

            </span>





            <p>

                ${recuerdo.descripcion}

            </p>



        </div>



    `;







    this.elements.card
        .querySelector(
            ".recuerdo-imagen"
        )
        .addEventListener(
            "click",
            ()=>{



                this.openModal(
                    recuerdo
                );



            }
        );







    const total =
        RecuerdosManager.count();







    this.elements.counter.textContent =

        `${this.currentIndex + 1} / ${total}`;



},










/*
    Siguiente recuerdo

    Movimiento circular
*/


next(){



    const total =
        RecuerdosManager.count();







    if(
        total === 0
    ){

        return;

    }







    this.currentIndex =

        (
            this.currentIndex + 1
        )
        %
        total;







    this.render();



},










/*
    Recuerdo anterior
*/


previous(){



    const total =
        RecuerdosManager.count();







    if(
        total === 0
    ){

        return;

    }







    this.currentIndex =

        (
            this.currentIndex - 1
        +
            total
        )
        %
        total;







    this.render();



},
/*
    Abrir modal de imagen
*/


openModal(recuerdo){

    AudioController.play("pop");

    this.elements.modalImage.src = recuerdo.imagen;

    this.elements.modalText.textContent =
        recuerdo.descripcion;

    this.elements.modal.style.display="flex";

},

/*
    Cerrar modal
*/


closeModal(){

    if(!this.elements.modal){
        return;
    }

    this.elements.modal.classList.remove("modal-visible");

    setTimeout(()=>{

        this.elements.modal.style.display="none";

    },250);

},

/*
    Eventos globales
*/


bindGlobalEvents(){



    if(
        !this.elements.modal
    ){

        return;

    }

    this.elements.modal.addEventListener(
        "click",
        event=>{



            if(
                event.target ===
                this.elements.modal
            ){



                this.closeModal();



            }



        }
    );







    document.addEventListener(
        "keydown",
        event=>{



            if(
                App.getCurrentScreen()
                !==
                "galeria"
            ){

                return;

            }







            if(
                event.key === "ArrowRight"
            ){



                this.next();



            }







            if(
                event.key === "ArrowLeft"
            ){



                this.previous();



            }







            if(
                event.key === "Escape"
            ){



                this.closeModal();



            }



        }
    );



}








};


document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        App.goHome();

    }

});
