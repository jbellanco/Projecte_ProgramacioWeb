var cartas = [];

var j = 1;
var x = 0;

for (var i = 0; i < 28; i++) {
    // agrega la carta al array y le introduce un valor  -- estoy guardando el valor de la carta en alt --
    cartas.push("<img type'image' id='carta"+i+"' src='img/setimig/e" + i + ".png'   alt='"+j+"'/>")
    x++;
    if (x == 4) {
        x = 0;
        j++;
    }
}

for (var i = 28; i < 40; i++) {
    // agrega la carta al array y le introduce un valor  -- estoy guardando el valor de la carta en alt --
    cartas.push("<img type'image' id='carta"+i+"' src='img/setimig/e" + i + ".png'   alt='0.5'/>")
}


var contador_jugador = 0;
var contador_banca = 0;

function mostraCarta(){
    j = Math.round(Math.random() * 39);
    document.getElementById('jugador').innerHTML += cartas[j];    
	
	var imagen = document.getElementById('carta'+j);
	contador_jugador += parseFloat(imagen.alt);

    document.getElementById('puntuacio_jugador').innerHTML = "";
    document.getElementById('puntuacio_jugador').innerHTML = "Puntuació Jugador: " + contador_jugador;

    if (contador_jugador > 7.5){
        disable("mostraCarta");
        disable("jugaBanca");
        setTimeout(resultats, 100);
    }
}

function jugaBanca(){

    disable("mostraCarta");
   
    setTimeout(function(){
        do {  
            j = Math.round(Math.random() * 39);
            document.getElementById('banca').innerHTML += cartas[j];

            var imagen = document.getElementById('carta'+j);
            contador_banca += parseFloat(imagen.alt);

            document.getElementById('puntuacio_banca').innerHTML = "";
            document.getElementById('puntuacio_banca').innerHTML = "Puntuació Banca: " + contador_banca;
        } while (contador_banca <= 5);
    }, 1500);

    disable("jugaBanca");
    setTimeout(resultats, 3500);

}

function resultats(){
    document.getElementById('puntuacions').innerHTML = "";  

    if (contador_jugador > 7.5)
        document.getElementById('puntuacions').innerHTML = "Hmmm... Has perdut.";  

    else if (contador_jugador > contador_banca || contador_banca > 7.5)
        document.getElementById('puntuacions').innerHTML = "Enhorabona! Has guanyat!";

    else if (contador_jugador == contador_banca)
        document.getElementById('puntuacions').innerHTML = "Empat!";

    else 
        document.getElementById('puntuacions').innerHTML = "Hmmm... Has perdut.";

    document.getElementById('resultats').style.display = 'block';
}

function disable(id){
    document.getElementById(id).onclick = function() {
        this.disabled = true;
    }
}

function exit(){
    window.location = "jocs.html"
}