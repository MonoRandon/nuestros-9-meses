/*
 * 9 Meses V3 Cinematic Edition
 * Audio Controller
 *
 * Gestiona:
 * - Música principal
 * - Efectos de sonido
 * - Volumen
 * - Mute
 * - Persistencia
 * - Fade cinematográfico
 */



"use strict";







const AudioController = {





    elements:{


        background:null,


        click:null,


        paper:null,


        pop:null,


        win:null


    },







    state:{


        volume:0.5,


        muted:false,


        started:false,


        fading:false


    },








    init(){





        this.elements.background =
            document.getElementById(
                "bg-music"
            );






        this.elements.click =
            document.getElementById(
                "sfx-click"
            );






        this.elements.paper =
            document.getElementById(
                "sfx-paper"
            );






        this.elements.pop =
            document.getElementById(
                "sfx-pop"
            );






        this.elements.win =
            document.getElementById(
                "sfx-win"
            );








        this.loadSettings();







        this.configure();







        this.bindControls();





    },









    configure(){



        const music =
            this.elements.background;







        if(music){



            music.loop =
                true;





            music.preload =
                "auto";





            music.volume =
                0;





        }







        Object.values(
            this.elements
        )
        .forEach(
            audio=>{



                if(
                    audio
                ){



                    audio.preload =
                        "auto";



                }



            }
        );





    },









    startBackgroundMusic(){



        const music =
            this.elements.background;







        if(
            !music ||
            this.state.started
        ){



            return Promise.resolve();



        }







        this.state.started =
            true;







        music.volume =
            0;








        return music.play()
            .then(
                ()=>{



                    this.fadeIn();



                }
            )
            .catch(
                error=>{



                    this.state.started =
                        false;







                    console.warn(
                        "Música esperando interacción",
                        error
                    );







                    throw error;



                }
            );





    },
/*
    Fade de entrada

    La música aparece lentamente
    después de la intro.
*/


fadeIn(){



    const music =
        this.elements.background;







    if(
        !music ||
        this.state.fading
    ){

        return;

    }







    this.state.fading =
        true;







    const target =
        this.state.muted
            ? 0
            : this.state.volume;







    let current =
        0;







    const interval =
        setInterval(
            ()=>{





                current += 0.02;








                if(
                    current >= target
                ){



                    current =
                        target;



                    clearInterval(
                        interval
                    );



                    this.state.fading =
                        false;



                }







                music.volume =
                    current;






            },
            100
        );





},







/*
    Fade de salida

    Usado para transiciones
    especiales.
*/


fadeOut(){



    const music =
        this.elements.background;







    if(
        !music
    ){

        return;

    }







    let current =
        music.volume;








    const interval =
        setInterval(
            ()=>{





                current -= 0.02;







                if(
                    current <= 0
                ){



                    current =
                        0;



                    clearInterval(
                        interval
                    );



                }







                music.volume =
                    current;







            },
            100
        );





},







/*
    Reproducir efectos

    Los SFX no afectan
    la música principal.
*/


play(soundName){



    const sound =
        this.elements[soundName];







    if(
        !sound
    ){

        return;

    }







    sound.currentTime =
        0;







    sound.volume =
        this.state.muted
            ? 0
            : 1;







    sound.play()
        .catch(
            ()=>{}
        );





},







/*
    Cambiar volumen
*/


setVolume(value){



    const volume =
        Number(value);







    this.state.volume =
        Math.min(
            Math.max(
                volume,
                0
            ),
            1
        );







    if(
        this.elements.background &&
        !this.state.muted
    ){



        this.elements.background.volume =
            this.state.volume;



    }







    this.saveSettings();



},







/*
    Mute global
*/


toggleMute(){



    this.state.muted =
        !this.state.muted;







    if(
        this.elements.background
    ){



        this.elements.background.volume =

            this.state.muted
                ? 0
                : this.state.volume;



    }







    this.saveSettings();






    return this.state.muted;



},
/*
    Controles de interfaz

    Botón mute y slider
    de volumen.
*/


bindControls(){



    const muteButton =
        document.getElementById(
            "mute-button"
        );






    const volume =
        document.getElementById(
            "volume-control"
        );








    if(
        muteButton
    ){



        muteButton.addEventListener(
            "click",
            ()=>{





                this.play(
                    "click"
                );







                const muted =
                    this.toggleMute();








                muteButton.classList.toggle(
                    "muted",
                    muted
                );





            }
        );



    }








    if(
        volume
    ){



        volume.value =
            this.state.volume;







        volume.addEventListener(
            "input",
            event=>{





                this.setVolume(
                    event.target.value
                );





            }
        );



    }



},







/*
    Guardado persistente

    Mantiene configuración
    entre visitas.
*/


saveSettings(){



    localStorage.setItem(

        "9meses_audio_settings",

        JSON.stringify({

            volume:
                this.state.volume,


            muted:
                this.state.muted


        })

    );



},







/*
    Cargar configuración
*/


loadSettings(){



    const saved =
        localStorage.getItem(
            "9meses_audio_settings"
        );







    if(
        !saved
    ){

        return;

    }







    try{



        const data =
            JSON.parse(
                saved
            );








        if(
            typeof data.volume === "number"
        ){



            this.state.volume =
                data.volume;



        }







        if(
            typeof data.muted === "boolean"
        ){



            this.state.muted =
                data.muted;



        }







    }
    catch(error){



        console.warn(
            "Error cargando audio",
            error
        );



    }





},







/*
    Detener música
*/


stopMusic(){



    const music =
        this.elements.background;







    if(
        !music
    ){

        return;

    }







    music.pause();







    music.currentTime =
        0;







    music.volume =
        0;







    this.state.started =
        false;



},







/*
    Reiniciar música
*/


restartMusic(){



    this.stopMusic();



    this.startBackgroundMusic();



}







};








/*
    Inicialización segura
*/


document.addEventListener(
    "DOMContentLoaded",
    ()=>{



        AudioController.init();



    }
);