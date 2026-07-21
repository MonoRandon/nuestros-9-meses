/* ==========================================================
   9 Meses V4 Cinematic Edition
   js/juego.js

   Nuevo sistema de minijuego cinematográfico

   Objetivo:
   Capturar imágenes flotantes de recuerdos.

   No utiliza corazones como objetos.
   Las imágenes son los elementos principales.

   Integración:
   - JuegoConfig
   - JuegoConfigManager
   - AudioController
   - App

========================================================== */


"use strict";




const Juego = {



    /* ======================================================
       1. ESTADO
    ====================================================== */



    container: null,


    gameArea: null,


    hud: {


        nivel: null,


        puntos: null,


        tiempo: null,


        volver: null


    },



    victoryScreen: null,



    imagenesActivas: [],



    particulasActivas: [],



    animationFrame: null,



    timer: null,



    config: null,



    iniciado: false,



    terminado: false,



    nivelActual: 1,



    puntos: 0,



    tiempoRestante: 0,



    objetivoActual: 15,



    limiteNiveles: 8,



    imagenesDisponibles: [


        "assets/juego/amor1.jpg",


        "assets/juego/amor2.jpg",


        "assets/juego/amor3.jpg",


        "assets/juego/amor4.jpg",


        "assets/juego/amor5.jpg",


        "assets/juego/amor6.jpg"


    ],




    niveles: [


        {


            objetivo: 15,


            cantidad: 1,


            velocidadExtra: 0


        },


        {


            objetivo: 30,


            cantidad: 2,


            velocidadExtra: 0.8


        },


        {


            objetivo: 45,


            cantidad: 3,


            velocidadExtra: 1.5


        },


        {


            objetivo: 60,


            cantidad: 3,


            velocidadExtra: 2.0


        },


        {


            objetivo: 75,


            cantidad: 5,


            velocidadExtra: 3


        },

        {


            objetivo: 90,


            cantidad: 4,


            velocidadExtra: 3.2


        },

        {


            objetivo: 100,


            cantidad: 2,


            velocidadExtra: 3.5


        }


    ],







    /* ======================================================
       2. INICIALIZACIÓN
    ====================================================== */



init(){


    if(
        this.iniciado
    ){

        this.destroy();

    }



    this.container =
        document.getElementById(
            "screen-juego"
        );



    if(
        !this.container
    ){

        console.error(
            "No existe screen-juego"
        );

        return;

    }



    this.reset();



    this.obtenerConfiguracion();



    this.createLayout();



    this.iniciarNivel();



    this.iniciado =
        true;



    this.startTimer();



    this.loop();



},


    obtenerConfiguracion(){



        if(
            typeof JuegoConfigManager !== "undefined"
        ){


            this.config =
                JuegoConfigManager.get();


        }
        else{


            this.config = {


                tiempo:30,


                velocidad:2,


                tamanoObjeto:120,


                puntosBase:5,


                particulas:8


            };


        }



        this.tiempoRestante =
            this.config.tiempo;



    },









    reset(){



        cancelAnimationFrame(
            this.animationFrame
        );



        clearInterval(
            this.timer
        );



        this.imagenesActivas = [];



        this.particulasActivas = [];



        this.puntos = 0;



        this.nivelActual = 1;



        this.terminado = false;



        if(this.container){


            this.container.innerHTML = "";


        }



    },









    /* ======================================================
       3. CONSTRUCCIÓN HTML
    ====================================================== */



    createLayout(){



        const wrapper =
            document.createElement(
                "div"
            );


        wrapper.className =
            "juego-wrapper";





        /*
            HUD
        */



        const hud =
            document.createElement(
                "div"
            );



        hud.className =
            "juego-hud";







        const nivel =
            this.crearHudElemento(
                "Nivel",
                "1"
            );



        const puntos =
            this.crearHudElemento(
                "Puntos",
                "0"
            );



        const tiempo =
            this.crearHudElemento(
                "Tiempo",
                this.tiempoRestante
            );







        const volver =
            document.createElement(
                "button"
            );



        volver.className =
            "juego-volver";



        volver.textContent =
            "Volver";







        volver.addEventListener(
            "click",
            ()=>{


                this.destroy();



                if(
                    typeof App !== "undefined"
                ){


                    App.goHome();


                }


            }
        );








        hud.append(

            nivel.contenedor,

            puntos.contenedor,

            tiempo.contenedor,

            volver

        );








        /*
            Área donde viven
            las imágenes
        */



        const area =
            document.createElement(
                "div"
            );



        area.className =
            "juego-area";





        /*
            Victoria
        */



        const victoria =
            document.createElement(
                "div"
            );



        victoria.className =
            "juego-victoria oculto";



        victoria.innerHTML = `

            <div class="victoria-contenido">

                <h2>
                    ❤️
                    COMPLETADOOOOO
                    ❤️
                </h2>

                <p>
                    Eres la mejor UwU.
                </p>

            </div>

        `;







        wrapper.append(

            hud,

            area,

            victoria

        );




        this.container.appendChild(
            wrapper
        );







        this.gameArea =
            area;



        this.victoryScreen =
            victoria;






        this.hud.nivel =
            nivel.valor;



        this.hud.puntos =
            puntos.valor;



        this.hud.tiempo =
            tiempo.valor;



        this.hud.volver =
            volver;



    },









    crearHudElemento(
        titulo,
        valor
    ){



        const contenedor =
            document.createElement(
                "div"
            );



        contenedor.className =
            "hud-item";





        const texto =
            document.createElement(
                "span"
            );



        texto.textContent =
            titulo;





        const numero =
            document.createElement(
                "strong"
            );



        numero.textContent =
            valor;






        contenedor.append(

            texto,

            numero

        );




        return {


            contenedor,

            valor: numero


        };


    },
        /* ======================================================
       4. CREACIÓN DE IMÁGENES
    ====================================================== */



    iniciarNivel(){

        console.log("Nivel:", this.nivelActual);
        console.log("Niveles:", this.niveles);

        const datos =
            this.niveles[
                this.nivelActual - 1
            ];

        console.log("Datos:", datos);

        this.objetivoActual = datos.objetivo;

        // NUEVO
        this.tiempoRestante = 30;
        this.startTimer();

        this.actualizarHUD();

        this.limpiarImagenes();

        for(
            let i = 0;
            i < datos.cantidad;
            i++
        ){

            this.crearImagen();

        }

    },









    crearImagen(){



        if(
            !this.gameArea
        ){

            return;

        }






        const img =
            document.createElement(
                "img"
            );



        img.className =
            "juego-imagen";



        img.draggable =
            false;







        const indice =
            Math.floor(
                Math.random() *
                this.imagenesDisponibles.length
            );



        img.src =
            this.imagenesDisponibles[
                indice
            ];







        const config =
            this.obtenerConfigActual();







        const size =
            config.tamanoObjeto;






        img.style.width =
            size + "px";



        img.style.height =
            size + "px";








        const limiteX =
            this.gameArea.clientWidth -
            size;



        const limiteY =
            this.gameArea.clientHeight -
            size;







        const objeto = {



            elemento: img,



            x:
                Math.random() *
                limiteX,



            y:
                Math.random() *
                limiteY,



            velocidad:
                config.velocidad,



            vx:
                (
                    Math.random() > 0.5
                    ?
                    1
                    :
                    -1
                )
                *
                config.velocidad,



            vy:
                (
                    Math.random() > 0.5
                    ?
                    1
                    :
                    -1
                )
                *
                config.velocidad,



            tamaño:
                size



        };









        img.style.transform =
            `
            translate(
                ${objeto.x}px,
                ${objeto.y}px
            )
            `;









        img.addEventListener( "click",(evento)=>{
                AudioController.play("pop");
                evento.stopPropagation();


                this.capturarImagen(
                    objeto
                );


            }
        );









        this.gameArea.appendChild(
            img
        );





        this.imagenesActivas.push(
            objeto
        );



    },









    obtenerConfigActual(){



        let config;



        if(
            typeof JuegoConfigManager !== "undefined"
        ){


            config =
                JuegoConfigManager.get();


        }

        else{


            config = {


                velocidad:2,


                tamanoObjeto:120,


                particulas:8,


                puntosBase:5,


                tiempo:30


            };


        }







        /*
            Ajuste de velocidad
            según nivel actual
        */



        const nivel =
            this.niveles[
                this.nivelActual - 1
            ];



        if(
            nivel
        ){


            config.velocidad +=
                nivel.velocidadExtra;


        }






        return config;



    },









    limpiarImagenes(){



        this.imagenesActivas.forEach(
            imagen=>{


                if(
                    imagen.elemento
                ){


                    imagen.elemento.remove();


                }


            }
        );



        this.imagenesActivas =
            [];



    },









    /* ======================================================
       5. MOVIMIENTO
    ====================================================== */



    loop(){



        if(
            !this.iniciado ||
            this.terminado
        ){

            return;

        }






        this.moverImagenes();



        this.actualizarParticulas();






        this.animationFrame =
            requestAnimationFrame(
                ()=>this.loop()
            );



    },









    moverImagenes(){



        this.imagenesActivas.forEach(
            imagen=>{



                imagen.x +=
                    imagen.vx;



                imagen.y +=
                    imagen.vy;





                this.comprobarLimites(
                    imagen
                );







                imagen.elemento.style.transform =
                    `
                    translate(
                        ${imagen.x}px,
                        ${imagen.y}px
                    )
                    `;





            }
        );



    },









    /* ======================================================
       6. COLISIONES
    ====================================================== */



    comprobarLimites(
        imagen
    ){



        const ancho =
            this.gameArea.clientWidth;



        const alto =
            this.gameArea.clientHeight;







        if(
            imagen.x <= 0 ||
            imagen.x + imagen.tamaño >= ancho
        ){


            imagen.vx *= -1;



            imagen.x =
                Math.max(
                    0,
                    Math.min(
                        imagen.x,
                        ancho - imagen.tamaño
                    )
                );


        }








        if(
            imagen.y <= 0 ||
            imagen.y + imagen.tamaño >= alto
        ){


            imagen.vy *= -1;



            imagen.y =
                Math.max(
                    0,
                    Math.min(
                        imagen.y,
                        alto - imagen.tamaño
                    )
                );


        }



    },
        /* ======================================================
       7. CAPTURA
    ====================================================== */



    capturarImagen(
        imagen
    ){



        if(
            this.terminado
        ){

            return;

        }






        /*
            Sonido de captura
        */


        if(
            window.AudioController &&
            typeof AudioController.play === "function"
        ){

            AudioController.play(
                "pop"
            );

        }









        /*
            Partículas
        */


        this.crearParticulas(
            imagen.x +
            imagen.tamaño / 2,

            imagen.y +
            imagen.tamaño / 2
        );









        /*
            Eliminar imagen
        */


        const posicion =
            this.imagenesActivas.indexOf(
                imagen
            );



        if(
            posicion !== -1
        ){


            this.imagenesActivas.splice(
                posicion,
                1
            );


        }







        imagen.elemento.remove();









        /*
            Puntos
        */


        const config =
            this.obtenerConfigActual();




        this.puntos +=
            config.puntosBase;






        this.actualizarHUD();







        /*
            Revisar progreso
        */


        this.revisarNivel();








        /*
            Si continúa,
            aparece otra imagen
        */


        if(
            !this.terminado
        ){



            this.crearImagen();



        }



    },









    /* ======================================================
       8. PARTÍCULAS
    ====================================================== */



    crearParticulas(
        x,
        y
    ){



        const config =
            this.obtenerConfigActual();




        const cantidad =
            config.particulas;







        for(
            let i = 0;
            i < cantidad;
            i++
        ){



            const elemento =
                document.createElement(
                    "span"
                );



            elemento.className =
                "juego-particula";



            elemento.textContent =
                "❤️";







            const particula = {



                elemento,



                x,



                y,



                vx:
                    (
                        Math.random()
                        -
                        0.5
                    )
                    *
                    8,



                vy:
                    (
                        Math.random()
                        -
                        1
                    )
                    *
                    8,



                vida:
                    60



            };








            elemento.style.left =
                x + "px";



            elemento.style.top =
                y + "px";







            this.gameArea.appendChild(
                elemento
            );





            this.particulasActivas.push(
                particula
            );



        }



    },









    actualizarParticulas(){



        this.particulasActivas =
            this.particulasActivas.filter(
                particula=>{



                    particula.x +=
                        particula.vx;



                    particula.y +=
                        particula.vy;



                    particula.vy +=
                        0.18;



                    particula.vida--;







                    particula.elemento.style.transform =
                        `
                        translate(
                            ${particula.x}px,
                            ${particula.y}px
                        )
                        scale(
                            ${
                                particula.vida / 60
                            }
                        )
                        `;







                    particula.elemento.style.opacity =
                        particula.vida / 60;









                    if(
                        particula.vida <= 0
                    ){



                        particula.elemento.remove();



                        return false;


                    }







                    return true;



                }
            );



    },



    /* ======================================================
       9. NIVELES
    ====================================================== */



    revisarNivel(){



        if(
            this.puntos <
            this.objetivoActual
        ){

            return;

        }








        if(
            this.nivelActual >=
            this.limiteNiveles
        ){



            this.victoria();



            return;



        }









        this.nivelActual++;







        setTimeout(
            ()=>{


                this.iniciarNivel();


            },
            700
        );




    },

    gameOver(){

        AudioController.play("lose");

        this.MostrarGameOver();

    },









    /* ======================================================
       10. TEMPORIZADOR
    ====================================================== */



    startTimer(){

        clearInterval(this.timer);

        this.timer = setInterval(()=>{

            this.tiempoRestante--;

            this.actualizarHUD();

            if(this.tiempoRestante <= 0){

                clearInterval(this.timer);

            this.terminado = true;

            if(this.puntos >= 100){

                this.victoria();

            }else{

                this.mostrarGameOver();

            }

            return;

            }

    },1000);
    },









    stopTimer(){



        clearInterval(
            this.timer
        );



    },
        /* ======================================================
       11. PANTALLA DE VICTORIA
    ====================================================== */



    victoria(){



        if(
            this.terminado
        ){

            return;

        }






        this.terminado =
            true;






        this.stopTimer();







        cancelAnimationFrame(
            this.animationFrame
        );








        this.limpiarImagenes();








        if(
            window.AudioController &&
            typeof AudioController.play === "function"
        ){

            AudioController.play(
                "win"
            );

        }







        if(
            this.victoryScreen
        ){



            this.victoryScreen
                .classList
                .remove(
                    "oculto"
                );



        }








        setTimeout(
            ()=>{



                if(
                    typeof App !== "undefined"
                ){



                    App.navigate(
                        "creditos"
                    );



                }




            },
            3500
        );



    },



    mostrarGameOver(){

        this.stopTimer();

        cancelAnimationFrame(this.animationFrame);

        this.limpiarImagenes();

        this.gameArea.innerHTML = `

            <div class="victoria-overlay">

                <div class="victoria-contenido">

                    <h1> Perdiste corazon💔 </h1>

                    <p>No alcanzaste los 100 puntos. </p>
                    <p>Intentemoslo de nuevo, si? </p>
                    

                    <button id="btn-reintentar" class="nav-btn">

                        Intentar de nuevo :3

                    </button>

                </div>

            </div>

        `;

        ocument
            .getElementById("btn-reintentar")
            .addEventListener("click",()=>{

                this.restart();

            });

    },





    /* ======================================================
       12. LIMPIEZA
    ====================================================== */



    destroy(){



        this.terminado =
            true;



        this.iniciado =
            false;







        cancelAnimationFrame(
            this.animationFrame
        );







        this.stopTimer();







        this.limpiarImagenes();








        this.particulasActivas
            .forEach(
                particula=>{



                    particula.elemento.remove();



                }
            );







        this.particulasActivas =
            [];







        if(
            this.container
        ){



            this.container.innerHTML =
                "";



        }



    },









    /* ======================================================
       13. REINICIO
    ====================================================== */



    restart(){



        this.destroy();



        this.reset();



        this.obtenerConfiguracion();



        this.createLayout();



        this.iniciarNivel();



        this.iniciado =
            true;



        this.startTimer();



        this.loop();



    },









    /* ======================================================
       14. FUNCIONES AUXILIARES
    ====================================================== */



    actualizarHUD(){



        if(
            this.hud.nivel
        ){



            this.hud.nivel.textContent =
                this.nivelActual;



        }







        if(
            this.hud.puntos
        ){



            this.hud.puntos.textContent =
                this.puntos;



        }








        if(
            this.hud.tiempo
        ){



            this.hud.tiempo.textContent =
                this.tiempoRestante;



        }



    },









    obtenerImagenAleatoria(){



        return this.imagenesDisponibles[

            Math.floor(

                Math.random()
                *
                this.imagenesDisponibles.length

            )

        ];



    },









    numeroAleatorio(
        min,
        max
    ){



        return Math.random()
            *
            (
                max - min
            )
            +
            min;



    },









    detener(){



        this.terminado =
            true;



        this.stopTimer();



        cancelAnimationFrame(
            this.animationFrame
        );



    }







};





console.log(
    "🎮 Juego cinematográfico cargado."
);