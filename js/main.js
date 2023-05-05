/* Instalación PWA */
///////////////////////////////////////////////////////////
// Está comentado hasta que haya una versión más establed e la app
/*if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('sw.js');
	});
}*/
///////////////////////////////////////////////////////////

/*
////////////////////////
API ChatGPT 4

import { Configuration, OpenAIApi } from 'openai'

const apiKey = "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";
const configuration = new Configuration({ apiKey });

const openai = new OpenAIApi(configuration);

const completion = await openai.createChatCompletion({
	model: 'gpt-4-0314',
	messages: [{ role: 'user', content: '¿Cómo iterar un Array en Javascript?' }],
});

console.log(completion.data.choices[0].message);

*/


function eliminarZoom() {
	// Método para hacer que la pantalla vuelva al tamaño original tras hacer clic en un input
	// Obtenemos la etiqueta meta del viewport
	var viewport = document.querySelector("meta[name=viewport]");

	// Al hacer clic en el input, establecemos el ancho de viewport a su tamaño original
	// y deshabilitamos la capacidad de hacer zoom
	document.querySelector("input[type=text]").addEventListener("focus", function() {
	    viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
	});

	// Al salir del input, establecemos el ancho de viewport al tamaño de la pantalla y habilitamos el zoom
	document.querySelector("input[type=text]").addEventListener("blur", function() {
	    viewport.setAttribute("content", "width=device-width, initial-scale=1.0");
	});
}

// Mostrar versión de la beta
function versionBeta() {
	if (leerDatosUsuario("Tipo") == "0") {
		var codigo = "	<div class='labelBeta botonMenuSuperior'>Beta 0.5</div>";
	}else {
		var codigo = "	<div class='w5 botonMenuSuperior'></div>";
	}
	return codigo;
};

// Marcar actividad de estadísticas de uso
async function marcarUso(deporte,seccion,boton) {
	$.ajax({
		url: "php/marcarUso.php",
		type: 'POST',
		data: {
			deporte: deporte,
			seccion: seccion,
			boton: boton
		},
		error: function(){ marcarUso(deporte,seccion,boton); }
	});
};

// Función para detectar si el dispositivo es iOS
function isIOS() {
  const toMatch = [/iPhone/i, /iPad/i, /iPod/i];
  return toMatch.some(item => {
    return navigator.userAgent.match(item);
  });
}

// Función para saber si s pueden enviar Notificaciones
function comprobarPermisoNotificaciones() {
	if (Notification.permission === 'granted') {
		return true; // Ya ha dado su permiso
	}else {
		return Notification.requestPermission().then(e => e === 'granted');
	}
}
	// Función para enviar Notificaciones
	/*getNotificationPermission()
		.then(isAllowed => {
			if (isAllowed) {
				new Notification('Hola!!!'); // Enviar notificación
			}else{
				// Usuario no ha dado su permiso => guardar esta preferencia en localStore para no preguntar más
			}
		})*/

// Función para que la función de autocompletado funcione dispositivos iOS
function autocomplete(input, list, options, nombreInput) {
  input.addEventListener("input", function() {
    // Eliminar los elementos existentes de la lista de autocompletado
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    // Filtrar las opciones disponibles según lo que el usuario haya escrito en el campo de entrada
    const filteredOptions = options.filter(function(option) {
      return option.label.toLowerCase().includes(input.value.toLowerCase());
    });

    // Generar elementos de lista HTML para las opciones disponibles
    filteredOptions.forEach(function(option) {
      const listItem = document.createElement("li");
      listItem.textContent = option.label;
      listItem.addEventListener("click", function() {
        input.value = option.label;
        switch(nombreInput) {
        case "inputListaJugadores":
        	mostrarDatosJugador(option.value);
        	break;
        case "inputListaClubes":
        	mostrarDatosClub(option.value,sessionStorage.getItem("Deporte"));
        	break;
        case "inputListaTecnicos":
        	mostrarDatosTecnico(option.value);
        	break;
        case "seleccionClubes":
        	mostrarClub(option.value);
        	break;
        }
        list.classList.remove("show");
      });
      list.appendChild(listItem);
    });

    // Mostrar la lista de autocompletado
    if (filteredOptions.length > 0) {
      list.classList.add("show");
    } else {
      list.classList.remove("show");
    }
  });

  // Ocultar la lista de autocompletado cuando se hace clic fuera de ella
  document.addEventListener("click", function(event) {
    if (event.target !== input && event.target !== list) {
      list.classList.remove("show");
    }
  });

  // Agregar listener de eventos al ul para ocultarlo después de la selección de una opción
	list.addEventListener("click", function() {
	  list.style.display = "none";
	});

	// Agregar listener de eventos al input para mostrar la lista de sugerencias al escribir en el input
	input.addEventListener("input", function() {
	  list.style.display = "block";
	});
}





// Borrar datos de localStorage
function borrarDatos(opcion) {
	switch(opcion) {
		case "partido":
			var array = Array("arrayRegistros","BanquilloL","BanquilloV","convocatoria","ConvocatoriaL","ConvocatoriaV","idPartido","jugadoresL","jugadoresV","minuto","segundo","tecnicosL","tecnicosV","tiempoMuertoLocal","tiempoMuertoVisitante","Tipo parada","Tipo pase","TitularesL","TitularesV","totalConvocadosL","totalConvocadosV");
			for (var i = 0; i < array.length; i++) {
				localStorage.removeItem(array[i]);
			}
			break;
	}
};

// Comprobar si hay superioridad numérica al guardar una acción
function superioridad() {
	const sancionesL = localStorage.getItem("sancionadosActualesL") ? JSON.parse(localStorage.getItem("sancionadosActualesL")) : [];
	const sancionesV = localStorage.getItem("sancionadosActualesV") ? JSON.parse(localStorage.getItem("sancionadosActualesV")) : [];
	const diferencia = sancionesL.length - sancionesV.length;
	let superioridad = 0;
	if (diferencia < 0) {		superioridad = 1;	}
	if (diferencia > 0) {		superioridad = 2;	}

	return superioridad;
};

// Mostrar color según la valoración
function colorValoracion(valoracion) {
	let color = "";
	switch(true) {
		case (valoracion < 50):
			color = "debajo";
			break;
		case (valoracion < 60):
			color = "media";
			break;
		case (valoracion < 85):
			color = "encima";
			break;
		case (valoracion >= 85):
			color = "mvp";
			break;
	}
	return color;
}


// Funciones con cookies
function crearCookie(nombreCookie, valorCookie) {
  var expires = "max-age=30000"; //Segundos para que se destruya la cookie
  var path = "path=/; SameSite=none; Secure"; //Ruta en la que se puede utilizar la cookie de modo seguro
  document.cookie = nombreCookie + "=" + valorCookie + "; " + expires + "; " + path;
};

function leerCookie(nombreCookie) {
	var misCookies = document.cookie.split(';');

	if (misCookies.length > 1) {
		for (i in misCookies) {
			var buscar = misCookies[i].search(nombreCookie);
			if (buscar > -1) {
				var cookieRequerida = misCookies[i];
			}
		}

		if (cookieRequerida) {
			var igual = cookieRequerida.indexOf("=");
			var valor = cookieRequerida.substring(igual+1);

			return valor;	
		}
	}
};

function eliminarCookie(nombreCookie) {
  return document.cookie = nombreCookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};



// Funciones de pulsación
function inicioPulsacion(idBoton) {
	var idTag = "#"+idBoton;
	$(idTag).addClass('seleccionable');
};

function finPulsacion(idBoton) {
	const sonido = new Audio('mp3/sonidoToque.mp3');
	sonido.play();

	var idTag = "#"+idBoton;
	setTimeout(function() {
		$(idTag).removeClass('seleccionable');
	}, 125);
};


// Funciones valoraciones
function obtenerValoracionMedia(array) {
	var arrayValoraciones = array.map((z) => Number(z)); // Convertir array de String en array de Number
	let sumaValoraciones = arrayValoraciones.reduce((previous, current) => current += previous); // Sumar todas las valoraciones del array
	let valoracionMedia = Math.round(sumaValoraciones / array.length); // Obtener la valoración media

	return valoracionMedia;
};

// Función convertir valor deporte en texto
function valorDeporte(valor) {
	var array = Array("","Balonmano","Baloncesto","Futsal");
	var respuesta = array[valor];
		
	return respuesta;
};
function numeroDeporte(texto) {
	switch(texto) {
		case "Balonmano":
		case "BM":
			var respuesta = 1;
			break;
		case "Baloncesto":
		case "BL":
			var respuesta = 2;
			break;
		case "Futsal":
		case "FS":
			var respuesta = 3;
			break;
	}		
	return respuesta;
};

function valorCompeticion(deporte,valor) {
	switch(deporte) {
		case "1":
			var array = Array("","Liga Sacyr Asobal","Liga Guerreras Iberdrola","División de Honor Plata","División de Honor Plata","División de Honor Plata","División de Honor Plata","División de Honor Plata","División de Honor Plata","Primera Nacional","Primera Nacional","Primera Nacional","Primera Nacional","Primera Nacional","Primera Nacional");
			break;
		case "2":
			var array = Array("","Primer Equipo","Segundo Equipo","Equipo Senior","Deporte Adaptado",""); //////////////////////////////// Baloncesto
			break;
		case "3":
			var array = Array("","Primer Equipo","Segundo Equipo","Equipo Senior","Deporte Adaptado",""); //////////////////////////////// Futsal
			break;
	}
	var respuesta = array[valor];
		
	return respuesta;
};

// Buscar id del jugador por el dorsal
function jugador(equipo,dorsal) {
	const labelEquipo = "jugadores"+equipo;
	let id = 0;
	if (sessionStorage.getItem(labelEquipo) && sessionStorage.getItem(labelEquipo) !== null) {
		const listaJugadores = JSON.parse(sessionStorage.getItem(labelEquipo));
		if (listaJugadores !== null) {
			for (var k = listaJugadores.length - 1; k >= 0; k--) {
				if (dorsal == listaJugadores[k].Dorsal) {
					id = listaJugadores[k].ID_Jugador;
				}
			}		
		}
	}
	return id;
};

// Buscar dorsal del jugador por el id
function jugadorDorsal(equipo,id) {
	const labelEquipo = "jugadores"+equipo;
	const listaJugadores = JSON.parse(sessionStorage.getItem(labelEquipo));
	var dorsal = 0;
	if (listaJugadores) {
		for (var k = listaJugadores.length - 1; k >= 0; k--) {
			if (id == listaJugadores[k].ID_Jugador) {
				dorsal = listaJugadores[k].Dorsal;
			}
		}
	}
	return dorsal;
};

function leerDatosUsuario(dato) {
	const token = leerCookie("_token");

	const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
	    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
	const json = JSON.parse(jsonPayload);

	let respuesta = "";
	switch(dato) {
		case "Inicio":
			respuesta = json.iat;
			break;
		case "Fin":
			respuesta = json.exp;
			break;
		case "Usuario":
			respuesta = json.data.Usuario;
			break;
		case "Tipo":
			respuesta = json.data.TipoUsuario;
			break;
		case "ID":
			respuesta = json.data.IDUsuario;
			break;
		case "EstadoBM":
			respuesta = json.data.EstadoBM;
			break;
		case "EstadoBL":
			respuesta = json.data.EstadoBL;
			break;
		case "EstadoFS":
			respuesta = json.data.EstadoFS;
			break;

	}
  return respuesta;
}

function permisoEstado(deporte) {
	let estado = "";
	switch (deporte) {
	case "1":
		estado = leerDatosUsuario("EstadoBM") == "0" || leerDatosUsuario("EstadoBM") == "7" ? " noOperativo" : "";
		break;
	case "2":
		estado = leerDatosUsuario("EstadoBL") == "0" || leerDatosUsuario("EstadoBL") == "7" ? " noOperativo" : "";
		break;
	case "3":
		estado = leerDatosUsuario("EstadoFS") == "0" || leerDatosUsuario("EstadoFS") == "7" ? " noOperativo" : "";
		break;
	}
	return estado;
}

function estadoUsuarioPro() {
	let labelDeporte = "Estado";
	switch(sessionStorage.getItem("Deporte")) {
	case "1":
		labelDeporte += "BM";
		break;
	case "2":
		labelDeporte += "BL";
		break;
	case "3":
		labelDeporte += "FS";
		break;
	}
	let tipoUsuario = leerDatosUsuario(labelDeporte);
	if (tipoUsuario == "1" || tipoUsuario == "2" || tipoUsuario == "3" || tipoUsuario == "4" || tipoUsuario == "6") {
		return "pro";
	}else{
		return "basico";
	}
}


/////////////////////////////////////////////////////////////////////////////////////////////////////
// Vibración (en dispositivos que esté disponible)
/*
window.navigator.vibrate([200, 50, 200]);
*/


// Botón compartir en dispositivos
/*
navigator.share({
	title: 'Mi página',
	text: 'Sub texto',
	url: 'https://blog.example.com/1',
});
*/


// Abrir cámara en dispositivos
/*
navigator.mediaDevices.getUserMedia({
	video: true,
	audio: false
}).then(stream => {
	// Uso stream del vídeo
})
*/


/////////////////////////////////////////////////////////////////////////////////////////////////////
// Reconocimiento de voz
var recognizing = false; // Variable global para identificar cuándo está hablando y cuándo no
if (!('webkitSpeechRecognition' in window)) { // Ver si está disponible la API en este navegador
	//alert("¡API no soportada!");
	//document.getElementById("logoMicro").src = "img/Captura/mudo.png";
}else{
	// Crear evento
	const recognition = new webkitSpeechRecognition();

	// Añadir características
	recognition.lang = 'es-ES'; // Idioma que escucha (Español de España)
	recognition.continuous = 'true'; // true: si el usuario deja de hablar, entonces acaba y deja de escuchar

	// Qué hace al escuchar
	recognition.onstart = function() {  // Al empezar a escuchar
		recognizing = true;
		console.log("empezando a escuchar");
	};
	
	recognition.onerror = function(event) {} // Si ha ocurrido un error;
  
  recognition.onend = function() { // Al dejar de hablar
  	recognizing = false;
		//document.getElementById("procesar").innerHTML = "Escuchar";
		console.log("terminó de escuchar, llegó a su fin");
  }

	recognition.onresult = event => { // Al recibir los datos de la API

		//VERSION 1 (¿para 1 rsultado?)
		for (const result of event.results) {
			console.log(result[0].transcript); // Aquí se pone qué hace al escuchar
		}

		//VERSION 2 (¿para varios resultados?)
		/*
		for (var i = event.resultIndex; i < event.results.length; i++) {
			if(event.results[i].isFinal)
				document.getElementById("texto").value += event.results[i][0].transcript;
		    }
			
			//texto
		}
		*/

		/*
		si vas a crear comandos simples puedes comparar el texto devuelto por el usuario completamente, si te interesa agarrar palabras claves, puedes emplear la función indexOf provista por la API de JavaScript; sin son varios comandos, pues usas un switch o un if agrupado; todas estas consideraciones las debes tomar en la función onresult
		*/
	};

	/*
	ESTRUCTURA DE LA API RECIBIDA

	{
	  ..
	  results: {
	    0: {
	      0: {
	        confidence: 0.6...,
	        transcript: "Hola"
	      },
	      isFinal:true,      ===> Indica que es el último párrafo recibido
	      length:1
	    },
	    length:1
	  },
	  ..
	}

	*/

	/*
	// Inicia a escuchar
	recognition.start();
	*/
}

function escuchar() {   //////////////////////// FUNCION PARA PEDIR QUE haga proceso de ESCUCHAR
	if (recognizing == false) { // Si no estaba escuchando, comienza a escuchar
		recognition.start();
		recognizing = true;
		document.getElementById("logoMicro").src = "img/Captura/microON.png";
		//document.getElementById("procesar").innerHTML = "Detener";
	} else { // Si estaba escuchando, deja de escuchar
		recognition.stop();
		recognizing = false;
		document.getElementById("logoMicro").src = "img/Captura/microOFF.png";
		//document.getElementById("procesar").innerHTML = "Escuchar";
	}
};

/*
		VER SI HAY PROBLEMAS CON EL TEMA DE PEDIR PERMISOS PARA PODER UTILIZAR EL MICRÓFONO DEL DISPOSITIVO

		· ¿Qué es mejor?:
			1. Darle un botón para indicar que escuche mientras lo tienes apretado (al soltarlo deja de escuchar)
			2. Darle a un botón cada vez que quieras que inicie una escucha (al detectar que ha parado la frase, se finaliza la escucha)
			3. Darle a un botón para iniciar escuchar de forma ininterrumpida, y luego le das a otro botón para finalizar la escucha initerrumpida
*/
/////////////////////////////////////////////////////////////////////////////////////////////////////