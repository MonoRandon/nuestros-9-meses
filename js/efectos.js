/*
 * ==========================================
 * 9 Meses V3 Cinematic Edition
 * ------------------------------------------
 * js/efectos.js
 *
 * Sistema visual cinematográfico
 *
 * Gestiona:
 *
 * - Fondo mágico infinito
 * - Estrellas
 * - Partículas
 * - Niebla
 * - Brillos
 * - Ambiente por sección
 *
 * ==========================================
 */


"use strict";








const Efectos = {



    initialized:false,



    container:null,



    starsContainer:null,



    particlesContainer:null,



    fogContainer:null,



    intervals:[],



    currentTheme:"home",










    initBackground(){



        if(
            this.initialized
        ){

            return;

        }







        this.createLayers();







        this.createStars();







        this.createParticles();







        this.createFog();







        this.initialized =
            true;







        console.log(
            "✨ Fondo mágico iniciado."
        );



    },









    createLayers(){



        const background =

            document.getElementById(
                "background-canvas"
            );







        if(
            !background
        ){

            return;

        }







        background.innerHTML = `



            <div

                class="stars-layer"

                id="stars-layer"

            ></div>







            <div

                class="particles-layer"

                id="particles-layer"

            ></div>







            <div

                class="fog-layer"

                id="fog-layer"

            ></div>



        `;







        this.starsContainer =

            document.getElementById(
                "stars-layer"
            );







        this.particlesContainer =

            document.getElementById(
                "particles-layer"
            );







        this.fogContainer =

            document.getElementById(
                "fog-layer"
            );



    },
/*
    Crear estrellas
*/


createStars(){



    if(
        !this.starsContainer
    ){

        return;

    }







    const cantidad = 160;







    for(
        let i = 0;
        i < cantidad;
        i++
    ){



        const star =

            document.createElement(
                "span"
            );







        star.className =

            "magic-star";







        const size =

            Math.random()
            *
            3
            +
            1;







        star.style.width =

            size + "px";







        star.style.height =

            size + "px";







        star.style.left =

            Math.random()
            *
            100
            +
            "%";







        star.style.top =

            Math.random()
            *
            100
            +
            "%";







        star.style.animationDelay =

            Math.random()
            *
            5
            +
            "s";







        star.style.animationDuration =

            (
                2 +
                Math.random()*4
            )
            +
            "s";







        this.starsContainer
            .appendChild(
                star
            );



    }



},










/*
    Partículas ambientales
*/


createParticles(){



    if(
        !this.particlesContainer
    ){

        return;

    }







    const interval =

        setInterval(
            ()=>{



                const particle =

                    document.createElement(
                        "span"
                    );







                particle.className =

                    "magic-particle";







                particle.style.left =

                    Math.random()
                    *
                    100
                    +
                    "%";







                particle.style.animationDuration =

                    (
                        8 +
                        Math.random()*8
                    )
                    +
                    "s";







                particle.style.opacity =

                    Math.random();



                this.particlesContainer
                    .appendChild(
                        particle
                    );







                setTimeout(
                    ()=>{



                        particle.remove();



                    },
                    16000
                );



            },
            300
        );







    this.intervals.push(
        interval
    );



},










/*
    Capa de niebla
*/


createFog(){



    if(
        !this.fogContainer
    ){

        return;

    }







    const fog =

        document.createElement(
            "div"
        );







    fog.className =

        "ambient-fog";







    this.fogContainer
        .appendChild(
            fog
        );



},
/*
    Cambiar ambiente según pantalla
*/


changeTheme(section){



    this.currentTheme =
        section;







    const body =
        document.body;







    if(
        !body
    ){

        return;

    }







    body.dataset.theme =
        section;







    switch(section){



        case "home":



            this.setIntensity(
                "normal"
            );



        break;







        case "carta":



            this.setIntensity(
                "romantic"
            );



            this.createLoveParticles();



        break;







        case "galeria":



            this.setIntensity(
                "soft"
            );



        break;







        case "juego":



            this.setIntensity(
                "energetic"
            );



        break;







        case "creditos":



            this.setIntensity(
                "cinematic"
            );



            this.createLoveParticles();



        break;



    }



},










/*
    Intensidad visual
*/


setIntensity(level){



    const root =

        document.documentElement;







    root.style.setProperty(
        "--effect-level",
        level
    );



},










/*
    Partículas románticas
*/


createLoveParticles(){



    if(
        !this.particlesContainer
    ){

        return;

    }







    for(
        let i = 0;
        i < 15;
        i++
    ){



        const heart =

            document.createElement(
                "span"
            );







        heart.className =

            "love-particle";







        heart.innerHTML =
            "❤️";







        heart.style.left =

            Math.random()
            *
            100
            +
            "%";







        heart.style.animationDelay =

            Math.random()
            *
            3
            +
            "s";







        this.particlesContainer
            .appendChild(
                heart
            );







        setTimeout(
            ()=>{



                heart.remove();



            },
            8000
        );



    }



},










/*
    Detener efectos
*/


destroy(){



    this.intervals.forEach(
        interval=>{

            clearInterval(
                interval
            );

        }
    );







    this.intervals = [];







    if(
        this.starsContainer
    ){

        this.starsContainer.innerHTML =
            "";

    }







    if(
        this.particlesContainer
    ){

        this.particlesContainer.innerHTML =
            "";

    }







    this.initialized =
        false;



}







};








/*
    Inicio automático
*/


document.addEventListener(
    "DOMContentLoaded",
    ()=>{



        if(
            typeof Efectos !== "undefined"
        ){



            Efectos.initBackground();



        }



    }
);