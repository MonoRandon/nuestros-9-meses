/*
 * 9 Meses V3 Cinematic Edition
 * Intro Cinematic Controller
 *
 * Flujo:
 *
 * Negro absoluto
 *       ↓
 * Texto romántico
 *       ↓
 * Brillo
 *       ↓
 * Fade cinematográfico
 *       ↓
 * Home
 *       ↓
 * Música
 */



const Intro = {



    elements:{


        screenIntro:null,


        introTexts:[]


    },







    state:{


        started:false,


        finished:false


    },








    start(){



        if(this.state.started){

            return;

        }



        this.state.started = true;





        this.elements.screenIntro =
            document.getElementById(
                "screen-intro"
            );






        this.elements.introTexts =
            document.querySelectorAll(
                "#intro-text"
            );







        if(
            !this.elements.screenIntro ||
            this.elements.introTexts.length === 0
        ){

            return;

        }







        /*
            Mantiene negro inicial
            antes de mostrar mensaje
        */


        setTimeout(()=>{


            this.showText();



        },700);



    },









    showText(){



        this.elements.introTexts.forEach(
            text=>{


                text.style.opacity = "1";


                text.classList.add(
                    "shimmer-text"
                );


                text.classList.add(
                    "intro-visible"
                );



            }
        );







        setTimeout(()=>{


            this.fadeOutIntro();



        },4000);




    },









    fadeOutIntro(){



        if(
            this.state.finished
        ){

            return;

        }



        this.state.finished = true;






        const overlay =
            document.getElementById(
                "transition-overlay"
            );







        if(overlay){



            overlay.classList.add(
                "overlay-visible"
            );



        }








        setTimeout(()=>{


            this.enterHome();



        },1200);





    },
/*
    Entrada a pantalla principal

    Aquí termina la intro y comienza
    la experiencia interactiva.
*/


enterHome(){



    /*
        Ocultar intro correctamente

        No usamos display:block
        porque rompe la arquitectura
        de .screen
    */


    if(this.elements.screenIntro){



        this.elements.screenIntro.classList.remove(
            "active"
        );



    }






    /*
        Activar Home
    */


    const home =
        document.getElementById(
            "screen-home"
        );





    if(home){



        home.classList.add(
            "active"
        );



    }








    if(
        typeof App !== "undefined"
    ){



        App.state.currentScreen =
            "home";



    }








    /*
        Crear fondo mágico
    */


    if(
        typeof Efectos !== "undefined" &&
        Efectos.initBackground
    ){



        Efectos.initBackground();



    }









    /*
        Música después de intro

        Nunca antes.
    */


    this.startMusic();








    /*
        Quitar negro
    */


    const overlay =
        document.getElementById(
            "transition-overlay"
        );





    setTimeout(()=>{



        if(overlay){



            overlay.classList.remove(
                "overlay-visible"
            );



        }



    },800);







},







/*
    Inicio seguro de música

    Primero intenta reproducir.
    Si el navegador bloquea autoplay,
    espera la primera interacción.
*/


startMusic(){



    if(
        typeof AudioController === "undefined"
    ){

        return;

    }







    const playMusic = ()=>{



        AudioController.startBackgroundMusic();



        document.removeEventListener(
            "click",
            playMusic
        );



        document.removeEventListener(
            "touchstart",
            playMusic
        );



    };








    AudioController.startBackgroundMusic()
        .catch?.(()=>{





            document.addEventListener(
                "click",
                playMusic,
                {
                    once:true
                }
            );





            document.addEventListener(
                "touchstart",
                playMusic,
                {
                    once:true
                }
            );






        });



},







/*
    Permite reiniciar la intro
    si se desea usar nuevamente.
*/


reset(){



    this.state.started = false;


    this.state.finished = false;




}







};
