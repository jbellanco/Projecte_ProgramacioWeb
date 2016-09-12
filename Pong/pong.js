
var vidas; // Vidas
var golpes; // Golpes
var estado = 0;  //  0 = sin comenzar. 1 = funcionando. 2=pause;
var pelotavx; // velocidad pelota x
var pelotavy; // velocidad pelota y
var auxPelotavx; //aux velocidad pelota x
var auxPelotavy;//aux velocidad pelota x
var velocidad;
var sonidoBarra;
var sonidoPared;

// Comienza el juego
function startGame() {
    sonidoBarra = new Audio("sounds/herrero.mp3");
    sonidoPared = new Audio("sounds/pared.mp3");
	velocidad=1;
    golpes = 0;
    vidas = 3;
    pelotavx = 2;
    pelotavy = 4;  
    barra = new Barra(50, 50, "black", 225, 590);
    pelota = new Pelota(20, 0, 7, "#104E8B");
}
//Canvas variables
var canvas = {
    width: 500,
    height: 600,
};

// Pinta el canvas
function loadGame() {
    pong.start();
    var ctx = pong.context;
    ctx.font = "30px Arial";
    ctx.fillStyle = "blue"
    ctx.fillText("Presione espacio", 130, 300);
    ctx.fillText("para comenzar la partida", 80, 330);
    
}
var pong = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 500;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        var Pong = document.getElementById("pong");
        Pong.style.display = "block";
        document.getElementById("juego").insertBefore(this.canvas, Pong);
        this.interval = setInterval(updateGameArea, 20); // actualiza la pantalla cada 20 milisegundos
    },   
    clear : function() { // reactuliza
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Crea la barra
function Barra(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = pong.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.nuevaPosicion = function () {
        this.x += this.speedX;
    }
    this.choca = function () {
        if (this.x + this.speedX <= 0 || this.x + this.speedX >= 450) {
            if (this.x <= 0) barra.x = 0;
            if (this.x >= 452) barra.x = 452;
        }
    }
}

// Crea la pelota
function Pelota(x, y, radio,color) {
    this.c = color;
    this.x = x;
    this.y = y;
    this.r = radio;

    this.update = function () {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fill();
    };
    // Verifica si la pelota a chocado con  la barra
    this.chocaBarra = function () {
        if (pelota.x + pelota.r + pelotavx >= barra.x && pelota.x - pelota.r <= barra.x + barra.width) {
            if (pelota.y + pelotavy >= 590 && pelota.y <= 600) {
                /* Si golpea en las puntas de la barra
                    La pelota ira e direccion x contraria
                    si rebota en el medio seguira en la misma direccion x 
                    La direccion y cambia siempre
                */
                //pelota.r + pelotavx <= barra.x + barra.width
                if (pelota.x + pelotavx >= barra.x && pelota.x+ pelotavx <= barra.x + 12) {
                    pelotavx = pelotavx * (-1);
                    pelotavy = pelotavy * (-1);
                } else if (pelota.x + pelotavx <= barra.x + barra.width && pelota.x + pelotavx >= barra.x + barra.width - 12) { // quito el radio
                    pelotavx = pelotavx * (-1);
                    pelotavy = pelotavy * (-1);
                } else {
                    pelotavy = pelotavy * (-1);                  
                }
				sonidoPared.play();
                golpes++;
                // Aumenta velocidad si  golpes es multiplo de 20
                if (golpes % 20 == 0) {
                    velocidad = velocidad * 1.25;  
                }
            }
        }
    };
    //Verifica si la pelota a chocado con las paredes o 
    this.chocaPared = function () {
        // pared derecha
        if (pelota.x + pelota.r > canvas.width) {
            pelotavx = pelotavx * (-1);
            pelota.x = canvas.width - pelota.r;
			sonidoBarra.play();
        }
        // pared izquierda
        else if (pelota.x - pelota.r < 0) {
            pelotavx = pelotavx * (-1);
            pelota.x = pelota.r;
			sonidoBarra.play();
        }
        // pared arriba
        if (pelota.y - pelota.r < 0) {
            pelotavy = pelotavy * (-1);
            pelota.y = pelota.r;
			sonidoBarra.play();
        }
    };
    // movimiento de la pelota
    this.muevePelota = function () {
        pelota.x += pelotavx;
        pelota.y += pelotavy;
    };
    this.fuera = function () {
        if (pelota.y + pelota.r -20 > canvas.height) { // El 20 es para que no de la sensacion de que esta la pelota
            controlJuego();
        }
    }
}
// derecha 39  iz 37  espacio 32
window.addEventListener("keydown", function (event) {
    if (estado == 1) {
        if (event.keyCode == 39) {
            moveright();
        }
        if (event.keyCode == 37) {
            moveleft();
        }
    }
    if (event.keyCode == 32) {
        switch (estado) {
            case 0: startGame(); estado = 1; break;
            case 1: pause(); estado = 2; break;
            case 2: seguir(); estado = 1; break;
        }
    }
});
// Pon en pausa
function pause() {
    auxPelotavx = pelotavx;
    auxPelotavy = pelotavy;
    pelotavx = 0;
    pelotavy = 0;
    var ctx = pong.context;
    ctx.font = "30px Arial";
    ctx.fillStyle = "blue"
    ctx.fillText("Juego pausado", 160, 300);
    ctx.font = "22px Arial";
    ctx.fillStyle = "black"
    ctx.fillText("Espacio para renaudar", 155, 330);
}
// poner a funcionar/ Espacio despues de pausa
function seguir() {
    pelotavx  = auxPelotavx;
    pelotavy = auxPelotavy;
}
// Si pierdes controla tus vidas y restable el juego
function controlJuego() {
    if (vidas == 0) {
        estado = 0;
        var ctx = pong.context;
        ctx.font = "30px Arial";
        ctx.fillStyle = "red"
        ctx.fillText("Game Over", 170, 300);
        ctx.font = "22px Arial";
        ctx.fillStyle = "black"
        ctx.fillText("Espacio para volver a comenzar", 110, 330);
    } else {
        vidas--;
        barra = new Barra(50, 50, "black", 225, 590); // alto por debajado del canvas para resolver bugs
        pelota = new Pelota(20, 0, 7, "#104E8B");
    }
}
// detiene barra si no se esta presionando las flechas
window.addEventListener("keyup", function (event) {
    if (event.keyCode == 39 || event.keyCode == 37) {
        barra.speedX = 0;
    } 
});
// mueve barra izquierda
function moveleft() {
    if (barra.x > 0) barra.speedX = -7 * velocidad;
}
// mueve barra derecha
function moveright() {
    if (barra.x < 452) barra.speedX = 7 * velocidad;
}
// Pinta corazones segun vidas
function pintaCorazones() {
    var heart = document.getElementById("heart");
    var heartb = document.getElementById("heartB");
    switch (vidas) {
        case 3:
            ctx = pong.context;
            ctx.drawImage(heart, 10, 10, 32, 32);
            ctx.drawImage(heart, 10, 60, 32, 32);
            ctx.drawImage(heart, 10, 110, 32, 32);
            
            break;
        case 2: 
            ctx.drawImage(heartb, 10, 10, 32, 32);
            ctx.drawImage(heart, 10, 60, 32, 32);
            ctx.drawImage(heart, 10, 110, 32, 32);
            break;
        case 1:
            ctx.drawImage(heartb, 10, 10, 32, 32);
            ctx.drawImage(heartb, 10, 60, 32, 32);
            ctx.drawImage(heart, 10, 110, 32, 32);
            break;
        case 0:
            ctx.drawImage(heartb, 10, 10, 32, 32);
            ctx.drawImage(heartb, 10, 60, 32, 32);
            ctx.drawImage(heartb, 10, 110, 32, 32);
            break;
    }
};
// Escribe los golpes
function pintaGolpes() {
    var ctx = pong.context;
    ctx.font = "25px Arial";
    ctx.fillStyle = "black"
    ctx.fillText("Golpes: ", 360, 30);
    ctx.fillText(golpes.toString(), 455, 30);
}

// Limpia el canvas y actualiza cada 20 milisegundos
function updateGameArea() {
    if (estado != 2 && estado != 0) {
        pong.clear();
        //Pinta vidas
        pintaCorazones();
        pintaGolpes();

        //Barra
        barra.choca();
        barra.nuevaPosicion();
        barra.update();

        // pelota
        pelota.muevePelota();
        pelota.chocaBarra();
        pelota.chocaPared();
        pelota.fuera();
        pelota.update();
    }
}
