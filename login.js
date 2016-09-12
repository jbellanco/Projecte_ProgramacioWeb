var intents = 3;

function login (){
	//Guardem els valors introduïts per l'usuari
	var username = document.getElementById('user').value;
	var password = document.getElementById('password').value;
	
	//Bucle que compara els valors introduits amb els dels usuaris ja registrats
	for (var i = 0; i < localStorage.length; i++){
		var temp = localStorage[localStorage.key(i)];
		temp = JSON.parse(temp);

		if ((temp.username == username) && (temp.contrasenya == password)){			
			
			if (!temp.blocked)
				return true;		

			else {
				alert("Ho sentim! L'usuari està blocat, contacti amb l'administrador.");
				return false;
			}	
		}

		else if ((temp.username == username) && (temp.contrasenya != password)){
			
			intents--;

			if (intents > 0){
				alert("La contrasenya introduïda no és correcte. Queden " + intents + " intents.");
			}

			else {
				temp.blocked = true;

				localStorage.removeItem(localStorage.key(i));

				var s_user = {nom: temp.nom, cognoms: temp.cognoms, dni: temp.dni, ddn: temp.ddn, adreça: temp.adreça, poblacio: temp.poblacio, cp: temp.cp, pais: temp.pais, tel: temp.telefon, email: temp.email, username: temp.username, contrasenya: temp.contrasenya, blocked: temp.blocked};
				localStorage.setItem(temp.username,JSON.stringify(s_user));

				alert("L'usuari ha estat blocat, contacti amb l'administrador");
				
				intents = 3;
			}

			return false;
		}
	}

	alert("L'usuari introduït no existeix.");
	return false;
}