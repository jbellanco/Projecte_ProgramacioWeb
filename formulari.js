function comprovacions() {		

	//Guardem tots els valors obtinguts del fomulari per a realitzar les comprovacions adients
	var nom = document.getElementById('nom').value;
	var cognoms = document.getElementById('cognoms').value;
	var DNI = document.getElementById('dni').value;
	var datan = document.getElementById('ddn').value;
	var adreça = document.getElementById('carrer').value;
	var poblacio = document.getElementById('poblacio').value;
    var cp = document.getElementById('cp').value;
	var pais = document.getElementById('pais').value;
    var telefon = document.getElementById('tel').value;
	var email = document.getElementById('email').value;
	var username = document.getElementById('username').value;
	var pwd1 = document.getElementById('pwd').value;
	var pwd2 = document.getElementById('pwd2').value;
	var blocked = false;

	//Borrem el color (per si fos vermell) dels camps per a tornar a fer les comprovacions
	document.getElementById('nom').style.backgroundColor = "";
	document.getElementById('cognoms').style.backgroundColor = "";
	document.getElementById('dni').style.backgroundColor = "";
	document.getElementById('cp').style.backgroundColor = "";
	document.getElementById('tel').style.backgroundColor = "";
	document.getElementById('email').style.backgroundColor = "";
	document.getElementById('username').style.backgroundColor = "";
	document.getElementById('pwd').style.backgroundColor = "";
	document.getElementById('pwd2').style.backgroundColor = "";

	//Borrem el text d'error 	
	document.getElementById('nomcognoms').innerHTML = "";
	document.getElementById('emailc').innerHTML = "";
	document.getElementById('dnic').innerHTML = "";
	document.getElementById('usernamec').innerHTML = "";
	document.getElementById('telc').innerHTML = "";
	document.getElementById('cpc').innerHTML = "";
	document.getElementById('pwdc').innerHTML = "";

	var check = false;

    //Comprova q l'usuari tingui més de 18 anys
    var res = datan.split('-');

    var d = new Date ();
    var dia = d.getDate();
    var mes = d.getMonth();
    var any = d.getFullYear();

    mes += 1;
    var edat = any - res[0];

    if ((res [1] > mes) || ((res[1] == mes) && (res[2] > dia)))
    	edat--;

    if (edat < 18){
    	alert ("Ho sentim, has de ser major d'edat per poder registrar-te!"); 
    	return true;
    }

	//Comprova q el DNI sigui correcte
	var num = DNI.slice(0, 8);
	var lletra = DNI.slice(8);

	if (DNI.length != 9 || isNaN(Number(num)) || !isNaN(Number(lletra))){
		document.getElementById('dni').style.backgroundColor = "#ff9999";
		document.getElementById('dnic').innerHTML = "El número de DNI introduït no és correcte";
		check = true;
	}    

	//Comprova q el codi postal sigui valid
    if (isNaN(Number(cp)) || (cp.length != 5)){ 
		document.getElementById('cp').style.backgroundColor = "#ff9999";
		document.getElementById('cpc').innerHTML = "El codi postal introduït no és correcte";
		check = true;	
	}

	//Comprova q el número de telefon és valid
    if (isNaN(Number(telefon)) || (telefon.length != 9)){ 
		document.getElementById('tel').style.backgroundColor = "#ff9999";
		document.getElementById('telc').innerHTML = "El número de telefon introduït no és correcte";
		check = true;
	}

	//Comprova q el format del correu electronic sigui correcte
	var re = /\S+@\S+\.\S+/;

	if (!re.test(email)){
		document.getElementById('email').style.backgroundColor = "#ff9999";
		document.getElementById('emailc').innerHTML = "El format del correu electronic introduït no és correcte";
		check = true;
	}

	//Comprova la contrasenya
	var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;  


	if (pwd1.localeCompare(pwd2)){
		document.getElementById('pwd').style.backgroundColor = "#ff9999";
		document.getElementById('pwd2').style.backgroundColor = "#ff9999";
		document.getElementById('pwdc').innerHTML = "'Ojo! Les contrasenyes no coincideixen...'";
		check = true;
	}

	if(!pwd1.match(decimal)) {
		document.getElementById('pwd').style.backgroundColor = "#ff9999";
		document.getElementById('pwd2').style.backgroundColor = "#ff9999";
		document.getElementById('pwdc').innerHTML = "Revisa els caràcters de la contrasenya... Recorda que com a mínim: 8 caràcters, una majúscula i un nombre!";
		check = true;
	}

	//Si alguns dels camps comprovats es incorrecte, avisa a l'usuari i retorna false
	if (check){
		alert("Atenció! S'han detectat errors en alguns dels camps introduïts, si us plau revisa'ls!");
		return false;
	}

	/////////////////////////////////////////////////////////////////////////////////////////////

	check = false;

	//Bucle que compara els valors introduits amb els dels usuaris ja registrats
	for (var i = 0; i < localStorage.length; i++){
		var temp = localStorage[localStorage.key(i)];
		temp = JSON.parse(temp);

		if (temp.nom == nom && temp.cognoms == cognoms){
			document.getElementById('nom').style.backgroundColor = "#ff9999";
			document.getElementById('cognoms').style.backgroundColor = "#ff9999";			
			document.getElementById('nomcognoms').innerHTML = "Ja existeix un usuari registrat amb aquest nom i cognoms";
			check = true;
		}

		if (temp.dni == DNI){
			document.getElementById('dni').style.backgroundColor = "#ff9999";
			document.getElementById('dnic').innerHTML = "Ja existeix un usuari registrat amb aquest DNI";
			check = true;
		}

		if (temp.email == email){
			document.getElementById('email').style.backgroundColor = "#ff9999";
			document.getElementById('emailc').innerHTML = "Ja existeix un usuari registrat amb aquest correu electrònic";
			check = true;
		}

		if (temp.username == username){
			document.getElementById('username').style.backgroundColor = "#ff9999";
			document.getElementById('usernamec').innerHTML = "Ja existeix un usuari registrat amb aquest nom d'usuari";
			check = true;
		}
	}

	//Si algun dels valors comprovats coincideix, avisa a l'usuari i retorna false.
	if (check){
		alert("Si us plau, revisa els camps marcats en vermell!");
		return false;
	}

	//Per contrari si cap coincideix guarda les dades de l'usuari a LocalStorage, avisa a l'usuari i retorna true.
	else {
		//GUARDEM L'USUARI A LOCALSTORAGE COM UNA STRING, JA QUE NO PODEM GUARDAR UN OBJECTE
		var s_user = {nom: nom, cognoms: cognoms, dni: DNI, ddn: datan, adreça: adreça, poblacio: poblacio, cp: cp, pais: pais, tel: telefon, email: email, username: username, contrasenya: pwd1, blocked: blocked};
		localStorage.setItem(username,JSON.stringify(s_user));

		alert("Registre completat correctament!");
		return true;
	}	    	
}