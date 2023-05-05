<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="HandheldFriendly" content="true">
	<meta name="author" content="Jambitec">
	<meta name="description" content="La mejor manera de aplicar el Big Data a los deporte de sala">
	<meta name="theme-color" content="#a557d8">

	<script src="js/main.js"></script>
	<script src="js/jquery.js"></script>
	<script src="js/world.js"></script>
	<script src="js/publicidad.js"></script>
	<link rel="stylesheet" type="text/css" href="css/estilo.css">

	<link rel="shortcut icon" href="/favicon.ico">
	<link rel="manifest" href="manifest.json">
	<link rel="apple-touch-icon" href="img/Menu/apple-touch-icon.png">

	<title>BigDT&#169; - Login</title>
</head>
<body>
	<div id="bodyIndex" class="spaceAroundXY">
		<div id="cuadroIdiomas" class="centradoInlineXY movimientoCuadroIdiomas">
			<div id="idiomaActual" class="centradoXY">
			</div>
			<div id="cajaIdiomas" class="spaceAroundXY invisible">
				<img class="logoIdioma w90" src="img/Idiomas/es.png" onclick="elegirIdioma('index','es-ES')" alt="Español">
				<img class="logoIdioma w90" src="img/Idiomas/en.png" onclick="elegirIdioma('index','en')" alt="English">
				<img class="logoIdioma w90" src="img/Idiomas/fr.png" onclick="elegirIdioma('index','fr')" alt="Français">
				<img class="logoIdioma w90" src="img/Idiomas/de.png" onclick="elegirIdioma('index','de')" alt="Deutsch">
			</div>
		</div>

		<picture id="imagenIzq" class="imagenPortada movimientoImagenIzq movimientoImagenPortada">
			<source media="(min-height:900px)" srcset="img/Menu/Futsal.avif" type="image/avif">
			<img src="img/Menu/Futsal.png" alt="Icono Futsal" class="h100 w100">
		</picture>
		<picture>
			<!-- Falta source con avif  -->
			<img id="imagenCentro" class="imagenPortada movimientoImagenCentro movimientoImagenPortada" src="img/Menu/Balonmano.png" alt="Icono Balonmano">
		</picture>
		<picture>
			<!-- Falta source con avif  -->
			<img id="imagenDer" class="imagenPortada movimientoImagenDer movimientoImagenPortada" src="img/Menu/Baloncesto.png" alt="Icono Baloncesto">
		</picture>

		<img id="imagenLogo" class="movimientoImagenLogo" src="img/Menu/Logo_BigDT.png" alt="BigDT&#169;">
		<div id="recuadroLogin" class="centradoXY animacionRecuadroLogin">
			<div id="cuadroLogin" class="h100 w100"></div>
			<div id="cuadroRegistro" class="h100 w100 centradoXY flexWrap invisible">
				
			</div>
		</div>

		<div id="pantallaTerminos" class="h100 w100 centradoXY flexWrap invisible">
			<div class="h10 w40 centradoXY">
				<img class="h50" src="img/Menu/boton_salir.png" onclick="cerrarTerminos()" alt="salir">
			</div>
			<div id="recuadroTerminos" class="h70 w80">
			</div>
		</div>

		<div id="recuadroCookies">
			<img src="img/Menu/boton_salir.png" onclick="aceptarCookies()" alt="Aceptar Cookies">
			<div id="textoCookies" class="centradoXY flexWrap"></div>
		</div>
		<footer id="pieIndex">
			
		</footer>
	</div>

<script>
	$(function(){
		idiomaActual("index");
		publiIndex();
	});

	function comprobarPermisoCookies() {
		if (localStorage.getItem("Permiso Cookies")) {
			$("#recuadroCookies").addClass("invisible");
		}else {
			$("#recuadroCookies").removeClass("invisible");

			var textoIdioma = textoIndex();

			var textoCookies = "<h1>"+textoIdioma[8]+"</h1>";
			textoCookies += "<p id='parrafo1'>"+textoIdioma[9]+"</p>";
			textoCookies += "<p id='parrafo2'>"+textoIdioma[10]+"</p>";

			$("#textoCookies").html(textoCookies);
			$("#textoCookies").show();
		}
	};

	function aceptarCookies() {
		// Guardar datos en Local Storage
		localStorage.setItem("Permiso Cookies", "Aceptado");

		$("#recuadroCookies").addClass("invisible");
	};

	function mostrarCuadroLogin() {
		var textoIdioma = textoIndex();

		var texto = "	<form action='php/usuario.php' method='post' class='h100 w100 spaceAroundXY flexWrap'>";
		texto += "			<div class='w80 h20 boxLogin spaceBetweenXY'>"; //usuario
		texto += "					<img class='w15 h90' src='img/Menu/logoUsuario.png' alt='Icono Usuario'>";
		texto += "					<input id='usuario' name='usuario' class='w85 h55' type='text' pattern='[a-zA-Z0-9]+' placeholder='"+textoIdioma[0]+"' autocomplete='on'>";
		texto += "			</div>";
		texto += "			<div class='w80 h20 boxLogin spaceBetweenXY'>"; //contraseña
		texto += "					<img class='h90 w15' src='img/Menu/logoPass.png' alt='Contraseña'>";
		texto += "					<input id='pass' name='pass' class='w70 h55' type='password' placeholder='"+textoIdioma[1]+"' autocomplete='on'>";
		texto += "					<div id='ojo' class='w10'>";
		texto += "						<img id='ojoSi' class='w100' src='img/Menu/invisible.png' alt='Ocultar'>";
		texto += "						<img id='ojoNo' class='w100 invisible' src='img/Menu/visible.png' alt='Mostrar'>";
		texto += "					</div>";
		texto += "			</div>";
		texto += "			<button class='w80 h20'>"+textoIdioma[2]+"</button>"; //Botón acceder
		texto += "			<div class='h10 w100 spaceAroundXY'>";
		texto += "				<div id='botonRecordar' class='w40 h90 flexWrap spaceAroundXY pulsable' onclick='recordarPass()'>"+textoIdioma[4]+"</div>";
		texto += "				<div id='botonRegistro' class='w40 h90 flexWrap spaceAroundXY pulsable' onclick='menuRegistro()'>"+textoIdioma[3]+"</div>";
		texto += "			</div>";
		<?php
			if (isset($_GET['error'])){
			  if ($_GET['error'] == 'si') {
			    ?>
		//texto += "	    <label class='mensajeError'><br><br><b style='color: red;'>Usuario y/o contraseña incorrectos. Por favor, intentalo de nuevo</b></label>";
			    <?
			  }elseif ($_GET['error'] == 'fuera') {
			  	?>
			  	$("#recuadroLogin").removeClass("animacionRecuadroLogin");
			  	$("#imagenIzq").removeClass("movimientoImagenIzq");
			  	$("#imagenDer").removeClass("movimientoImagenDer");
			  	$("#imagenCentro").removeClass("movimientoImagenCentro");
			  	$("#imagenLogo").removeClass("movimientoImagenLogo");
			  	$("#cuadroIdiomas").removeClass("movimientoCuadroIdiomas");
			  	$("#imagenIzq").addClass("imagenIzq");
			  	$("#imagenCentro").addClass("imagenCentro");
			  	$("#imagenDer").addClass("imagenDer");

			  	$("#cuadroLogin").addClass("shake");
			  	<?
		/*	    ?>
		//texto += "	    <label class='mensajeError'><br><br><b style='color: red;'>Para poder visualizar esta página debe iniciar sesión</b></label>";
			    <?*/
			  }elseif ($_GET['error'] == 'usuario') {
			    ?>
			    $("#recuadroLogin").removeClass("animacionRecuadroLogin");
			  	$("#imagenIzq").removeClass("movimientoImagenIzq");
			  	$("#imagenDer").removeClass("movimientoImagenDer");
			  	$("#imagenCentro").removeClass("movimientoImagenCentro");
			  	$("#imagenLogo").removeClass("movimientoImagenLogo");
			  	$("#cuadroIdiomas").removeClass("movimientoCuadroIdiomas");
			  	$("#imagenIzq").addClass("imagenIzq");
			  	$("#imagenCentro").addClass("imagenCentro");
			  	$("#imagenDer").addClass("imagenDer");

			  	$("#cuadroLogin").addClass("shake");
				texto += "	    <label class='mensajeError'><br><br><b style='color: red;'>Debe introducir un nombre de usuario correcto</b></label>";
			    <?
			  }elseif ($_GET['error'] == 'pass') {
			    ?>
			    $("#recuadroLogin").removeClass("animacionRecuadroLogin");
			  	$("#imagenIzq").removeClass("movimientoImagenIzq");
			  	$("#imagenDer").removeClass("movimientoImagenDer");
			  	$("#imagenCentro").removeClass("movimientoImagenCentro");
			  	$("#imagenLogo").removeClass("movimientoImagenLogo");
			  	$("#cuadroIdiomas").removeClass("movimientoCuadroIdiomas");
			  	$("#imagenIzq").addClass("imagenIzq");
			  	$("#imagenCentro").addClass("imagenCentro");
			  	$("#imagenDer").addClass("imagenDer");

			  	$("#cuadroLogin").addClass("shake");
				texto += "	    <label class='mensajeError'><br><br><b style='color: red;'>Debe introducir una contraseña correcta</b></label>";
			    <?
			  }elseif ($_GET['error'] == 'time') {
			    ?>
				texto += "	    <label class='mensajeError'><br><br><b style='color: red;'>Sesión finalizada por inactividad</b></label>";
			    <?
			  }elseif ($_GET['error'] == 'cerrar') {
			    ?>
				texto += "	    <label style='color: green;' class='mensajeError'><br><br><b>La sesión se ha cerrado correctamente</b></label>";
			    <?
			  }
			}
		?>
		texto += "		</form>";

		$("#cuadroLogin").html(texto);
		$("#cuadroLogin").show();

		// Ver/Ocultar contraseña
		const ojo = document.querySelector("#ojo");
		const input = document.querySelector("#pass");

		ojo.addEventListener("click", () => {
			// Si la contraseña está oculta
			if (input.type === "password") {
				input.type = "text";
				$("#ojoSi").addClass("invisible");
				$("#ojoNo").removeClass("invisible");
			}else {
				// La contraseña es visible
				input.type = "password";
				$("#ojoNo").addClass("invisible");
				$("#ojoSi").removeClass("invisible");
			}
		}, 500);
	};

	function menuRegistro() {
		var textoIdioma = textoIndex();

		var texto = "	<div class='w100 h20 flexWrap spaceAroundXY'>";
		texto += "			<label id='tituloLogin'>"+textoIdioma[5]+"</label>";
		texto += "		</div>";
		texto += "		<div id='formularioNuevoUsuario' class='h80 centradoXY flexWrap' method='POST'>";
		texto += "			<div class='w90 h15 spaceBetweenXY boxRegistro'>"; //usuario
		texto += "				<img class='w10' src='img/Menu/logoUsuario.png' alt='Usuario'>";
		texto += "				<input id='nuevoUsuario' class='w80' name='nuevoUsuario' type='text' placeholder='"+textoIdioma[0]+"' pattern='[a-zA-Z0-9]+' required>";
		texto += "			</div>";
		texto += "			<div class='w90 h15 spaceBetweenXY boxRegistro'>"; //contraseña
		texto += "				<img class='w10' src='img/Menu/logoPass.png' alt='Contraseña'>";
		texto += "				<input id='nuevoPass' class='w80' name='nuevoPass' type='text' placeholder='"+textoIdioma[1]+"' required>";
		texto += "			</div>";
		texto += "			<div class='w90 h15 spaceBetweenXY boxRegistro'>"; //email
		texto += "				<img class='w10' src='img/Menu/email.png' alt='Email'>";
		texto += "				<input id='nuevoEmail' class='w80' name='nuevoEmail' type='email' placeholder='Email' required pattern='[^@]+@[^@]+\\.[a-zA-z]{2,6}'>";
		texto += "			</div>";
		texto += "			<div class='w100 h15 spaceAroundXY'>"; //contrato condiciones
		texto += "				<input id='aceptarCondicionesGenerales' type='checkbox' name='aceptarCondicionesGenerales' class='w10 h60' onclick=\"aceptarCondiciones()\"><label for='aceptarCondicionesGenerales'>Aceptar los <strong class='pulsable' onclick=\"verTerminos()\">Terminos y Condiciones</strong></label>";
		texto += "			</div>";
		texto += "			<div class='w100 h15 flexWrap spaceAroundXY'>"; //botones
		texto += "				<button class='w40 h80 error' type='button' onclick=\"cancelarRegistro()\">"+textoIdioma[6]+"</button>"; //Botón cancelar
		texto += "				<button id='botonGuardarRegistro' class='w40 h80 acierto noOperativo' type='submit' onclick=\"guardarRegistro()\">"+textoIdioma[3]+"</button>"; //Botón registrarse
		texto += "				</div>";
		texto += "		</div> ";


		$("#cuadroLogin").fadeOut();
		$("#cuadroRegistro").html(texto);
		$("#cuadroRegistro").removeClass("invisible");
		$("#cuadroIdiomas").addClass("invisible");
	};
		function aceptarCondiciones() {
			let valor = document.getElementById("aceptarCondicionesGenerales").checked;
			if (valor == true) {
				document.getElementById("botonGuardarRegistro").classList.remove("noOperativo");
			}else{
				document.getElementById("botonGuardarRegistro").classList.add("noOperativo");
			}
		};
		function guardarRegistro() {
			var usuario = document.getElementById("nuevoUsuario").value;
			var pass = document.getElementById("nuevoPass").value;
			var email = document.getElementById("nuevoEmail").value;

			if (usuario !== "" && pass !== "" && email !== "") {
				$.ajax({
					type: 'POST',
					url: 'php/nuevoUsuario.php',
					data: {
						usuario: usuario,
						pass: pass,
						email: email,
						idioma: localStorage.getItem("idioma")
					},

					success: function(res){
						if(res == 1){
					    	// vaciar inputs
					    	$("#cuadroRegistro").addClass("invisible");
							$("#cuadroIdiomas").removeClass("invisible");
					    	$("#cuadroLogin").fadeIn();
					    }else {
					    	$("#cuadroRegistro").addClass("shake");
					    }
					}
				});			
			}else {
				$("#cuadroRegistro").addClass("shake");
			}
		};
		function cancelarRegistro() {
			$("#cuadroRegistro").addClass("invisible");
			$("#cuadroLogin").removeClass("invisible");
			$("#cuadroLogin").fadeIn();
			$("#cuadroIdiomas").removeClass("invisible");
		};
		function verTerminos() {
			var textoIdioma = textoCondiciones();
			document.getElementById("pantallaTerminos").classList.remove("invisible");
			document.getElementById("recuadroTerminos").innerHTML = textoIdioma;
		};
		function cerrarTerminos() {
			document.getElementById("pantallaTerminos").classList.add("invisible");
		};
</script>
</body>
</html>