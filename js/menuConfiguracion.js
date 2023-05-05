// Funciones menú usuario seleccionar cambiarNuevaSuscripcion
function mostrarAjustesUsuario(opcion) {
	var textoIdioma = textoMenuConfiguracion(); // Tomar idioma
	var codigoLabel = "<label>"+textoIdioma[0]+"</label>"; // Label Ajustes Usuario
	document.getElementById("loaderAjustes").classList.add("loader");
	$.ajax({
		url: "php/datosMenuUsuario.php",
		type: 'POST',
		success: function(res){
			document.getElementById("loaderAjustes").classList.remove("loader");
			let js= JSON.parse(res),
		        estadoBM = leerDatosUsuario("EstadoBM"),
		        estadoBL = leerDatosUsuario("EstadoBL"),
		        estadoFS = leerDatosUsuario("EstadoFS"),
		        tipoUsuario = leerDatosUsuario("Tipo"),
		        archivoTipoUsuario = "",
		        nombreTipoUsuario = "";

			// Contenido
			var codigoUsuario = "	<div id='vacioUsuario' class='w35'></div>";
			codigoUsuario += "		<div id='nombreUsuario' class='spaceAroundXY w30'>";
			codigoUsuario += "			<label class='w70 bordeCaja'>"+leerDatosUsuario("Usuario")+"</label>";
			codigoUsuario += "			<img id='botonEditarUsuario' class='w30' src='img/Menu/editar.png' alt='Editar' ontouchstart='inicioPulsacion('botonEditarUsuario')' ontouchend='finPulsacion('botonEditarUsuario')'>";
			codigoUsuario += "		</div>";
			switch(tipoUsuario) {
			case "1":
				archivoTipoUsuario = "edicionClub.png";
				nombreTipoUsuario = "Club";
				break;
			case "2":
				archivoTipoUsuario = "edicionTecnicos.png";
				nombreTipoUsuario = nombreSuscripcion(4);
				break;
			case "3":
				archivoTipoUsuario = "edicionJugadores.png";
				nombreTipoUsuario = nombreSuscripcion(5);
				break;
			default:
				archivoTipoUsuario = "Logo_BigDT_Blanco.png";
				nombreTipoUsuario = nombreSuscripcion(7);
				break;
			}
			codigoUsuario += "		<div id='tipoUsuario' class='h70 centradoXY pulsable' title='"+textoIdioma[7]+" "+nombreTipoUsuario+"'>";
			codigoUsuario += "			<img class='h60' src='img/Menu/"+archivoTipoUsuario+"' alt='Icono'>";
			codigoUsuario += "		</div>";
			codigoUsuario += "		<div id='cerrarSesion' class='w10 h80 centradoXY flexWrap' onclick=\"cerrarSesion()\" ontouchstart=\"inicioPulsacion('cerrarSesion')\" ontouchend=\"finPulsacion('cerrarSesion')\">";
			codigoUsuario += "			<img class='w70 h70' src='img/Menu/cerrar-sesion.png' alt='Exit'>";
			codigoUsuario += "			<label>"+textoIdioma[1]+"</label>";
			codigoUsuario += "		</div>";

			var codigoCompras = "	<div id='suscripciones' class='w45 h90 recuadrosCompras centradoXY flexWrap bordeCaja'>";
			codigoCompras += "			<label class='w100 h15 titulosLabel'>"+textoIdioma[2]+"</label>";
			codigoCompras += "			<div class='w100 h25 spaceAroundXY bordeSuperior'>";
			codigoCompras += "				<div class='h90 w30 centradoXY'><label>"+textoDeportes(1)+"</label></div>";
			codigoCompras += "				<div class='h100 w40 centradoXY'><label class='labelEstado "+nombreSuscripcion(estadoBM,0)+"'>"+nombreSuscripcion(estadoBM)+"</label></div>";
			codigoCompras += "				<img class='w10' src='img/Clubes/Clubes/"+js.EscudoClubBalonmano+"' alt='Club' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
			codigoCompras += "				<div class='h100 w10 centradoXY pRelativo'><div id='notificacionEditarBM'></div><img id='botonEditarSuscripBalonmano' class='w60' src='img/Menu/editar.png' alt='Edit' onclick=\"editarSuscripcion(1)\" ontouchstart=\"inicioPulsacion('botonEditarSuscripBalonmano')\" ontouchend=\"finPulsacion('botonEditarSuscripBalonmano')\"></div>";
			codigoCompras += "			</div>";
			codigoCompras += "			<div class='w100 h25 spaceAroundXY'>";
			codigoCompras += "				<div class='h100 w30 centradoXY'><label>"+textoDeportes(2)+"</label></div>";
			codigoCompras += "				<div class='h100 w40 centradoXY'><label class='labelEstado "+nombreSuscripcion(estadoBL,0)+"'>"+nombreSuscripcion(estadoBL)+"</label></div>";
			codigoCompras += "				<img class='w10' src='img/Clubes/Clubes/"+js.EscudoClubBaloncesto+"' alt='Club' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
			codigoCompras += "				<div class='h100 w10 centradoXY pRelativo'><div id='notificacionEditarBL'></div><img id='botonEditarSuscripBaloncesto' class='w60' src='img/Menu/editar.png' alt='Edit' ontouchstart=\"inicioPulsacion('botonEditarSuscripBaloncesto')\" ontouchend=\"finPulsacion('botonEditarSuscripBaloncesto')\"></div>";
			codigoCompras += "			</div>";
			codigoCompras += "			<div class='w100 h25 spaceAroundXY'>";
			codigoCompras += "				<div class='h100 w30 centradoXY'><label>"+textoDeportes(3)+"</label></div>";
			codigoCompras += "				<div class='h100 w40 centradoXY'><label class='labelEstado "+nombreSuscripcion(estadoFS,0)+"'>"+nombreSuscripcion(estadoFS)+"</label></div>";
			codigoCompras += "				<img class='w10' src='img/Clubes/Clubes/"+js.EscudoClubFutsal+"' alt='Club' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
			codigoCompras += "				<div class='h100 w10 centradoXY pRelativo'><div id='notificacionEditarFS'></div><img id='botonEditarSuscripFutsal' class='w60' src='img/Menu/editar.png' alt='Edit' ontouchstart=\"inicioPulsacion('botonEditarSuscripFutsal')\" ontouchend=\"finPulsacion('botonEditarSuscripFutsal')\"></div>";
			codigoCompras += "			</div>";
			codigoCompras += "		</div>";

			codigoCompras += "		<div id='favoritos' class='w45 h90 recuadrosCompras centradoXY flexWrap bordeCaja'>";
			codigoCompras += "			<label class='w100 h15 titulosLabel'>"+textoIdioma[3]+"</label>";
			codigoCompras += "			<div class='w100 h25 spaceAroundXY bordeSuperior'>";
			codigoCompras += "				<div class='w10 h50 centradoXY pulsable' onclick=\"marcarDeporteFavorito(1)\">";
			codigoCompras += "					<img id='imgDeporteFav1' class='h50' src='img/Menu/favorito0.png' alt='Fav' ontouchstart=\"inicioPulsacion('imgDeporteFav1')\" ontouchend=\"finPulsacion('imgDeporteFav1')\" style='transition: width 1s'>";
			codigoCompras += "				</div>";
			codigoCompras += "				<div class='w25 centradoXY'><label>"+textoDeportes(1)+"</label></div>";
			codigoCompras += "				<div id='favoritoBM' class='h80 w55 spaceAroundXY recuadroFavorito'>";
			const escudoFavBM = js.EscudoFavBalonmano == null ? "img/Clubes/Clubes/defecto.png" : "img/Clubes/Balonmano/Equipos/"+js.EscudoFavBalonmano;
			codigoCompras += "				<img class='w20 h80' src='"+escudoFavBM+"'>";
			const nombreFavBM = js.FavBalonmano == null ? "- - - - -" : js.FavBalonmano;
			codigoCompras += "				<label class='w70'>"+nombreFavBM+"</label>";
			codigoCompras += "				</div>";
			codigoCompras += "				<div id='elegirFavBM' class='h80 w55 spaceAroundXY recuadroFavorito invisible'></div>";
			codigoCompras += "				<div id='cuadroBotonFavBM' class='w10 centradoXY'>";
			codigoCompras += "					<img id='botonEditarFavBM' class='w60' src='img/Menu/editar.png' alt='Edit' onclick=\"seleccionarEquipoFavorito('BM')\" ontouchstart=\"inicioPulsacion('botonEditarFavBM')\" ontouchend=\"finPulsacion('botonEditarFavBM')\">";
			codigoCompras += "					<img id='botonEditarElegirBM' class='w60 invisible' src='img/Menu/guardar.png' alt='guardar' onclick=\"guardarEquipoFavorito('BM')\" ontouchstart=\"inicioPulsacion('botonEditarElegirBM')\" ontouchend=\"finPulsacion('botonEditarElegirBM')\">";///////
			codigoCompras += "				</div>";
			codigoCompras += "			</div>";
			codigoCompras += "			<div class='w100 h25 spaceAroundXY'>";
			codigoCompras += "				<div class='w10 h50 centradoXY pulsable' onclick=\"marcarDeporteFavorito(2)\">";
			codigoCompras += "					<img id='imgDeporteFav2' class='h50' src='img/Menu/favorito0.png' alt='Fav' ontouchstart=\"inicioPulsacion('imgDeporteFav2')\" ontouchend=\"finPulsacion('imgDeporteFav2')\" style='transition: width 1s'>";
			codigoCompras += "				</div>";
			codigoCompras += "				<div class='w25 centradoXY'><label>"+textoDeportes(2)+"</label></div>";
			codigoCompras += "				<div id='favoritoBL' class='h80 w55 spaceAroundXY recuadroFavorito'>";
			const escudoFavBL = js.EscudoFavBaloncesto == null ? "img/Clubes/Clubes/defecto.png" : "img/Clubes/Baloncesto/Equipos/"+js.EscudoFavBaloncesto;
			codigoCompras += "				<img class='w20 h80' src='"+escudoFavBL+"'>";
			const nombreFavBL = js.FavBaloncesto == null ? "- - - - -" : js.FavBaloncesto;
			codigoCompras += "				<label class='w70'>"+nombreFavBL+"</label>";
			codigoCompras += "				</div>";
			codigoCompras += "				<div id='elegirFavBL' class='h80 w55 spaceAroundXY recuadroFavorito invisible'></div>";
			codigoCompras += "				<div id='cuadroBotonFavBL' class='w10 centradoXY'>";
			codigoCompras += "					<img id='botonEditarFavBL' class='w60' src='img/Menu/editar.png' alt='Edit' ontouchstart=\"inicioPulsacion('botonEditarFavBL')\" ontouchend=\"finPulsacion('botonEditarFavBL')\">";
			codigoCompras += "					<img id='botonEditarElegirBL' class='w60 invisible' src='img/Menu/guardar.png' alt='guardar' ontouchstart=\"inicioPulsacion('botonEditarElegirBL')\" ontouchend=\"finPulsacion('botonEditarElegirBL')\">";///////
			codigoCompras += "				</div>";
			codigoCompras += "			</div>";
			codigoCompras += "			<div class='w100 h25 spaceAroundXY'>";
			codigoCompras += "				<div class='w10 h50 centradoXY pulsable' onclick=\"marcarDeporteFavorito(3)\">";
			codigoCompras += "					<img id='imgDeporteFav3' class='h50' src='img/Menu/favorito0.png' alt='Fav' ontouchstart=\"inicioPulsacion('imgDeporteFav3')\" ontouchend=\"finPulsacion('imgDeporteFav3')\" style='transition: width 1s'>";
			codigoCompras += "				</div>";
			codigoCompras += "				<div class='w25 centradoXY'><label>"+textoDeportes(3)+"</label></div>";
			codigoCompras += "				<div id='favoritoFS' class='h80 w55 spaceAroundXY recuadroFavorito'>";
			const escudoFavFS = js.EscudoFavFutsal == null ? "img/Clubes/Clubes/defecto.png" : "img/Clubes/Futsal/Equipos/"+js.EscudoFavFutsal;
			codigoCompras += "				<img class='w20 h80' src='"+escudoFavFS+"'>";
			const nombreFavFS = js.FavFutsal == null ? "- - - - -" : js.FavFutsal;
			codigoCompras += "				<label class='w70'>"+nombreFavFS+"</label>";
			codigoCompras += "				</div>";
			codigoCompras += "				<div id='elegirFavFS' class='h80 w55 spaceAroundXY recuadroFavorito invisible'></div>";
			codigoCompras += "				<div id='cuadroBotonFavFS' class='w10 centradoXY'>";
			codigoCompras += "					<img id='botonEditarFavFS' class='w60' src='img/Menu/editar.png' alt='Edit' ontouchstart=\"inicioPulsacion('botonEditarFavFS')\" ontouchend=\"finPulsacion('botonEditarFavFS')\">";
			codigoCompras += "					<img id='botonEditarElegirFS' class='w60 invisible' src='img/Menu/guardar.png' alt='guardar' ontouchstart=\"inicioPulsacion('botonEditarElegirFS')\" ontouchend=\"finPulsacion('botonEditarElegirFS')\">";///////
			codigoCompras += "				</div>";
			codigoCompras += "			</div>";
			codigoCompras += "		</div>";

			var codigoCopy = "	<div class='h100 w80 spaceAroundXY flexWrap'>";
			codigoCopy += "			<button id='botonCopyConoce' class='w15 h50' ontouchstart=\"inicioPulsacion('botonCopyConoce')\" ontouchend=\"finPulsacion('botonCopyConoce')\">"+textoIdioma[4]+"</button>";
///////////////////////////////////////////////// Botón para ventanas de ayuda: si/no
			codigoCopy += "			<button id='botonCopyTutorial' class='w15 h50 noSeleccionado' onclick=\"activarAyudas()\" ontouchstart=\"inicioPulsacion('botonCopyTutorial')\" ontouchend=\"finPulsacion('botonCopyTutorial')\">"+textoIdioma[5]+"</button>";
/////////////////////////////////////////////////
			codigoCopy += "			<button id='botonCopyLegal' class='w15 h50' onclick=\"mostrarLegal()\" ontouchstart=\"inicioPulsacion('botonCopyLegal')\" ontouchend=\"finPulsacion('botonCopyLegal')\">"+textoIdioma[6]+"</button>";
			codigoCopy += "		</div>";
			codigoCopy += "		<div class='h100 w20 centradoXY'>";
			codigoCopy += "			<img class='h80 w80' src='img/Menu/Logo_BigDT.png'>";
			codigoCopy += "		</div>";

			$("#ajustesLabel").html(codigoLabel);
			$("#ajustesLabel").show();
			$("#ajustesUsuario").html(codigoUsuario);
			$("#ajustesUsuario").show();
			$("#ajustesCompras").html(codigoCompras);
			$("#ajustesCompras").show();
			$("#ajustesCopy").html(codigoCopy);
			$("#ajustesCopy").show();

			cambiarIconoDeporteFavorito(localStorage.getItem("DeporteFav"));

			if (opcion == "ayuda") {
				abrirAyuda("configuracion");
			}

			switch(sessionStorage.getItem("Deporte")) {
			case "1":
				estadoActual = estadoBM == "0" ? "BM" : 0;
				break;
			case "2":
				estadoActual = estadoBL == "0" ? "BL" : 0;
				break;
			case "3":
				estadoActual = estadoFS == "0" ? "FS" : 0;
				break;
			}
			if (estadoActual !== 0) {
				let label = "notificacionEditar"+estadoActual;
				document.getElementById(label).classList.add("notificaciones");
				document.getElementById(label).classList.add("notificacionEditar");
			}

		},
		timeout: 10000,
		error: function() { mostrarAjustesUsuario(); }
	});		
};
	function activarAyudas() {
		if (document.getElementById("botonCopyTutorial").classList.contains("noSeleccionado") == true) {
			document.getElementById("botonCopyTutorial").classList.remove("noSeleccionado");
		}else{
			document.getElementById("botonCopyTutorial").classList.add("noSeleccionado");
		}
	};
	function mostrarLegal() {
		var textoIdioma = textoCondiciones();
		document.getElementById("cajaModalMenu").classList.remove("invisible");

		let codigo = "";
		codigo += "	<div class='h10 w90 spaceAroundXY'>";
		codigo += "		<p class='w15 centradoXY'>";
		codigo += "			<a href='https://jigsaw.w3.org/css-validator/check/referer' target='_blank'>";
    	codigo += "			<img style='border:0;width:88px;height:31px' src='https://jigsaw.w3.org/css-validator/images/vcss-blue' alt='¡CSS Válido!' /></a>";
    	codigo += "		</p>";
		codigo += "		<img class='h50' src='img/Menu/boton_salir.png' onclick=\"cerrarTerminos()\">";
		codigo += "		<p class='w15 centradoXY'>";
		codigo += "			<a href='https://jigsaw.w3.org/css-validator/check/referer' target='_blank'>";
    	codigo += "			<img style='border:0;width:88px;height:31px' src='https://jigsaw.w3.org/css-validator/images/vcss-blue' alt='¡CSS Válido!' /></a>";
    	codigo += "		</p>";
		codigo += "	</div>";
		codigo += "	<div id='recuadroTerminos' class='h85 w90'>";
		codigo += textoIdioma;
		codigo += "	</div>";
		document.getElementById("ventanaModalMenu").innerHTML = codigo;
		/*




Aquí hay que meter varios botones en la parte de arriba donde se vean contratos y todo lo que haga falta meter (¿se meten también certificados?)
¿Se mete un documento detallando quién tiene acceso a cambiar cada dato?
Contrato de Pro
Contrato de Becas








		*/
	};
		function cerrarTerminos() {
			document.getElementById("cajaModalMenu").classList.add("invisible");
		};

	function abrirAyuda(opcion) {
		switch(opcion) {
			case "configuracion":
				document.getElementById("botonFinalizarAyuda").innerHTML = "Finalizar";

				// Mostrar paso actual
				const pasos = document.getElementsByClassName("pasoAyuda");
				let pasoActual = "pasoAyudaConfiguracion1";
				for (var i = 0; i < pasos.length; i++) {
					if(pasos[i].classList.contains("pasoAyudaActual")){ pasoActual = pasos[i].id; }
					pasos[i].classList.remove("pasoAyudaActual");
				}
				document.getElementById(pasoActual).classList.add("pasoAyudaActual");

				// Mostrar texto de ayuda
				document.getElementById("textoAyudaConfiguracion").innerHTML = textoAyuda(pasoActual.slice(-1));
				

				document.getElementById("cajaAyuda").classList.remove("invisible");
				$("cajaAyuda").fadeIn();
				break;
		}
	};
		function cambiarPasoAyuda(valor) {
			const pasos = document.getElementsByClassName("pasoAyuda");
			let pasoActual = "pasoAyudaConfiguracion1";
			for (var i = 0; i < pasos.length; i++) {
				if(pasos[i].classList.contains("pasoAyudaActual")){
					pasoActual = pasos[i].id;
				}
				pasos[i].classList.remove("pasoAyudaActual");
			}
			let valorNuevo = parseInt(pasoActual.slice(-1)) + valor;
			if (pasoActual.slice(-1)=="1" && valor==-1) { valorNuevo = 1;}
			if (pasoActual.slice(-1)==pasos.length && valor==1) { valorNuevo = pasos.length;}
			
			const labelNuevo = "pasoAyudaConfiguracion"+valorNuevo;
			document.getElementById(labelNuevo).classList.add("pasoAyudaActual");

			// Mostrar texto de ayuda
			document.getElementById("textoAyudaConfiguracion").innerHTML = textoAyuda(valorNuevo);

			// Mostrar ayuda
			mostrarPasoAyudaConfiguracion(valorNuevo);
		};
		function mostrarPasoAyudaConfiguracion(paso) {
			let codigo = "";
			switch(paso) {
				case 1:
					document.getElementById("ayudaMenuSuperior").classList.remove("ayudaMenuSuperiorMov");
					document.getElementById("ayudaMenuMedio").classList.remove("ayudaMenuMedioMov");
					document.getElementById("ayudaMenuInferior").classList.remove("ayudaMenuInferiorMov");
					codigo += "";
					break;
				case 2:
					document.getElementById("ayudaMenuSuperior").classList.add("ayudaMenuSuperiorMov");
					document.getElementById("ayudaMenuMedio").classList.add("ayudaMenuMedioMov");
					document.getElementById("ayudaMenuInferior").classList.add("ayudaMenuInferiorMov");
					document.getElementById("ayudaMenuSuperior").classList.add("taparFondoAyuda");
					document.getElementById("ayudaMenuSuperior").innerHTML = "";
					break;
				case 3:
					document.getElementById("ayudaMenuSuperior").classList.remove("ayudaMenuSuperiorMov");
					document.getElementById("ayudaMenuMedio").classList.remove("ayudaMenuMedioMov");
					document.getElementById("ayudaMenuInferior").classList.remove("ayudaMenuInferiorMov");

					document.getElementById("ayudaMenuSuperior").classList.remove("taparFondoAyuda");
					document.getElementById("ayudaMenuMedio").classList.add("taparFondoAyuda");
					codigo += " <img id='flechaAyuda1' class='flechaAyuda' src='img/Menu/flechaAyuda.png' alt='flecha'>";
					codigo += " <img id='flechaAyuda2' class='flechaAyuda' src='img/Menu/flechaAyuda.png' alt='flecha'>";
					codigo += " <img id='flechaAyuda3' class='flechaAyuda' src='img/Menu/flechaAyuda.png' alt='flecha'>";
					codigo += " <img id='flechaAyuda4' class='flechaAyuda' src='img/Menu/flechaAyuda.png' alt='flecha'>";
					document.getElementById("ayudaMenuSuperior").innerHTML = codigo;
					document.getElementById("ayudaMenuMedio").innerHTML = "";
					break;
				case 4:
					document.getElementById("ayudaMenuSuperior").classList.add("taparFondoAyuda");
					document.getElementById("ayudaMenuMedio").classList.remove("taparFondoAyuda");
					document.getElementById("ayudaMenuInferior").classList.add("taparFondoAyuda");
					document.getElementById("ayudaMenuSuperior").innerHTML = "";
					codigo += " <img id='flechaAyuda5' class='flechaAyuda' src='img/Menu/flechaAyuda.png' alt='flecha'>";
					codigo += " <img id='flechaAyuda6' class='flechaAyuda' src='img/Menu/flechaAyuda.png' alt='flecha'>";
					codigo += " <img id='flechaAyuda7' class='flechaAyuda' src='img/Menu/flechaAyuda.png' alt='flecha'>";
					codigo += " <img id='flechaAyuda8' class='flechaAyuda' src='img/Menu/flechaAyuda.png' alt='flecha'>";
					document.getElementById("ayudaMenuMedio").innerHTML = codigo;
					document.getElementById("ayudaMenuInferior").innerHTML = "";
					break;
				case 5:
					document.getElementById("ayudaMenuMedio").classList.add("taparFondoAyuda");
					document.getElementById("ayudaMenuInferior").classList.remove("taparFondoAyuda");
					codigo += " <img id='flechaAyuda9' class='flechaAyuda' src='img/Menu/flechaAyuda.png' alt='flecha'>";
					codigo += " <img id='flechaAyuda10' class='flechaAyuda' src='img/Menu/flechaAyuda.png' alt='flecha'>";
					codigo += " <img id='flechaAyuda11' class='flechaAyuda' src='img/Menu/flechaAyuda.png' alt='flecha'>";
					document.getElementById("ayudaMenuMedio").innerHTML = "";
					document.getElementById("ayudaMenuInferior").innerHTML = codigo;
					break;
				case 6:
					document.getElementById("ayudaMenuMedio").classList.remove("taparFondoAyuda");
					document.getElementById("ayudaMenuInferior").classList.add("taparFondoAyuda");
					document.getElementById("ayudaMenuInferior").innerHTML = "";
					codigo += " <img id='flechaAyuda6' class='flechaAyuda' src='img/Menu/flechaAyuda.png' alt='flecha'>";
					document.getElementById("ayudaMenuMedio").innerHTML = codigo;
					break;
			}
		};
		function cerrarAyudaConfiguracion(opcion) {
			switch(opcion) {
				case "configuracion":
					$("cajaAyuda").fadeOut();
					document.getElementById("cajaAyuda").classList.add("invisible");
					break;
			}
		};

	async function marcarDeporteFavorito(deporte) {
		cambiarIconoDeporteFavorito(deporte);

		localStorage.setItem("DeporteFav",deporte);

		// Guardar Favorito
		$.ajax({
			url: "php/deporteFavorito.php",
			type: 'POST',
			data: {
				deporte: deporte
			},
			timeout: 10000,
			error: function(){ marcarDeporteFavorito(deporte); }
		});
	};
		function cambiarIconoDeporteFavorito(deporte) {
			for (var i = 1; i < 4; i++) {
				let labelImgNo = "imgDeporteFav"+i;
				document.getElementById(labelImgNo).src = "img/Menu/favorito0.png";
				document.getElementById(labelImgNo).style = "height:50%";
			}
			const labelImg = "imgDeporteFav"+deporte;
			if(document.getElementById(labelImg)) {
				document.getElementById(labelImg).src = "img/Menu/favorito1.png";
				document.getElementById(labelImg).style = "height:60%";
			}
		};
	function seleccionarEquipoFavorito(deporte) {
		let deporteNombre = numeroDeporte(deporte),
		    casilla = "#favorito"+deporte,
		    elegir = "#elegirFav"+deporte,
		    botonEditar = "#botonEditarFav"+deporte,
		    botonGuardar = "#botonEditarElegir"+deporte;
		document.getElementById("loaderAjustes").classList.add("loader");
		$.ajax({
			url: "php/listaEquipos.php",
			type: 'POST',
			data: {
				deporte: deporteNombre
			},
			success: function(res){
				document.getElementById("loaderAjustes").classList.remove("loader");
				var js= JSON.parse(res);
				
				var datos = "	<select name='nuevoFav"+deporte+"' id='nuevoFav"+deporte+"'>";
				for (var i = 0; i < js[0].length; i++) {
					datos += " 		<option value='"+js[0][i].ID_Equipo+"'>"+js[0][i].Nombre+"</option>";
				}
				datos += "		</select>";

				$(casilla).addClass("invisible");
				$(botonEditar).addClass("invisible");
				$(botonGuardar).removeClass("invisible");
				$(elegir).html(datos);
				$(elegir).removeClass("invisible");
			},
			timeout: 10000,
			error: function() { seleccionarEquipoFavorito(deporte); }
		});
	};
	function guardarEquipoFavorito(deporte) {
		let deporteNombre = textoDeportes(deporte);

		// Coger el ID del equipo del select
		var select = "#nuevoFav"+deporte;
		var favorito = $(select).val();
		document.getElementById("loaderAjustes").classList.add("loader");
		$.ajax({
			url: "php/nuevoFavorito.php",
			type: 'POST',
			data: {
				deporteNombre: deporteNombre,
				idFavorito: favorito
			},
			success: function(res){
				document.getElementById("loaderAjustes").classList.remove("loader");
				var js= JSON.parse(res);

				var casilla = "#favorito"+deporte;
				var elegir = "#elegirFav"+deporte;
				var botonEditar = "#botonEditarFav"+deporte;
				var botonGuardar = "#botonEditarElegir"+deporte;
				
				// Cambiar nombre e img en favorito+deporte
				var datos = "	<img class='w20' src='img/Clubes/"+deporteNombre+"/Equipos/"+js[0][0].Escudo+"'>";
				datos += "		<label class='w75'>"+js[0][0].Nombre+"</label>";

				$(casilla).html(datos);
				$(elegir).addClass("invisible");
				$(botonEditar).removeClass("invisible");
				$(botonGuardar).addClass("invisible");
				$(casilla).removeClass("invisible");
			},
			timeout: 10000,
			error: function() { guardarEquipoFavorito(deporte); }
		});
	};
	function editarSuscripcion(deporte) {
		$("#cajaAjustesUsuario").addClass("invisible");
		$("#cajaSuscripcion").removeClass("invisible");

		let estado = 0;
		switch(deporte) {
			case 1:
				estado = leerDatosUsuario("EstadoBM");
				break;
			case 2:
				estado = leerDatosUsuario("EstadoBL");
				break;
			case 3:
				estado = leerDatosUsuario("EstadoFS");
				break;
		}

		switch(estado) {
			case "0": // Usuario No definido
				document.getElementById("elegirUsuarioSuscripcion").classList.remove("invisible");

				var codigo = "";
				codigo += " <h1>¿Qué uso quieres darle a la cuenta?</h1>";
				codigo += " <div id='cajaElegirTipoUsuario' class='h80 w90 spaceAroundXY flexWrap'>";
				codigo += "		<div id='botonElegirTipoUsuarioBasico' class='h45 w30 centradoXY flexWrap cajaElegirUsuarioSuscripcion' onclick=\"primerUso(0, "+deporte+")\" ontouchstart=\"inicioPulsacion('botonElegirTipoUsuarioBasico')\" ontouchend=\"finPulsacion('botonElegirTipoUsuarioBasico')\">";
				codigo += "	 		<div class='h20 w100 spaceAroundXY'>";
				codigo += "				<img class='h90 w15' src='img/Menu/edicionJugador.png' alt='icono'>";
				codigo += "				<h3 class='w90'>Cuenta Básica</h3>";
				codigo += "			</div>";
				codigo += "	 		<div class='w100 h80 centradoXY flexWrap'>";
				codigo += "				<p>Uso no profesional de BigDT.</p>";
				codigo += "				<p>Accede a miles de datos.</p>";
				codigo += "				<p>Puedes crear tu propio Club, Competiciones, Técnicos y Jugadores para <span class='textoPro'>competiciones no federadas</span>.</p>";
				codigo += "			</div>";
				codigo += "			<div class='w100 centradoXY bandaGratis'>GRATIS</div>";
				codigo += "		</div>";
				codigo += "		<div id='botonElegirTipoUsuarioScouting' class='h45 w30 centradoXY flexWrap cajaElegirUsuarioSuscripcion noOperativo' ontouchstart=\"inicioPulsacion('botonElegirTipoUsuarioScouting')\" ontouchend=\"finPulsacion('botonElegirTipoUsuarioScouting')\">";
				codigo += "	 		<div class='h20 w100 spaceAroundXY'>";
				codigo += "				<img class='h90 w20' src='img/Menu/pizarra.png' alt='icono'>";
				codigo += "				<h3 class='w75'>Scouting</h3>";
				codigo += "			</div>";
				codigo += "	 		<div class='w100 h80 centradoXY flexWrap'>";
				codigo += "				<h3>PRÓXIMAMENTE</h3>";
				codigo += "			</div>";
				codigo += "			<div class='w100 centradoXY bandaPago'>PRO</div>";
				codigo += "		</div>";
				codigo += "		<div id='botonElegirTipoUsuarioPrensa' class='h45 w30 centradoXY flexWrap cajaElegirUsuarioSuscripcion noOperativo' ontouchstart=\"inicioPulsacion('botonElegirTipoUsuarioPrensa')\" ontouchend=\"finPulsacion('botonElegirTipoUsuarioPrensa')\">";
				codigo += "	 		<div class='h20 w100 spaceAroundXY'>";
				codigo += "				<img class='h90 w20' src='img/Menu/edicionJugador.png' alt='icono'>";
				codigo += "				<h3 class='w75'>Prensa</h3>";
				codigo += "			</div>";
				codigo += "	 		<div class='w100 h80 centradoXY flexWrap'>";
				codigo += "				<h3>PRÓXIMAMENTE</h3>";
				codigo += "			</div>";
				codigo += "			<div class='w100 centradoXY bandaPago'>PRO</div>";
				codigo += "		</div>";
				codigo += "		<div id='botonElegirTipoUsuarioClub' class='w30 h45 centradoXY flexWrap cajaElegirUsuarioSuscripcion' onclick=\"primerUso(1, "+deporte+")\" ontouchstart=\"inicioPulsacion('botonElegirTipoUsuarioClub')\" ontouchend=\"finPulsacion('botonElegirTipoUsuarioClub')\">";
				codigo += "	 		<div class='w100 h20 spaceAroundXY'>";
				codigo += "				<img class='h90 w20' src='img/Menu/edicionClub.png' alt='icono'>";
				codigo += "				<h3 class='w75'>Club</h3>";
				codigo += "			</div>";
				codigo += "	 		<div class='w100 h80 centradoXY flexWrap'>";
				codigo += "				<p>Eres propietario de todos tus datos.</p>";
				codigo += "				<p>Gestiona todas las plantillas y staff técnicos.</p>";
				codigo += "				<p>Evalúa y crea informes a medida de cada miembro de tus equipos.</p>";
				codigo += "				<p>Proporciona acceso a herramientas <span class='textoPro'>Pro</span> a todos tus profesionales.</p>";
				codigo += "			</div>";
				codigo += "			<div class='w100 centradoXY bandaPago'>PRO</div>";
				codigo += "		</div>";
				codigo += "	 	<div id='botonElegirTipoUsuarioTecnico' class='w30 h45 centradoXY flexWrap cajaElegirUsuarioSuscripcion' onclick=\"primerUso(2, "+deporte+")\" ontouchstart=\"inicioPulsacion('botonElegirTipoUsuarioTecnico')\" ontouchend=\"finPulsacion('botonElegirTipoUsuarioTecnico')\">";
				codigo += "	 		<div class='w100 h20 spaceAroundXY'>";
				codigo += "				<img class='h90 w20' src='img/Menu/edicionTecnicos.png' alt='icono'>";
				codigo += "				<h3 class='w75'>Técnic@</h3>";
				codigo += "			</div>";
				codigo += "	 		<div class='w100 h80 centradoXY flexWrap'>";
				codigo += "				<p>Crea y mantén actualizada tu propia ficha personal como staff técnico.</p>";
				codigo += "				<p>Aprovecha la suscripción <span class='textoPro'>Pro</span> de tu Club para tener acceso ilimitado.</p>";
				codigo += "				<p>Acceso automático a los datos y herramientas especializadas para entrenadores, preparadores físicos,...</p>";
				codigo += "			</div>";
				codigo += "			<div class='w100 centradoXY bandaGratis'>GRATIS</div>";
				codigo += "		</div>";
				codigo += "	 	<div id='botonElegirTipoUsuarioJugador' class='w30 h45 centradoXY flexWrap cajaElegirUsuarioSuscripcion' onclick=\"primerUso(3, "+deporte+")\" ontouchstart=\"inicioPulsacion('botonElegirTipoUsuarioJugador')\" ontouchend=\"finPulsacion('botonElegirTipoUsuarioJugador')\">";
				codigo += "	 		<div class='w100 h20 spaceAroundXY'>";
				codigo += "				<img class='h90 w20' src='img/Menu/edicionJugadores.png' alt='icono'>";
				codigo += "				<h3 class='w75'>Jugador@</h3>";
				codigo += "			</div>";
				codigo += "	 		<div class='w100 h80 centradoXY flexWrap'>";
				codigo += "				<p>Crea y mantén actualizada tu propia ficha personal como jugador/a.</p>";
				codigo += "				<p>Recibe notificaciones y actualizaciones de tu Equipo. Acceso al chat <span class='textoPro'>Pro</span>.</p>";
				codigo += "				<p>Obtén informes completos sobre tus actuaciones en cada partido.</p>";
				codigo += "				<p>Mejora de forma individual y colectiva.</p>";
				codigo += "			</div>";
				codigo += "			<div class='w100 centradoXY bandaGratis'>GRATIS</div>";
				codigo += " 	</div>";
				codigo += " </div>";
				codigo += " <p id='textoAyuda' class='h10 w85 centradoXY'>";
				codigo += "		⭐ Para adaptarnos a tus necesidades, lo primero que debes hacer es indicar el uso que le vas a dar a esta cuenta. Si vas a realizar funciones muy distintas, te recomendamos crear una cuenta independiente para cada uso.";
				codigo += "	</p>";

				document.getElementById("elegirUsuarioSuscripcion").innerHTML = codigo;
				break;
			case "1":
			case "2":
			case "3":
			case "6": // Usuario Club
				document.getElementById("suscripcion").classList.remove("invisible");
				document.getElementById("loaderAjustes").classList.add("loader");
				$.ajax({
					url: "php/datosSuscripcion.php",
					type: 'POST',
					data: {
						deporte: deporte
					},
					success: function(res){
						document.getElementById("loaderAjustes").classList.remove("loader");
						var js= JSON.parse(res);
						const labelColor = "Color"+deporte;
						var colores = JSON.parse(sessionStorage.getItem(labelColor));

						var codigoTitulo = "";
						codigoTitulo += "	<div class='suscripcionSalir w5 centradoXY'>";
						codigoTitulo += "		<img id='botonSalirCuadroSuscrip' src='img/Menu/volver.png' onclick=\"salirSuscripcion()\" ontouchstart=\"inicioPulsacion('botonSalirCuadroSuscrip')\" ontouchend=\"finPulsacion('botonSalirCuadroSuscrip')\">";
						codigoTitulo += "	</div>";
						codigoTitulo += "	<label class='w80'>Configuración Suscripción Pro</label>";
						document.getElementById("suscripcionTitulo").innerHTML = codigoTitulo;

						var codigo = "";
						codigo += "			<div class='w80 h15 spaceAroundXY cajaconBordes'>";
						codigo += "				<div class='w20 h90 centradoXY flexWrap'>";
						codigo += "					<div class='w100 centradoXY label'>Suscripción</div>";
						codigo += "					<label><strong style='color:var(--color-pro)'>"+nombreSuscripcion(estado)+"</strong></label>";
						codigo += "				</div>";
						codigo += "				<div class='w40 h90 centradoInlineXY'>";
						codigo += "					<img class='w15' src='img/Clubes/Clubes/"+js.Escudo+"'>";
						codigo += "					<div class='w100 h50 centradoXY'><progress class='progress' value='100' min='0' max='100'></progress></div>";
						codigo += "				</div>";
						codigo += "				<div class='w20 h90 centradoXY'>";
						codigo += "					<div id='botonSuscriptSuscripcion' class='w50 h50 centradoXY botonSuscrip2' onclick=\"editarDatosSuscripcion("+deporte+","+estado+")\" ontouchstart=\"inicioPulsacion('botonSuscriptSuscripcion')\" ontouchend=\"finPulsacion('botonSuscriptSuscripcion')\">Editar</div>";
						codigo += "				</div>";
						codigo += "			</div>";
						codigo += "			<div class='w80 h15 spaceAroundXY cajaconBordes'>";
						codigo += "				<div class='w20 h90 centradoXY flexWrap'>";
						codigo += "					<div class='w100 centradoXY label'>Usuarios</div>";
						codigo += "					<div class='w100 centradoXY label'>Autorizados</div>";
						codigo += "				</div>";
						codigo += "				<div class='w40 h90 centradoInlineXY'>";
						codigo += "					<div class='w15 centradoXY flexWrap'>";
						codigo += "						<div class='w100 centradoXY label'>Límite</div>";
						codigo += "						<label>"+js.Limite+"</label>";
						codigo += "					</div>";
						var autorizados = js.Autorizados == null ? 0 : js.Autorizados;
						codigo += "					<div class='w100 h50 centradoXY'><progress class='progress' value='"+autorizados+"' min='0' max='"+nombreSuscripcion(estado)+"'></progress></div>";
						codigo += "				</div>";
						codigo += "				<div class='w20 h90 centradoXY'>";
						codigo += "					<div id='botonSuscriptAutorizados' class='w50 h50 centradoXY botonSuscrip2' onclick=\"editarAutorizados("+js.Limite+","+deporte+")\" ontouchstart=\"inicioPulsacion('botonSuscriptAutorizados')\" ontouchend=\"finPulsacion('botonSuscriptAutorizados')\">Editar</div>";
						codigo += "				</div>";
						codigo += "			</div>";
						codigo += "			<div class='w80 h15 spaceAroundXY cajaconBordes'>";
						codigo += "				<div class='w20 h90 centradoXY flexWrap'>";
						codigo += "					<div class='w100 h50 centradoXY label'>Personalización</div>";
						codigo += "				</div>";
						codigo += "				<div class='w40 h90 centradoInlineXY'>";
						codigo += "					<div class='w30 h100 centradoXY flexWrap'>";
						codigo += "						<div class='w100 h45 centradoXY label'>Color 1</div>";
						codigo += "						<div class='w100 h45 centradoXY'><input id='color1' type='color' value='"+colores[0]+"'></div>";
						codigo += "					</div>";
						codigo += "					<div class='w30 h100 centradoXY flexWrap'>";
						codigo += "						<div class='w100 h45 centradoXY label'>Color 2</div>";
						codigo += "						<div class='w100 h45 centradoXY'><input id='color2' type='color' value='"+colores[1]+"'></div>";
						codigo += "					</div>";
						codigo += "					<div class='w30 h100 centradoXY flexWrap'>";
						codigo += "						<div class='w100 h45 centradoXY label'>Fondo</div>";
						codigo += "						<div class='w100 h45 centradoXY'><input id='colorFondo' type='color' value='"+colores[2]+"'></div>";
						codigo += "					</div>";
						codigo += "					<div class='w30 h100 centradoXY flexWrap'>";
						codigo += "						<div class='w100 h45 centradoXY label'>Texto</div>";
						codigo += "						<div class='w100 h45 centradoXY'><input id='colorTexto' type='color' value='"+colores[3]+"'></div>";
						codigo += "					</div>";
						codigo += "				</div>";
						codigo += "				<div class='w20 h90 spaceAroundXY'>";
						codigo += "					<div id='botonSalirCuadroSuscripDefecto' class='w45 h50 centradoXY botonSuscrip1' onclick=\"coloresOriginales()\" ontouchstart=\"inicioPulsacion('botonSalirCuadroSuscripDefecto')\" ontouchend=\"finPulsacion('botonSalirCuadroSuscripDefecto')\">Defecto</div>";
						codigo += "					<div id='botonSuscriptColores' class='w45 h50 centradoXY botonSuscrip2' onclick=\"guardarColores("+js.id+")\" ontouchstart=\"inicioPulsacion('botonSuscriptColores')\" ontouchend=\"finPulsacion('botonSuscriptColores')\">Guardar</div>";
						codigo += "				</div>";
						codigo += "			</div>";
						codigo += "			<div class='w80 h15 spaceAroundXY cajaconBordes'>";
						codigo += "				<div class='w20 h100 centradoXY label'>Contacto";
						codigo += "				</div>";
						codigo += "				<div id='cuadroAyudaClub' class='w40 h100 centradoXY label'><p>Si necesitas cualquier tipo de consulta o ayuda, ponte en contacto con nosotros</p></div>";
						codigo += "				<div id='cuadroAyudaEnviarClub' class='w40 h100 centradoXY label invisible'><textarea id='inputAyudaEnviar' class='w100 h95' type='text' maxlength='150' placeholder='Escribe aquí tu consulta. (Máx. 150 caracteres)' style='background:none; border:none'></textarea></div>";
						codigo += "				<div id='cuadroAyudaRespuestaClub' class='w40 h100 centradoXY label invisible'><p>Muchas gracias. En breve trataremos tu consulta y te responderemos a la mayor brevedad.</p></div>";
						codigo += "				<div class='w20 h90 spaceAroundXY'>";
						codigo += "					<div id='botonSuscriptContactoClub' class='w50 h50 centradoXY botonSuscrip2' onclick=\"pedirAyuda('Club')\" ontouchstart=\"inicioPulsacion('botonSuscriptContactoClub')\" ontouchend=\"finPulsacion('botonSuscriptContactoClub')\">Contactar</div>";
						codigo += "					<div id='botonSuscriptCancelarAyudaClub' class='w45 h50 centradoXY botonSuscrip1 invisible' onclick=\"cancelarAyuda('Club')\" ontouchstart=\"inicioPulsacion('botonSuscriptCancelarAyudaClub')\" ontouchend=\"finPulsacion('botonSuscriptCancelarAyudaClub')\">Cancelar</div>";
						codigo += "					<div id='botonSuscriptEnviarAyudaClub' class='w45 h50 centradoXY botonSuscrip2 invisible' onclick=\"enviarAyuda('Club')\" ontouchstart=\"inicioPulsacion('botonSuscriptEnviarAyudaClub')\" ontouchend=\"finPulsacion('botonSuscriptEnviarAyudaClub')\">Enviar</div>";
						codigo += "				</div>";
						codigo += "			</div>";
						codigo += "			<div class='w80 h10 centradoInlineXY'>";
						codigo += "			</div>";
						document.getElementById("suscripcionCuadro").innerHTML = codigo;

						//Cambiar la combinación de colores en pantalla
						document.getElementById("cajaSuscripcion").style.background = colores[2];
						
						var idCajaSuscripcion = document.getElementById("cajaSuscripcion");
						var label = idCajaSuscripcion.getElementsByTagName("label");
						for (var i = 0; i < label.length; i++) {	label[i].style.color = colores[3];	}
						var label = idCajaSuscripcion.getElementsByClassName("label");
						for (var i = 0; i < label.length; i++) {	label[i].style.color = colores[3];	}
						
						var cajaconBordes = document.getElementsByClassName("cajaconBordes");
						for (var i = 0; i < cajaconBordes.length; i++) {	cajaconBordes[i].style.borderColor = colores[0];	}

						var botonSuscript2 = document.getElementsByClassName("botonSuscript2");
						for (var i = 0; i < botonSuscript2.length; i++) {	botonSuscript2[i].style.borderColor = colores[1];	}

						var botonSuscript1 = document.getElementsByClassName("botonSuscript1");
						for (var i = 0; i < botonSuscript1.length; i++) {	botonSuscript1[i].style.borderColor = colores[2];	}
					},
					timeout: 10000,
					error: function() { editarSuscripcion(deporte); }
				});
				break;
			case "4": // Usuario Entrenador
				document.getElementById("autorizado").classList.remove("invisible");
				document.getElementById("loaderAjustes").classList.add("loader");

				$.ajax({
					url: "php/datosPersonales.php",
					type: 'POST',
					success: function(res){
						document.getElementById("loaderAjustes").classList.remove("loader");
						const js = JSON.parse(res);

						var codigoTitulo = "";
						codigoTitulo += "	<div class='suscripcionSalir w10 centradoXY'>";
						codigoTitulo += "		<img id='botonSalirCuadroAutoriz' src='img/Menu/volver.png' onclick=\"salirSuscripcion()\" ontouchstart=\"inicioPulsacion('botonSalirCuadroAutoriz')\" ontouchend=\"finPulsacion('botonSalirCuadroAutoriz')\">";
						codigoTitulo += "	</div>";
						codigoTitulo += "	<label class='w80'>Configuración Entrenador <span style='color: var(--color-pro)'>Pro</span></label>";
						document.getElementById("autorizadosTitulo").innerHTML = codigoTitulo;

						var codigo = "";
						codigo += "			<div class='w80 h15 centradoXY cajaconBordes'>";
						codigo += "				<img class='h35 w5' src='img/Menu/MVP.png' alt='Info'> En este menú podrás identificar quién eres y asociar tu ficha personal de datos.";
						codigo += "			</div>";
						codigo += "			<div class='w80 h15 spaceAroundXY cajaconBordes'>";
						codigo += "				<div class='w20 h100 centradoXY'>Soy Yo</div>";
						codigo += "				<div class='w40 h100 spaceAroundXY'>";
						const srcImg = js[0].Foto ? js[0].Foto : "x.png";
						codigo += "					<img class='w20 circuloImagenFoto' src='img/Clubes/"+valorDeporte(sessionStorage.getItem('Deporte'))+"/Plantillas/"+js[0].ID_Equipo+"/"+srcImg+"' alt='Img' onerror=\"this.src='img/Clubes/usuario.png'\">";
						const nombreEntrenador = js[0].Nombre ? js[0].Nombre : "Sin datos";
						codigo += "					<div class='w70'>"+nombreEntrenador+"</div>";
						codigo += "				</div>";
						codigo += "				<div class='w20 h90 spaceAroundXY'>";
						codigo += "					<div class='w55 h40 centradoXY botonSuscrip1'>Soy Yo</div>";
						if (js[0] !== "0") {
							codigo += "				<div class='w20 centradoXY fichaBuscar' onclick=\"ventanaDatos('entrenador',"+js[0].ID+")\"><img class='h90' src='img/Menu/buscar.png' alt='ficha'></div>";
						}
						codigo += "				</div>";
						codigo += "			</div>";
						codigo += "			<div class='w80 h15 spaceAroundXY cajaconBordes'>";
						codigo += "				<div class='w20'></div>";
						codigo += "				<div class='w40'>Anular la suscripción como Entrenador <span style='color: var(--color-pro)'>Pro</span></div>";
						codigo += "				<div class='w20 centradoXY'>";
						codigo += "					<div class='w90 h90 centradoXY botonSuscrip2 error'>Anular</div>";
						codigo += "				</div>";
						codigo += "			</div>";
						codigo += "			<div class='w80 h15 spaceAroundXY cajaconBordes'>";
						codigo += "				<div class='w20 h100 centradoXY label'>Contacto";
						codigo += "				</div>";
						codigo += "				<div id='cuadroAyudaEntrenador' class='w40 h100 centradoXY label'><p>Si necesitas cualquier tipo de consulta o ayuda, ponte en contacto con nosotros</p></div>";
						codigo += "				<div id='cuadroAyudaEnviarEntrenador' class='w40 h100 centradoXY label invisible'><textarea id='inputAyudaEnviar' class='w100 h95' type='text' maxlength='150' placeholder='Escribe aquí tu consulta. (Máx. 150 caracteres)' style='background:none; border:none'></textarea></div>";
						codigo += "				<div id='cuadroAyudaRespuestaEntrenador' class='w40 h100 centradoXY label invisible'><p>Muchas gracias. En breve trataremos tu consulta y te responderemos a la mayor brevedad.</p></div>";
						codigo += "				<div class='w20 h90 spaceAroundXY'>";
						codigo += "					<div id='botonSuscriptContactoEntrenador' class='w50 h50 centradoXY botonSuscrip2' onclick=\"pedirAyuda('Entrenador')\" ontouchstart=\"inicioPulsacion('botonSuscriptContactoEntrenador')\" ontouchend=\"finPulsacion('botonSuscriptContactoEntrenador')\">Contactar</div>";
						codigo += "					<div id='botonSuscriptCancelarAyudaEntrenador' class='w45 h50 centradoXY botonSuscrip1 invisible' onclick=\"cancelarAyuda('Entrenador')\" ontouchstart=\"inicioPulsacion('botonSuscriptCancelarAyudaEntrenador')\" ontouchend=\"finPulsacion('botonSuscriptCancelarAyudaEntrenador')\">Cancelar</div>";
						codigo += "					<div id='botonSuscriptEnviarAyudaEntrenador' class='w45 h50 centradoXY botonSuscrip2 invisible' onclick=\"enviarAyuda('Entrenador')\" ontouchstart=\"inicioPulsacion('botonSuscriptEnviarAyudaEntrenador')\" ontouchend=\"finPulsacion('botonSuscriptEnviarAyudaEntrenador')\">Enviar</div>";
						codigo += "				</div>";
						codigo += "			</div>";
						codigo += "			<div class='w80 h10 centradoInlineXY'>";
						codigo += "			</div>";

						document.getElementById("autorizadosCuadro").innerHTML = codigo;

						//Cambiar la combinación de colores en pantalla
						var labelColores = "Color"+sessionStorage.getItem("Deporte");
						var arrayColores = sessionStorage.getItem(labelColores).split('"');
						var array1 = arrayColores[1];
						array1.slice(0,-1); array1.slice(1);
						var array2 = arrayColores[3];
						array2.slice(0,-1); array2.slice(1);
						var array3 = arrayColores[5];
						array3.slice(0,-1); array3.slice(1);
						var array4 = arrayColores[7];
						array4.slice(0,-1); array4.slice(1);
						var colores = [array1,array2,array3,array4];
						document.getElementById("cajaSuscripcion").style.background = colores[2];
						
						var idCajaSuscripcion = document.getElementById("cajaSuscripcion");
						var label = idCajaSuscripcion.getElementsByTagName("label");
						for (var i = 0; i < label.length; i++) {	label[i].style.color = colores[3];	}
						var label = idCajaSuscripcion.getElementsByClassName("label");
						for (var i = 0; i < label.length; i++) {	label[i].style.color = colores[3];	}
						
						var cajaconBordes = document.getElementsByClassName("cajaconBordes");
						for (var i = 0; i < cajaconBordes.length; i++) {	cajaconBordes[i].style.borderColor = colores[0];	}

						var botonSuscript2 = document.getElementsByClassName("botonSuscript2");
						for (var i = 0; i < botonSuscript2.length; i++) {	botonSuscript2[i].style.borderColor = colores[1];	}

						var botonSuscript1 = document.getElementsByClassName("botonSuscript1");
						for (var i = 0; i < botonSuscript1.length; i++) {	botonSuscript1[i].style.borderColor = colores[2];	}
					},
					setTimeout: 10000,
					error: function() { editarSuscripcion(deporte) }
				})
				break;
			case "5": // Usuario Jugador
				document.getElementById("autorizado").classList.remove("invisible");
				
				var codigoTitulo = "";
				codigoTitulo += "	<div class='suscripcionSalir w10 centradoXY'>";
				codigoTitulo += "		<img id='botonSalirCuadroAutoriz' src='img/Menu/volver.png' onclick=\"salirSuscripcion()\" ontouchstart=\"inicioPulsacion('botonSalirCuadroAutoriz')\" ontouchend=\"finPulsacion('botonSalirCuadroAutoriz')\">";
				codigoTitulo += "	</div>";
				codigoTitulo += "	<label class='w80'>Configuración Jugador <span style='color: var(--color-pro)'>Pro</span></label>";
				document.getElementById("autorizadosTitulo").innerHTML = codigoTitulo;

				document.getElementById("loaderAjustes").classList.add("loader");

				$.ajax({
					url: "php/datosPersonales.php",
					type: 'POST',
					success: function(res){
						document.getElementById("loaderAjustes").classList.remove("loader");
						let js = res ? JSON.parse(res): ["0"],
						    colorFondo = "";
						
						var codigo = "";
						codigo += "			<div class='w80 h15 spaceAroundXY cajaconBordes'>";
						codigo += "				<img class='h35 w5' src='img/Menu/MVP.png' alt='Info'> En este menú podrás identificar quién eres y asociar tu ficha personal de datos.";
						codigo += "			</div>";
						codigo += "			<div class='w80 h15 spaceAroundXY cajaconBordes'>";
						codigo += "				<div class='w15 h100 centradoXY'>Soy Yo</div>";
						codigo += "				<div class='w50 h100 spaceAroundXY'>";
						var srcImg = js[0].Foto ? js[0].Foto : "x.png";
						switch(js[0].Tipo) {
						case "1":
							colorFondo = "";
							break;
						case "2":
							colorFondo = "fichaJugadorEspecial";
							break;
						case "3":
							colorFondo = "fichaJugadorUnico";
							break;
						}
						codigo += "					<div class='w20 centradoXY fichaJugador "+colorFondo+"'>";
						codigo += "						<img class='w90 circuloImagenFoto' src='img/Clubes/"+valorDeporte(sessionStorage.getItem('Deporte'))+"/Plantillas/"+js[0].ID_Equipo+"/"+srcImg+"' alt='Img' onerror=\"this.src='img/Clubes/usuario.png'\">";
						codigo += "					</div>";
						var nombreJugador = js[0].Nombre ? js[0].Nombre : "Sin datos";
						codigo += "					<div class='w70'>"+nombreJugador+"</div>";
						codigo += "				</div>";
						codigo += "				<div class='w20 h90 spaceAroundXY'>";
						codigo += "					<div class='w55 h40 centradoXY botonSuscrip1'>Soy Yo</div>";
						if (js[0] !== "0") {
							codigo += "				<div class='w20 centradoXY fichaBuscar' onclick=\"ventanaDatos('jugador',"+js[0].ID+")\"><img class='h90' src='img/Menu/buscar.png' alt='ficha'></div>";
						}
						codigo += "				</div>";
						codigo += "			</div>";
						codigo += "			<div class='w80 h15 spaceAroundXY cajaconBordes'>";
						codigo += "				<div class='w20'></div>";
						codigo += "				<div class='w40'>Anular la asociación como Jugador <span style='color: var(--color-pro)'>Pro</span></div>";
						codigo += "				<div class='w20 centradoXY'>";
						codigo += "					<div class='w90 h90 centradoXY botonSuscrip2 error'>Anular</div>";
						codigo += "				</div>";
						codigo += "			</div>";
						codigo += "			<div class='w80 h15 spaceAroundXY cajaconBordes'>";
						codigo += "				<div class='w20 h100 centradoXY label'>Contacto";
						codigo += "				</div>";
						codigo += "				<div id='cuadroAyudaJugador' class='w40 h100 centradoXY label'><p>Si necesitas cualquier tipo de consulta o ayuda, ponte en contacto con nosotros</p></div>";
						codigo += "				<div id='cuadroAyudaEnviarJugador' class='w40 h100 centradoXY label invisible'><textarea id='inputAyudaEnviar' class='w100 h95' type='text' maxlength='150' placeholder='Escribe aquí tu consulta. (Máx. 150 caracteres)' style='background:none; border:none'></textarea></div>";
						codigo += "				<div id='cuadroAyudaRespuestaJugador' class='w40 h100 centradoXY label invisible'><p>Muchas gracias. En breve trataremos tu consulta y te responderemos a la mayor brevedad.</p></div>";
						codigo += "				<div class='w20 h90 spaceAroundXY'>";
						codigo += "					<div id='botonSuscriptContactoJugador' class='w50 h50 centradoXY botonSuscrip2' onclick=\"pedirAyuda('Jugador')\" ontouchstart=\"inicioPulsacion('botonSuscriptContactoJugador')\" ontouchend=\"finPulsacion('botonSuscriptContactoJugador')\">Contactar</div>";
						codigo += "					<div id='botonSuscriptCancelarAyudaJugador' class='w45 h50 centradoXY botonSuscrip1 invisible' onclick=\"cancelarAyuda('Jugador')\" ontouchstart=\"inicioPulsacion('botonSuscriptCancelarAyudaJugador')\" ontouchend=\"finPulsacion('botonSuscriptCancelarAyudaJugador')\">Cancelar</div>";
						codigo += "					<div id='botonSuscriptEnviarAyudaJugador' class='w45 h50 centradoXY botonSuscrip2 invisible' onclick=\"enviarAyuda('Jugador')\" ontouchstart=\"inicioPulsacion('botonSuscriptEnviarAyudaJugador')\" ontouchend=\"finPulsacion('botonSuscriptEnviarAyudaJugador')\">Enviar</div>";
						codigo += "				</div>";
						codigo += "			</div>";
						codigo += "			<div class='w80 h10 centradoInlineXY'>";
						codigo += "			</div>";

						document.getElementById("autorizadosCuadro").innerHTML = codigo;

						//Cambiar la combinación de colores en pantalla
						var labelColores = "Color"+sessionStorage.getItem("Deporte");
						var arrayColores = sessionStorage.getItem(labelColores).split('"');
						var array1 = arrayColores[1];
						array1.slice(0,-1); array1.slice(1);
						var array2 = arrayColores[3];
						array2.slice(0,-1); array2.slice(1);
						var array3 = arrayColores[5];
						array3.slice(0,-1); array3.slice(1);
						var array4 = arrayColores[7];
						array4.slice(0,-1); array4.slice(1);
						var colores = [array1,array2,array3,array4];
						document.getElementById("cajaSuscripcion").style.background = colores[2];
						
						var idCajaSuscripcion = document.getElementById("cajaSuscripcion");
						var label = idCajaSuscripcion.getElementsByTagName("label");
						for (var i = 0; i < label.length; i++) {	label[i].style.color = colores[3];	}
						var label = idCajaSuscripcion.getElementsByClassName("label");
						for (var i = 0; i < label.length; i++) {	label[i].style.color = colores[3];	}
						
						var cajaconBordes = document.getElementsByClassName("cajaconBordes");
						for (var i = 0; i < cajaconBordes.length; i++) {	cajaconBordes[i].style.borderColor = colores[0];	}

						var botonSuscript2 = document.getElementsByClassName("botonSuscript2");
						for (var i = 0; i < botonSuscript2.length; i++) {	botonSuscript2[i].style.borderColor = colores[1];	}

						var botonSuscript1 = document.getElementsByClassName("botonSuscript1");
						for (var i = 0; i < botonSuscript1.length; i++) {	botonSuscript1[i].style.borderColor = colores[2];	}
					},
					setTimeout: 10000,
					error: function() { editarSuscripcion(deporte) }
				});
				break;
			case "7": // Usuario Versión Gratuita
				document.getElementById("autorizado").classList.remove("invisible");
				
				var codigoTitulo = "";
				codigoTitulo += "	<div class='suscripcionSalir w10 centradoXY'>";
				codigoTitulo += "		<img id='botonSalirCuadroAutoriz' src='img/Menu/volver.png' onclick=\"salirSuscripcion()\" ontouchstart=\"inicioPulsacion('botonSalirCuadroAutoriz')\" ontouchend=\"finPulsacion('botonSalirCuadroAutoriz')\">";
				codigoTitulo += "	</div>";
				codigoTitulo += "	<label class='w80'>Configuración <span class='color1'>"+nombreSuscripcion(estado)+"</span></label>";
				document.getElementById("autorizadosTitulo").innerHTML = codigoTitulo;

				var codigo = "";
				codigo += "			<div class='w80 h15 spaceAroundXY cajaconBordes'>";
				codigo += "				<img class='h35 w5' src='img/Menu/MVP.png' alt='Info'> En este menú podrás identificar quién eres y asociar tu ficha personal de datos.";
				codigo += "			</div>";
				codigo += "			<div class='w80 h15 spaceAroundXY cajaconBordes'>";
				codigo += "				<div class='w20 h100 centradoXY'>Soy Yo</div>";
				codigo += "				<div class='w40 h100 spaceAroundXY'>";
				//var srcImg = js[0].Foto ? js[0].Foto : "x.png";
				codigo += "					<img class='w20 circuloImagenFoto' src='img/Clubes/"+valorDeporte(sessionStorage.getItem('Deporte'))+"/Plantillas/x.png' alt='Img' onerror=\"this.src='img/Clubes/usuario.png'\">";
				//var nombreJugador = js[0].Nombre ? js[0].Nombre : "Sin datos";
				codigo += "					<div class='w70'>Sin datos</div>";
				codigo += "				</div>";
				codigo += "				<div class='w20 h90 spaceAroundXY'>";
				codigo += "					<div class='w55 h40 centradoXY botonSuscrip1'>Soy Yo</div>";
				//if (js[0] !== "0") {
				//	codigo += "				<div class='w20 centradoXY fichaBuscar' onclick=\"ventanaDatos('jugador',"+js[0].ID+")\"><img class='h90' src='img/Menu/buscar.png' alt='ficha'></div>";
				//}
				codigo += "				</div>";
				codigo += "			</div>";
				codigo += "			<div class='w80 h15 spaceAroundXY cajaconBordes'>";
				codigo += "				<div class='w40'>Gestionar tu suscripción <span class='color1'>"+nombreSuscripcion(estado)+"</span>:</div>";
				codigo += "				<div class='w20 centradoXY'>";
				codigo += "					<div class='w90 h90 centradoXY botonSuscrip2'>Modificar</div>";
				codigo += "				</div>";
				codigo += "				<div class='w20 centradoXY'>";
				codigo += "					<div class='w90 h90 centradoXY botonSuscrip2 error'>Anular</div>";
				codigo += "				</div>";
				codigo += "			</div>";
				codigo += "			<div class='w80 h15 spaceAroundXY cajaconBordes'>";
				codigo += "				<div class='w20 h100 centradoXY label'>Contacto";
				codigo += "				</div>";
				codigo += "				<div id='cuadroAyudaJugador' class='w40 h100 centradoXY label'><p>Si necesitas cualquier tipo de consulta o ayuda, ponte en contacto con nosotros</p></div>";
				codigo += "				<div id='cuadroAyudaEnviarJugador' class='w40 h100 centradoXY label invisible'><textarea id='inputAyudaEnviar' class='w100 h95' type='text' maxlength='150' placeholder='Escribe aquí tu consulta. (Máx. 150 caracteres)' style='background:none; border:none'></textarea></div>";
				codigo += "				<div id='cuadroAyudaRespuestaJugador' class='w40 h100 centradoXY label invisible'><p>Muchas gracias. En breve trataremos tu consulta y te responderemos a la mayor brevedad.</p></div>";
				codigo += "				<div class='w20 h90 spaceAroundXY'>";
				codigo += "					<div id='botonSuscriptContactoJugador' class='w50 h50 centradoXY botonSuscrip2' onclick=\"pedirAyuda('Jugador')\" ontouchstart=\"inicioPulsacion('botonSuscriptContactoJugador')\" ontouchend=\"finPulsacion('botonSuscriptContactoJugador')\">Contactar</div>";
				codigo += "					<div id='botonSuscriptCancelarAyudaJugador' class='w45 h50 centradoXY botonSuscrip1 invisible' onclick=\"cancelarAyuda('Jugador')\" ontouchstart=\"inicioPulsacion('botonSuscriptCancelarAyudaJugador')\" ontouchend=\"finPulsacion('botonSuscriptCancelarAyudaJugador')\">Cancelar</div>";
				codigo += "					<div id='botonSuscriptEnviarAyudaJugador' class='w45 h50 centradoXY botonSuscrip2 invisible' onclick=\"enviarAyuda('Jugador')\" ontouchstart=\"inicioPulsacion('botonSuscriptEnviarAyudaJugador')\" ontouchend=\"finPulsacion('botonSuscriptEnviarAyudaJugador')\">Enviar</div>";
				codigo += "				</div>";
				codigo += "			</div>";
				codigo += "			<div class='w80 h10 centradoInlineXY'>";
				codigo += "			</div>";

				document.getElementById("autorizadosCuadro").innerHTML = codigo;

				//Cambiar la combinación de colores en pantalla
				var labelColores = "Color"+sessionStorage.getItem("Deporte");
				var arrayColores = sessionStorage.getItem(labelColores).split('"');
				var array1 = arrayColores[1];
				array1.slice(0,-1); array1.slice(1);
				var array2 = arrayColores[3];
				array2.slice(0,-1); array2.slice(1);
				var array3 = arrayColores[5];
				array3.slice(0,-1); array3.slice(1);
				var array4 = arrayColores[7];
				array4.slice(0,-1); array4.slice(1);
				var colores = [array1,array2,array3,array4];
				document.getElementById("cajaSuscripcion").style.background = colores[2];
				
				var idCajaSuscripcion = document.getElementById("cajaSuscripcion");
				var label = idCajaSuscripcion.getElementsByTagName("label");
				for (var i = 0; i < label.length; i++) {	label[i].style.color = colores[3];	}
				var label = idCajaSuscripcion.getElementsByClassName("label");
				for (var i = 0; i < label.length; i++) {	label[i].style.color = colores[3];	}
				
				var cajaconBordes = document.getElementsByClassName("cajaconBordes");
				for (var i = 0; i < cajaconBordes.length; i++) {	cajaconBordes[i].style.borderColor = colores[0];	}

				var botonSuscript2 = document.getElementsByClassName("botonSuscript2");
				for (var i = 0; i < botonSuscript2.length; i++) {	botonSuscript2[i].style.borderColor = colores[1];	}

				var botonSuscript1 = document.getElementsByClassName("botonSuscript1");
				for (var i = 0; i < botonSuscript1.length; i++) {	botonSuscript1[i].style.borderColor = colores[2];	}
				break;
		}
	};
		function salirSuscripcion() {
			sessionStorage.removeItem("SuscriptAutorizados");
			sessionStorage.removeItem("SuscriptFacturacion");
			sessionStorage.removeItem("SuscriptId");
			sessionStorage.removeItem("SuscripTipo");
			sessionStorage.removeItem("SuscriptUsuario");

			document.getElementById("cajaSuscripcion").classList.add("invisible");
			document.getElementById("noSuscripcion").classList.add("invisible");
			document.getElementById("suscripcion").classList.add("invisible");
			document.getElementById("autorizado").classList.add("invisible");
			document.getElementById("cajaAjustesUsuario").classList.remove("invisible");
		};
		function primerUso(opcion, deporte) {
			// Abrir pantalla de opciones de suscripcion
			document.getElementById("elegirUsuarioSuscripcion").classList.add("invisible");
			document.getElementById("noSuscripcion").classList.remove("invisible");
			document.getElementById("loaderAjustes").classList.add("loader");

			$.ajax({
				url: "php/listadoPrecios.php",
				type: 'POST',
				data: {
					deporte: deporte,
					opcion: opcion
				},
				success: function(res){
					document.getElementById("loaderAjustes").classList.remove("loader");
					let js = JSON.parse(res),
					    codigo = "";
					switch(opcion) {
					case 0:
						// Cuenta básica
						codigo += "	<img id='botonSalirSuscripcion' src='img/Menu/anterior.png' onclick=\"salirSuscripcion()\">";
						codigo += " <h1>Elije la suscripción que mejor se adapta a tus necesidades</h1>";
						codigo += " <div id='cajonSuscripciones' class='h80 w90 spaceAroundXY'>";
						codigo += "		<div id='botonSuscripBasico' class='h70 w45 botonSuscripcion centradoXY flexWrap' onclick=\"suscripcion(0,"+deporte+")\" ontouchstart=\"inicioPulsacion('botonSuscripBasico')\" ontouchend=\"finPulsacion('botonSuscripBasico')\">";
						codigo += " 		<div class='h30 w100'><img class='w100' src='img/Menu/Logo_BigDT.png' alt='imagen'></div>";
						codigo += "			<div class='h70 w100 centradoXY flexWrap' style='background:var(--color-contraste)'>";
						codigo += "				<h2>"+nombreSuscripcion(7)+"</h2>";
						codigo += "				<p class='w90'>Aprovecha herramientas semi profesionales adaptadas a tus necesidades.</p>";
						codigo += "				<p class='w90'>RECUERDA: Tienes acceso libre a toda la aplicación excepto a las <strong class='textoPro'>Herramientas Pro</strong>.</p>";
						codigo += "				<label class='w100 centradoXY fuenteGratis'>GRATIS</label>";
						codigo += "				<button class='w30 centradoXY' style='padding: 2% 5%'>ÚNETE</button>";
						codigo += "			</div>";
						codigo += "		</div>";
						codigo += " </div>";
						codigo += " <div id='cajonCopy' class='h10 w90 spaceBetweenXY'>";
						codigo += "		<span>2023 BigDT&reg; Todos los derechos reservados</span>";
						codigo += "		<img class='h90' src='img/Menu/Logo_BigDT.png' alt='icono'>";
						codigo += "	</div>";

						document.getElementById("noSuscripcion").innerHTML = codigo;
						break;
					case 1:
						// Club
						codigo += "	<img id='botonSalirSuscripcion' src='img/Menu/anterior.png' onclick=\"salirSuscripcion()\">";
						codigo += " <h1>Elije la suscripción que mejor se adapta a tus necesidades</h1>";
						codigo += " <div id='cajonSuscripciones' class='h80 w90 spaceAroundXY'>";
						codigo += "		<div id='botonSuscripClubBasico' class='h90 w12 botonSuscripcion centradoXY flexWrap' onclick=\"suscripcion(0,"+deporte+")\" ontouchstart=\"inicioPulsacion('botonSuscripClubBasico')\" ontouchend=\"finPulsacion('botonSuscripClubBasico')\">";
						codigo += " 		<div class='h30 w100 centradoXY marcadoFondo'><img class='h100' src='img/Menu/404.jpg' alt='imagen'></div>";
						codigo += "			<div class='h70 w100 centradoXY flexWrap'>";
						codigo += "				<h2>"+nombreSuscripcion(7)+"</h2>";
						codigo += "				<label class='w100'>Acceso Básico a <strong>BigDT</strong></label>";
						codigo += "				<label class='w90'>Perfecto para empezar</label>";
						codigo += "				<label class='w90 fuenteGratis'>0"+nombreMoneda(js[0][0].Unidad)+"</label>";
						codigo += "				<button class='h10 centradoXY'>SUSCRIBIRSE</button>";
						codigo += "			</div>";
						codigo += "		</div>";
						codigo += "		<div id='botonSuscripEquipo' class='h90 w20 botonSuscripcion centradoXY flexWrap' onclick=\"suscripcion(1,"+deporte+")\" ontouchstart=\"inicioPulsacion('botonSuscripEquipo')\" ontouchend=\"finPulsacion('botonSuscripEquipo')\">";
						codigo += " 		<div class='h30 w100'><img class='w100 h100' src='img/Menu/equipoPro.jpg' alt='imagen'></div>";
						codigo += "			<div class='h70 w100 centradoXY flexWrap'>";
						codigo += "				<h2>"+nombreSuscripcion(js[0][1].Nombre)+"</h2>";
						codigo += "				<label class='w100'>Acceso Total a <strong>BigDT</strong></label>";
						codigo += "				<strong class='w100 textoNegro'>"+js[0][1].Usuarios+" Usuarios</strong>";
						codigo += "				<label class='w90'>Gestiona tus equipos principales</label>";
						codigo += "				<label class='w100 fuentePrecio'><strong class='textoNegro'>Opción A: "+js[0][1].Precio+nombreMoneda(js[0][1].Unidad)+"/"+textoPeriodicidad(js[0][1].Periodicidad)+"</strong><br><strong class='textoNegro'>Opción B: "+js[0][2].Precio+nombreMoneda(js[0][2].Unidad)+"/"+textoPeriodicidad(js[0][2].Periodicidad)+"</strong></label>";
						codigo += "				<label class='w100 fuenteGratis'>GRATIS*</label>";
						codigo += "				<button class='h10 centradoXY'>SUSCRIBIRSE</button>";
						codigo += "			</div>";
						codigo += "		</div>";
						codigo += "		<div id='botonSuscripClub' class='h90 w20 botonSuscripcion centradoXY flexWrap' onclick=\"suscripcion(2,"+deporte+")\" ontouchstart=\"inicioPulsacion('botonSuscripClub')\" ontouchend=\"finPulsacion('botonSuscripClub')\">";
						codigo += " 		<div class='h30 w100'><img class='w100 h100' src='img/Menu/clubPro.jpg' alt='imagen'></div>";
						codigo += "			<div class='h70 w100 centradoXY flexWrap'>";
						codigo += "				<h2>"+nombreSuscripcion(js[0][3].Nombre)+"</h2>";
						codigo += "				<label class='w100'>Acceso Total a <strong>BigDT</strong></label>";
						codigo += "				<strong class='w100 textoNegro'>"+js[0][3].Usuarios+" Usuarios</strong>";
						codigo += "				<label class='w90'>Gestiona las secciones de un club medio</label>";
						codigo += "				<label class='w100 fuentePrecio'><strong class='textoNegro'>Opción A: "+js[0][3].Precio+nombreMoneda(js[0][3].Unidad)+"/"+textoPeriodicidad(js[0][3].Periodicidad)+"</strong><br><strong class='textoNegro'>Opción B: "+js[0][4].Precio+nombreMoneda(js[0][4].Unidad)+"/"+textoPeriodicidad(js[0][4].Periodicidad)+"</strong></label>";
						codigo += "				<label class='w100 fuenteGratis'>GRATIS*</label>";
						codigo += "				<button class='h10 centradoXY'>SUSCRIBIRSE</button>";
						codigo += "			</div>";
						codigo += "		</div>";
						codigo += "		<div id='botonSuscripGranClub' class='h90 w20 botonSuscripcion centradoXY flexWrap' onclick=\"suscripcion(3,"+deporte+")\" ontouchstart=\"inicioPulsacion('botonSuscripGranClub')\" ontouchend=\"finPulsacion('botonSuscripGranClub')\">";
						codigo += " 		<div class='h30 w100'><img class='w100 h100' src='img/Menu/granClubPro.jpg' alt='imagen'></div>";
						codigo += "			<div class='h70 w100 centradoXY flexWrap'>";
						codigo += "				<h2>"+nombreSuscripcion(js[0][5].Nombre)+"</h2>";
						codigo += "				<label class='w100'>Acceso Total a <strong>BigDT</strong></label>";
						codigo += "				<strong class='w100 textoNegro'>"+js[0][5].Usuarios+" Usuarios</strong>";
						codigo += "				<label class='w90'>Toda la capacidad para gestionar un gran club</label>";
						codigo += "				<label class='w100 fuentePrecio'><strong class='textoNegro'>Opción A: "+js[0][5].Precio+nombreMoneda(js[0][5].Unidad)+"/"+textoPeriodicidad(js[0][5].Periodicidad)+"</strong><br><strong style='color:var(--color-fondoIndex)'>Opción B: "+js[0][6].Precio+nombreMoneda(js[0][6].Unidad)+"/"+textoPeriodicidad(js[0][6].Periodicidad)+"</strong></label>";
						codigo += "				<label class='w100 fuenteGratis'>GRATIS*</label>";
						codigo += "				<button class='h10 centradoXY'>SUSCRIBIRSE</button>";
						codigo += "			</div>";
						codigo += "		</div>";
						codigo += "		<div id='botonSuscripBecaPro' class='h90 w15 botonSuscripcion centradoXY flexWrap' onclick=\"suscripcion(6,"+deporte+")\" ontouchstart=\"inicioPulsacion('botonSuscripBecaPro')\" ontouchend=\"finPulsacion('botonSuscripBecaPro')\">";
						codigo += " 		<div class='h30 w100 centradoXY marcadoFondo'><img class='w70' src='img/Menu/Logo_BigDT.png' alt='imagen'></div>";
						codigo += "			<div class='h70 w100 centradoXY flexWrap'>";
						codigo += "				<h2>"+nombreSuscripcion(6)+"</h2>";
						codigo += "				<label class='w100'>Acceso Total a <strong>BigDT</strong></label>";
						codigo += "				<label class='w90'>Para equipos Amateur</label>";
						codigo += "				<label class='w90 fuentePrecio'><strong class='textoNegro'>Comprueba condiciones</strong></label>";
						codigo += "				<label class='w90 fuenteGratis'>0"+nombreMoneda(js[0][0].Unidad)+"</label>";
						codigo += "				<button class='h10 centradoXY'>SOLICÍTALA</button>";
						codigo += "			</div>";
						codigo += "		</div>";
						codigo += " </div>";
						codigo += " <div id='cajonCopy' class='h10 w90 spaceBetweenXY'>";
						codigo += "		<span>*Todas las suscripciones se mantendrán gratuitas hasta la salida de la versión completa.    2023 BigDT&reg;</span>";
						codigo += "		<img class='h90' src='img/Menu/Logo_BigDT.png' alt='icono'>";
						codigo += "	</div>";

						document.getElementById("noSuscripcion").innerHTML = codigo;
						break;
					case 2:
						// Entrenador
						codigo += "	<img id='botonSalirSuscripcion' src='img/Menu/anterior.png' onclick=\"salirSuscripcion()\">";
						codigo += " <h1>Elije la suscripción que mejor se adapta a tus necesidades</h1>";
						codigo += " <div id='cajonSuscripciones' class='h80 w90 spaceAroundXY'>";
						codigo += "		<div id='botonSuscripUnirseEntrenador' class='h80 w45 botonSuscripcion centradoXY flexWrap' onclick=\"suscripcion(4,"+deporte+")\" ontouchstart=\"inicioPulsacion('botonSuscripUnirseEntrenador')\" ontouchend=\"finPulsacion('botonSuscripUnirseEntrenador')\">";
						codigo += " 		<div class='h30 w100'><img class='w100 h100' src='img/Menu/unirse.jpg' alt='imagen'></div>";
						codigo += "			<div class='h70 w100 centradoXY flexWrap'>";
						codigo += "				<h2>Entrenador</h2>";
						codigo += "				<label class='w90'>Acceso con opciones personalizadas para miembros del staff técnico</label>";
						codigo += "				<label class='w90'>Aprovecha nuestras herramientas profesionales adaptadas a tus necesidades diarias</label>";
						codigo += "				<label class='w90'>Necesitas que tu Club te agregue a su suscripción para acceder a las <strong>herramientas Pro</strong></label>";
						codigo += "				<label class='w100 fuenteGratis'>GRATIS</label>";
						codigo += "				<button class='h15 w30 centradoXY' style='padding: 5%'>ÚNETE</button>";
						codigo += "			</div>";
						codigo += "		</div>";
						codigo += " </div>";
						codigo += " <div id='cajonCopy' class='h10 w90 spaceBetweenXY'>";
						codigo += "		<span>2023 BigDT&reg; Todos los derechos reservados</span>";
						codigo += "		<img class='h90' src='img/Menu/Logo_BigDT.png' alt='icono'>";
						codigo += "	</div>";
						document.getElementById("noSuscripcion").innerHTML = codigo;
						break;
					case 3:
						// Jugador
						codigo += "	<img id='botonSalirSuscripcion' src='img/Menu/anterior.png' onclick=\"salirSuscripcion()\">";
						codigo += " <h1>Elije la suscripción que mejor se adapta a tus necesidades</h1>";
						codigo += " <div id='cajonSuscripciones' class='h80 w90 spaceAroundXY'>";
						codigo += "		<div id='botonSuscripUnirseJugador' class='h80 w45 botonSuscripcion centradoXY flexWrap' onclick=\"suscripcion(5,"+deporte+")\" ontouchstart=\"inicioPulsacion('botonSuscripUnirseJugador')\" ontouchend=\"finPulsacion('botonSuscripUnirseJugador')\">";
						codigo += " 		<div class='h30 w100'><img class='w100 h100' src='img/Menu/unirse.jpg' alt='imagen' style='-o-object-fit:none !important;object-fit:none !important'></div>";
						codigo += "			<div class='h70 w100 centradoXY flexWrap'>";
						codigo += "				<h2>Jugador</h2>";
						codigo += "				<label class='w90'>Accede a infinidad de estadísticas y a tu ficha</label>";
						codigo += "				<label class='w90'>Aprovecha nuestras herramientas profesionales gracias a la suscripción de tu club</label>";
						codigo += "				<label>Aprende a alcanzar tu mejor nivel</label>";
						codigo += "				<label class='w100 fuenteGratis'>GRATIS</label>";
						codigo += "				<button class='h15 w30 centradoXY' style='padding: 5%'>ÚNETE</button>";
						codigo += "			</div>";
						codigo += "		</div>";
						codigo += " </div>";
						codigo += " <div id='cajonCopy' class='h10 w90 spaceBetweenXY'>";
						codigo += "		<span>2023 BigDT&reg; Todos los derechos reservados</span>";
						codigo += "		<img class='h90' src='img/Menu/Logo_BigDT.png' alt='icono'>";
						codigo += "	</div>";
						document.getElementById("noSuscripcion").innerHTML = codigo;
						break;
					case 4:
						// Scouting
						break;
					case 5:
						// Prensa
						break;
					}
				},
				timeout: 10000,
				error: function(){ primerUso(opcion, deporte); }
			});
		};
		function editarDatosSuscripcion(deporte,estado) {
			document.getElementById("loaderAjustes").classList.add("loader");
			document.getElementById("suscripcionCuadro").classList.add("invisible");
			document.getElementById("suscripcionPanelControl").classList.remove("invisible");
			const labelColor = "Color"+deporte;
			const colores = JSON.parse(sessionStorage.getItem(labelColor));

			$.ajax({
				url: "php/estadoSuscripcion.php",
				type: 'POST',
				data: {
					deporte: deporte
				},
				success: function(res){
					document.getElementById("loaderAjustes").classList.remove("loader");
					var js= JSON.parse(res);

					codigo = "";
					codigo += "			<div class='w80 h15 spaceAroundXY cajaconBordes'>";
					codigo += "				<div class='w20 h90 centradoXY'>";
					codigo += "					<div id='botonVolverAutorizados' class='w50 h50 centradoXY botonSuscrip2' onclick=\"volverSubSuscript("+deporte+")\" ontouchstart=\"inicioPulsacion('botonVolverAutorizados')\" ontouchend=\"finPulsacion('botonVolverAutorizados')\">Atrás</div>";
					codigo += "				</div>";
					codigo += "				<div class='w80 h90 centradoXY flexWrap'>Gestión de Suscripción</div>";
					codigo += "			</div>";
					codigo += "			<div id='gestionSuscripcion' class='w80 h70 centradoXY flexWrap cajaconBordes'>";
					codigo += "				<div class='w95 h20 spaceAroundXY'>";
					codigo += "					<div id='nombreCambiarSuscripcion' class='w75'><strong>Tipo de Suscripción:</strong> <span style='color:var(--color-pro)'>"+nombreSuscripcion(1,estado)+"</span></div>";
					codigo += "					<div id='botonCambiarSuscripcion' class='w20 h60 centradoXY botonSuscrip2' onclick=\"cambiarSuscripcion()\" ontouchstart=\"inicioPulsacion('botonCambiarSuscripcion')\" ontouchend=\"finPulsacion('botonCambiarSuscripcion')\">Cambiar</div>";
					codigo += "				<div id='cuadroCambiarSuscripcion' class='h95 w100 spaceAroundXY invisible'>";
					codigo += "					<div id='botonEliminarSuscripcion' class='w15 h60 centradoXY botonSuscrip2 error' onclick=\"eliminarSuscripcion("+deporte+")\" ontouchstart=\"inicioPulsacion('botonEliminarSuscripcion')\" ontouchend=\"finPulsacion('botonEliminarSuscripcion')\">"+nombreSuscripcion(9)+"</div>";
					codigo += "					<div id='botonBecaSuscripcion' class='w15 h60 centradoXY botonSuscrip2' onclick=\"becaSuscripcion("+deporte+")\" ontouchstart=\"inicioPulsacion('botonBecaSuscripcion')\" ontouchend=\"finPulsacion('botonBecaSuscripcion')\">"+nombreSuscripcion(6)+"</div>";
					codigo += "					<div id='botonCambiarSuscripcion0' class='w15 h60 centradoXY botonSuscrip2' onclick=\"cambiarNuevaSuscripcion(0,"+deporte+")\" ontouchstart=\"inicioPulsacion('botonCambiarSuscripcion0')\" ontouchend=\"finPulsacion('botonCambiarSuscripcion0')\">"+nombreSuscripcion(1)+"</div>";
					codigo += "					<div id='botonCambiarSuscripcion1' class='w15 h60 centradoXY botonSuscrip2' onclick=\"cambiarNuevaSuscripcion(1,"+deporte+")\" ontouchstart=\"inicioPulsacion('botonCambiarSuscripcion1')\" ontouchend=\"finPulsacion('botonCambiarSuscripcion1')\">"+nombreSuscripcion(2)+"</div>";
					codigo += "					<div id='botonCambiarSuscripcion2' class='w15 h60 centradoXY botonSuscrip2' onclick=\"cambiarNuevaSuscripcion(2,"+deporte+")\" ontouchstart=\"inicioPulsacion('botonCambiarSuscripcion2')\" ontouchend=\"finPulsacion('botonCambiarSuscripcion2')\">"+nombreSuscripcion(3)+"</div>";
					codigo += "					<div id='botonCambiarSuscripcion3' class='w15 h60 centradoXY botonSuscrip2' onclick=\"cambiarNuevaSuscripcion(3,"+deporte+")\" ontouchstart=\"inicioPulsacion('botonCambiarSuscripcion3')\" ontouchend=\"finPulsacion('botonCambiarSuscripcion3')\">"+nombreSuscripcion(4)+"</div>";
					codigo += "				</div>";
					codigo += "				</div>";
					codigo += "				<div class='w95 h20 spaceAroundXY'>";
					codigo += "					<div class='w75 spaceBetweenXY'>";
					codigo += "						<span class='w40'><strong>Alta en BigDT:</strong> "+js[0].Alta+"</span>";
					codigo += "						<span class='w50'><strong>Caducidad Suscripción:</strong> Indefinido</span>";
					codigo += "					</div>";
					codigo += "					<div id='botonRenovarSuscripcion' class='w20 h60 centradoXY botonSuscrip2' onclick=\"renovarSuscripcion()\" ontouchstart=\"inicioPulsacion('botonRenovarSuscripcion')\" ontouchend=\"finPulsacion('botonRenovarSuscripcion')\">Renovar</div>";
					codigo += "				</div>";
					codigo += "				<div class='w95 h20 spaceAroundXY'>";
					codigo += "					<div id='labelEditarDatosFacturacion' class='w75'>"+js[0].Nombre+" ("+js[0].CIF+")</div>";
					codigo += "					<div id='botonEditarDatosFacturacion' class='w20 h60 centradoXY botonSuscrip2' onclick=\"facturacionSuscripcion()\" ontouchstart=\"inicioPulsacion('botonEditarDatosFacturacion')\" ontouchend=\"finPulsacion('botonEditarDatosFacturacion')\">Editar</div>";
					codigo += "				</div>";
					codigo += "				<div class='w95 h20 spaceAroundXY'>";
					codigo += "					<div id='cuadroWhois' class='w50 h90 spaceAroundXY'>";
					let escudoClub = js[0].EscudoClub == null ? "defecto.png" : js[0].EscudoClub;
					codigo += "						<img class='h90' src='img/Clubes/Clubes/"+escudoClub+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
					let nombreClub = js[0].NombreClub == null ? "--" : js[0].NombreClub;
					codigo += "						"+nombreClub+"";
					codigo += "					</div>";
					//codigo += "					<div id='botonWhoisClub' class='w20 h60 centradoXY botonSuscrip2' ontouchstart=\"inicioPulsacion('botonWhoisClub')\" ontouchend=\"finPulsacion('botonWhoisClub')\"><div class='w100 h100 centradoXY' onclick=\"whois('club')\">Quién Soy</div></div>";
					codigo += "					<div class='w20'></div>";
					let botonFicha = js[0].Whois == null ? " noOperativo" : "";
					codigo += "					<div id='botonVerFichaClub' class='w20 h60 centradoXY botonSuscrip2"+botonFicha+"' ontouchstart=\"inicioPulsacion('botonVerFichaClub')\" ontouchend=\"finPulsacion('botonVerFichaClub')\"><div onclick=\"ventanaDatos('club',"+js[0].Whois+")\">Ficha Club</div></div>";
					//codigo += "					<div id='botonCancelarWhoisClub' class='w20 h60 centradoXY error pulsable invisible' onclick=\"cerrarWhois('club','"+escudoClub+"','"+nombreClub+"')\" ontouchstart=\"inicioPulsacion('botonCancelarWhoisClub')\" ontouchend=\"finPulsacion('botonCancelarWhoisClub')\"><img class='h90' src='img/Menu/boton_salir.png' alt='Salir'></div>";
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += "			<div id='suscripcionFacturacion' class='w80 h70 centradoXY flexWrap cajaconBordes invisible'>";
					codigo += "			</div>";

					document.getElementById("suscripcionPanelControl").innerHTML = codigo;

					var cajaconBordes = document.getElementsByClassName("cajaconBordes");
					for (var i = 0; i < cajaconBordes.length; i++) {	cajaconBordes[i].style.borderColor = colores[0];	}
				},
				timeout: 10000,
				error: function() { editarDatosSuscripcion(deporte); }
			});
		};
			function cerrarWhois(opcion, escudo, nombre) {
				switch(opcion) {
				case 'club':
					// EN CLUB NO HAY
					/*codigo = "						<img class='h90' src='img/Clubes/Clubes/"+escudo+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
					codigo += "						"+nombre+"";
					document.getElementById("cuadroWhois").innerHTML = codigo;

					document.getElementById("botonWhoisClub").innerHTML = "<div class='w100 h100 centradoXY' onclick=\"whois('club')\">Quién Soy</div>";
					document.getElementById("botonCancelarWhoisClub").classList.add("invisible");

					document.getElementById("botonVerFichaClub").classList.remove("invisible");*/
					break;
				}
			};
			function eliminarSuscripcion(opcion) {
				alert("Función no disponible todavía. Por favor, selecciona temporalmente 'Versión Gratuita' para eliminar cualquier posible opción futura de cobro.");
			};
		function cambiarSuscripcion() {
			document.getElementById("nombreCambiarSuscripcion").classList.add("invisible");
			document.getElementById("botonCambiarSuscripcion").classList.add("invisible");
			document.getElementById("cuadroCambiarSuscripcion").classList.remove("invisible");
		};
			function cambiarNuevaSuscripcion(opcion,deporte) {
				let texto = "Al confirmar el cambio de plan de suscripción, la aplicación se reiniciará para guardar los cambios."
				if (confirm(texto) == true) {
					document.getElementById("loaderAjustes").classList.add("loader");
					$.ajax({
						url: "php/cambiarPlanSuscripcion.php",
						type: 'POST',
						data: {
							deporte: deporte,
							opcion: opcion
						},
						success: function(){
							document.getElementById("loaderAjustes").classList.remove("loader");
							document.getElementById("nombreCambiarSuscripcion").classList.remove("invisible");
							document.getElementById("botonCambiarSuscripcion").classList.remove("invisible");
							document.getElementById("cuadroCambiarSuscripcion").classList.add("invisible");

							$.ajax({
								url: "php/cerrarSesion.php",
								type: 'POST',
								success: function() {
									window.location.href = "../index.php";
								}
							});
						},
						timeout: 10000,
						error: function() { cambiarNuevaSuscripcion(opcion,deporte); }
					});
				}
			};
		function renovarSuscripcion() {
			document.getElementById("botonRenovarSuscripcion").innerHTML = "TODAVÍA GRATIS";
			setTimeout(function(){document.getElementById("botonRenovarSuscripcion").innerHTML = "Renovar";},3000);
		};
		function facturacionSuscripcion() {
			document.getElementById("loaderAjustes").classList.add("loader");
			$.ajax({
				url: "php/datosFacturacion.php",
				type: 'POST',
				success: function(res){
					var js= JSON.parse(res);

					codigo = "";
					codigo += "		<div class='w90 h90 centradoXY flexWrap'>";
					codigo += "			<div class='w100 h10 spaceAroundXY'>";
					codigo += "				<div class='w20 label'>CIF/NIF: </div><input id='inputFacturacionCIF' class='w15' type='text' value='"+js[0].CIF+"' maxlength='9' placeholder='X00000000'>";
					codigo += "				<div class='w20 label'>Nombre: </div><input id='inputFacturacionNombre' class='w40' type='text' value='"+js[0].Nombre+"' placeholder='BigDT, S.L.' maxlength='50'>";
					codigo += "			</div>";
					codigo += "			<div class='w100 h10 spaceAroundXY'>";
					codigo += "				<div class='w20 label'>Dirección: </div><input id='inputFacturacionDireccion' class='w80' type='text' value='"+js[0].Direccion+"' maxlength='50'>";
					codigo += "			</div>";
					codigo += "			<div class='w100 h10 spaceAroundXY'>";
					codigo += "				<select id='inputFacturacionComunidad' onchange=\"verProvincias(this.value)\" class='w20'>";
					codigo += "				</select>";
					codigo += "				<select id='inputFacturacionProvincia' onchange=\"verLocalidades(this.value)\" class='w30'>";
					codigo += "					<option>Provincia...</option>";
					codigo += "				</select>";
					codigo += "				<select id='inputFacturacionLocalidad' class='w40'>";
					codigo += "					<option>Localidad...</option>";
					codigo += 				"</select>";
					codigo += "			</div>";
					codigo += "			<div class='w100 h10 spaceAroundXY'>";
					codigo += "				<div class='w20 label'>Código Postal: </div><input id='inputFacturacionCP' class='w15' type='text' value='"+js[0].CP+"' maxlength='5' placeholder='00000'>";
					codigo += "				<div class='w20 label'>Email: </div><input id='inputFacturacionEmail' class='w40' type='text' value='"+js[0].email+"' maxlength='50' placeholder='example@example.com'>";
					codigo += "			</div>";
					codigo += "			<div class='w60 h20 spaceAroundXY'>";
					codigo += "				<div class='h60 w40 centradoXY botonSuscrip1' onclick=\"cancelarFacturacion()\">Cancelar</div>";
					codigo += "				<div class='h60 w40 centradoXY botonSuscrip2' onclick=\"actualizarFacturacion()\">Actualizar</div>";
					codigo += "			</div>";
					codigo += "		</div>";
					document.getElementById("suscripcionFacturacion").innerHTML = codigo;

					document.getElementById("gestionSuscripcion").classList.add("invisible");
					document.getElementById("suscripcionFacturacion").classList.remove("invisible");

					verComunidades(js[0].Comunidad);
					if (js[0].Comunidad !== "") {
						document.getElementById("inputFacturacionComunidad").value = js[0].Comunidad;
					}
					if (js[0].Provincia !== "") {
						const codigo = "<option value='"+js[0].Provincia+"'>"+js[0].Provincia+"</option>";
						document.getElementById("inputFacturacionProvincia").innerHTML = codigo;
						document.getElementById("inputFacturacionProvincia").selectedIndex = 0;
					}
					if (js[0].Localidad !== "") {
						const codigo = "<option value='"+js[0].Localidad+"'>"+js[0].Localidad+"</option>";
						document.getElementById("inputFacturacionLocalidad").innerHTML = codigo;
						document.getElementById("inputFacturacionLocalidad").selectedIndex = 0;
					}
				},
				timeout: 10000,
				error: function() { facturacionSuscripcion(); }
			});
		};
			function verComunidades(comunidad) {
				document.getElementById("loaderAjustes").classList.add("loader");
				$.ajax({
					url: "php/listadosComunidades.php",
					type: "POST",
					success: function(res){
						document.getElementById("loaderAjustes").classList.remove("loader");
						var js = JSON.parse(res);

						if (comunidad) {
							var codigo = "	<option value='"+comunidad+"'>"+comunidad+"</option>";
						}else{
							var codigo = "	<option>Comunidad...</option>";
						}
						for (var i = 0; i < js[0].length; i++) {
							codigo += "	<option value='"+js[0][i].Comunidad+"'>"+js[0][i].Comunidad+"</option>";
						}
						document.getElementById("inputFacturacionComunidad").innerHTML = codigo;
						if (comunidad) {
							document.getElementById("inputFacturacionComunidad").selectedIndex = 0;
						}
					},
					timeout: 10000,
					error: function() { verComunidades(comunidad); }
				});
			};
			function verProvincias(comunidad) {
				document.getElementById("loaderAjustes").classList.add("loader");
				$.ajax({
					url: "php/listadoProvincias.php",
					type: "POST",
					data: {
						dato: comunidad
					},
					success: function(res){
						document.getElementById("loaderAjustes").classList.remove("loader");
						var js = JSON.parse(res);

						var codigo = "	<option>Provincia...</option>";
						for (var i = 0; i < js[0].length; i++) {
							codigo += "	<option value='"+js[0][i].Provincia+"'>"+js[0][i].Provincia+"</option>";
						}
						document.getElementById("inputFacturacionProvincia").innerHTML = codigo;
						document.getElementById("inputFacturacionLocalidad").innerHTML = "<option>Localidad...</option>";
					},
					timeout: 10000,
					error: function() { verProvincias(comunidad); }
				});
			};
			function verLocalidades(provincia) {
				document.getElementById("loaderAjustes").classList.add("loader");
				$.ajax({
					url: "php/listadoLocalidades.php",
					type: "POST",
					data: {
						dato: provincia
					},
					success: function(res){
						document.getElementById("loaderAjustes").classList.remove("loader");
						var js = JSON.parse(res);

						var codigo = "	<option>Localidad...</option>";
						for (var i = 0; i < js[0].length; i++) {
							codigo += "	<option value='"+js[0][i].Localidad+"'>"+js[0][i].Localidad+"</option>";
						}
						document.getElementById("inputFacturacionLocalidad").innerHTML = codigo;
					},
					timeout: 10000,
					error: function() { verLocalidades(provincia); }
				});
			};
			function cancelarFacturacion() {
				document.getElementById("suscripcionFacturacion").classList.add("invisible");
				document.getElementById("gestionSuscripcion").classList.remove("invisible");
			};
			function actualizarFacturacion() {
				document.getElementById("loaderAjustes").classList.add("loader");
				$.ajax({
					url: "php/datosFacturacionActualizacion.php",
					type: "POST",
					data: {
						CIF: document.getElementById("inputFacturacionCIF").value,
						nombre: document.getElementById("inputFacturacionNombre").value,
						direccion: document.getElementById("inputFacturacionDireccion").value,
						comunidad: document.getElementById("inputFacturacionComunidad").value,
						provincia: document.getElementById("inputFacturacionProvincia").value,
						localidad: document.getElementById("inputFacturacionLocalidad").value,
						CP: document.getElementById("inputFacturacionCP").value,
						email: document.getElementById("inputFacturacionEmail").value
					},
					success: function(){
						document.getElementById("loaderAjustes").classList.remove("loader");
						document.getElementById("labelEditarDatosFacturacion").innerHTML = document.getElementById("inputFacturacionNombre").value+" ("+document.getElementById("inputFacturacionCIF").value+")";
						cancelarFacturacion();
					},
					timeout: 10000,
					error: function() { actualizarFacturacion(); }
				});
			};

		function editarAutorizados(limite,deporte) {
			document.getElementById("loaderAjustes").classList.add("loader");
			document.getElementById("suscripcionCuadro").classList.add("invisible");
			document.getElementById("suscripcionAutorizados").classList.remove("invisible");
			const labelColor = "Color"+deporte;
			const colores = JSON.parse(sessionStorage.getItem(labelColor));

			$.ajax({
				url: "php/estadoSuscritos.php",
				type: 'POST',
				success: function(res){
					document.getElementById("loaderAjustes").classList.remove("loader");
					var js= JSON.parse(res);
					var autorizados = js.Activos == "0" ? 0 : js.Activos.length;
					var pendientes = js.Pendientes == "0" ? 0 : js.Pendientes.length;
					var baja = js.Baja == "0" ? 0 : js.Baja.length;

					codigo = "";
					codigo += "			<div class='w80 h15 spaceAroundXY cajaconBordes'>";
					codigo += "				<div class='w20 h90 centradoXY'>";
					codigo += "					<div id='botonVolverAutorizados' class='w50 h50 centradoXY botonSuscrip2' onclick=\"volverSubSuscript("+deporte+")\" ontouchstart=\"inicioPulsacion('botonVolverAutorizados')\" ontouchend=\"finPulsacion('botonVolverAutorizados')\">Atrás</div>";
					codigo += "				</div>";
					codigo += "				<div class='w40 h90 centradoXY flexWrap'>";
					codigo += "					<div class='w100 centradoXY label'>Usuarios</div>";
					codigo += "					<div class='w100 centradoXY label'>Autorizados</div>";
					codigo += "				</div>";
					codigo += "				<div class='w25 h90 centradoXY flexWrap'>";
					codigo += "					<div class='w100 centradoXY label'>Límite Autorizaciones: "+limite+"</div>";
					codigo += "					<div class='w100 centradoXY label'>Usuarios Autorizados: "+autorizados+"</div>";
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += "			<div id='listadoAutorizados' class='w80 h60 centradoXY flexWrap cajaconBordes'>";
					codigo += "					<div class='w95 h10 spaceAroundXY'>";
					codigo += "						<div class='w5'></div>";
					codigo += "						<div class='w25 centradoXY'>Usuario</div>";
					codigo += "						<div class='w25 centradoXY'>Autorizazión</div>";
					codigo += "						<div class='w25 centradoXY'>Alta Usuario</div>";
					codigo += "						<div class='w20 h80 centradoXY'></div>";
					codigo += "					</div>";
					if (autorizados == 0) {
						codigo += "				<div class='w95 h10 spaceAroundXY'>";
						codigo += "					No existen usuarios dados de alta";
						codigo += "				</div>";
					}else{
						for (var i = 0; i < autorizados; i++) {
							codigo += "			<div class='w95 h10 spaceAroundXY'>";
							codigo += "				<div class='w5'>"+(i+1)+":</div>";
							codigo += "				<div class='w25 centradoXY'>"+js.Activos[i].Email+"</div>";
							codigo += "				<div class='w25 centradoXY textoFechaAutorizacion'>"+js.Activos[i].Autorizacion+"</div>";
							codigo += "				<div class='w25 centradoXY textoFechaAutorizacion'>"+js.Activos[i].Alta+"</div>";
							codigo += "				<div class='w20 h80 centradoXY botonSuscrip2' onclick=\"alertaEliminar('"+js.Activos[i].Email+"','"+js.Activos[i].Autorizacion+"',"+limite+","+deporte+")\">Dar de Baja</div>";
							codigo += "			</div>";
						}
					}
					if (pendientes == 0) {
						codigo += "				<div class='w95 h10 spaceAroundXY'>";
						codigo += "					No existen autorizaciones pendientes de aprobar";
						codigo += "				</div>";
					}else{
						const hoy = new Date();
						const fechaRevocacion = new Date(hoy.getTime() - 5 * 24 * 60 * 60 * 1000);
						for (var i = 0; i < pendientes; i++) {
							if (Date.parse(js.Pendientes[i].AutorizacionFecha) < fechaRevocacion) {
								var textoValidacion = "CADUCADO";
								var botonAutorizacion = "<div class='w12 h80 centradoXY botonSuscrip2' onclick=\"enviarNuevoAutorizado("+limite+","+deporte+",'"+js.Pendientes[i].Email+"')\">Reenviar</div>";
								botonAutorizacion += "<div class='w5 h80 centradoXY botonSuscrip2' onclick=\"alertaEliminar('"+js.Pendientes[i].Email+"','"+js.Pendientes[i].Autorizacion+"',"+limite+","+deporte+")\"><img class='w90 h80' src='img/Menu/borrar.png' alt='Borrar'></div>";
								var colorFuente = " style='color: var(--color-corporativo-rosa);'";
							}else{
								var textoValidacion = "En espera";
								var botonAutorizacion = "<div class='w20 h80 centradoXY botonSuscrip2' onclick=\"darBajaAutorizado('"+js.Pendientes[i].Email+"','"+js.Pendientes[i].Autorizacion+"',"+limite+","+deporte+")\">Revocar</div>";
								var colorFuente = "";
							}
							
							codigo += "			<div class='w95 h10 spaceAroundXY'>";
							codigo += "				<div class='w5'></div>";
							codigo += "				<div class='w25 centradoXY'"+colorFuente+">"+js.Pendientes[i].Email+"</div>";
							codigo += "				<div class='w25 centradoXY textoFechaAutorizacion'"+colorFuente+">"+js.Pendientes[i].Autorizacion+"</div>";
							codigo += "				<div class='w25 centradoXY textoFechaAutorizacion'"+colorFuente+">"+textoValidacion+"</div>";
							codigo += 				botonAutorizacion;
							codigo += "			</div>";
						}
					}
					if (baja !== 0) {
						for (var i = 0; i < baja; i++) {
							codigo += "			<div class='w95 h10 spaceAroundXY'>";
							codigo += "				<div class='w5'></div>";
							codigo += "				<div class='w25 centradoXY' style='color:var(--color-corporativo-morado)'>"+js.Baja[i].Email+"</div>";
							codigo += "				<div class='w25 centradoXY textoFechaAutorizacion' style='color:var(--color-corporativo-morado)'>REVOCADA</div>";
							codigo += "				<div class='w25 centradoXY textoFechaAutorizacion'></div>";
							codigo += "				<div class='w12 h80 centradoXY botonSuscrip2' onclick=\"enviarNuevoAutorizado("+limite+","+deporte+",'"+js.Baja[i].Email+"')\">Autorizar</div>";
							codigo += "				<div class='w5 h80 centradoXY botonSuscrip2' onclick=\"alertaEliminar('"+js.Baja[i].Email+"','"+js.Baja[i].Autorizacion+"',"+limite+","+deporte+")\"><img class='w90 h80' src='img/Menu/borrar.png' alt='Borrar'></div>";
							codigo += "			</div>";
						}
					}
					codigo += "			</div>";
					codigo += "			<div id='cajaNuevoAutorizado' class='w80 h10 spaceAroundXY cajaconBordes'>";
					codigo += "				<input id='emailNuevoAutorizado' class='w60 h60' type='email' placeholder='Introducir email aquí para autorizar a un nuevo usuario'>";
					codigo += "				<div id='emailError' class='w60 h90 invisible'></div>";
					codigo += "				<div id='botonNuevoAutorizado' class='w20 h70 centradoXY botonSuscrip2' onclick=\"enviarNuevoAutorizado("+limite+","+deporte+")\" ontouchstart=\"inicioPulsacion('botonNuevoAutorizado')\" ontouchend=\"finPulsacion('botonNuevoAutorizado')\">Autorizar Nuevo</div>";
					codigo += "			</div>";
					codigo += "			<div id='cajaEliminarAutorizado' class='w80 h10 spaceAroundXY cajaconBordes invisible'>";
					codigo += "			</div>";
					document.getElementById("suscripcionAutorizados").innerHTML = codigo;

					var cajaconBordes = document.getElementsByClassName("cajaconBordes");
					for (var i = 0; i < cajaconBordes.length; i++) {	cajaconBordes[i].style.borderColor = colores[0];	}
					document.getElementById("emailNuevoAutorizado").style.borderColor = colores[3];
				},
				timeout: 10000,
				error: function() {
					document.getElementById("loaderAjustes").classList.remove("loader");
					codigo = "";
					codigo += "			<div class='w80 h15 spaceAroundXY cajaconBordes'>";
					codigo += "				<div class='w20 h90 centradoXY'>";
					codigo += "					<div id='botonVolverAutorizados' class='w50 h50 centradoXY botonSuscrip2' onclick=\"volverSubSuscript()\" ontouchstart=\"inicioPulsacion('botonVolverAutorizados')\" ontouchend=\"finPulsacion('botonVolverAutorizados')\">Atrás</div>";
					codigo += "				</div>";
					codigo += "				<div class='w40 h90 centradoXY flexWrap'>";
					codigo += "					<div class='w100 centradoXY label'>Usuarios</div>";
					codigo += "					<div class='w100 centradoXY label'>Autorizados</div>";
					codigo += "				</div>";
					codigo += "				<div class='w20 h90 centradoXY flexWrap'>";
					codigo += "					<div class='w100 centradoXY label'>Límite Usuarios: "+limite+"</div>";
					codigo += "					<div class='w100 centradoXY label'>Usuario Autorizados: ERROR</div>";
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += "			<div id='listadoAutorizados' class='w80 h60 spaceAroundXY cajaconBordes'>";
					codigo += "				<div class='w90 h10 spaceAroundXY'>";
					codigo += "					No se encontraron datos";
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += "			<div class='w80 h10 spaceAroundXY cajaconBordes'>";
					codigo += "				<input id='emailNuevoAutorizado' class='w60 h90' type='email' placeholder='Introducir email aquí para autorizar a un nuevo usuario'>";
					codigo += "				<div id='emailError' class='w60 h90 invisible'></div>";
					codigo += "				<div id='botonNuevoAutorizado' class='w20 h70 centradoXY botonSuscrip2' onclick=\"enviarNuevoAutorizado("+limite+","+deporte+")\" ontouchstart=\"inicioPulsacion('botonNuevoAutorizado')\" ontouchend=\"finPulsacion('botonNuevoAutorizado')\">Autorizar Nuevo</div>";
					codigo += "			</div>";
					document.getElementById("suscripcionAutorizados").innerHTML = codigo;

					var cajaconBordes = document.getElementsByClassName("cajaconBordes");
					for (var i = 0; i < cajaconBordes.length; i++) {	cajaconBordes[i].style.borderColor = colores[0];	}
					document.getElementById("emailNuevoAutorizado").style.borderColor = colores[3];
				}
			});
		};
			function volverSubSuscript(deporte) {
				document.getElementById("suscripcionPanelControl").classList.add("invisible");
				document.getElementById("suscripcionAutorizados").classList.add("invisible");
				document.getElementById("suscripcionCuadro").classList.remove("invisible");
				editarSuscripcion(deporte);
			};
			function enviarNuevoAutorizado(limite,deporte,email) {
				// Efecto enviar
				document.getElementById("botonNuevoAutorizado").innerHTML = "Enviando...";

				const emailUsuario = email ? email : document.getElementById("emailNuevoAutorizado").value;
				const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
				if (emailUsuario.match(mailformat)){
					$.ajax({
						url: "php/enviarNuevoAutorizado.php",
						type: 'POST',
						data: {
							email: emailUsuario,
							deporte: deporte
						},
						success: function(res){
							var js= JSON.parse(res);

							switch(js) {
								case 0:
									// Mostrar error
									document.getElementById("botonNuevoAutorizado").innerHTML = "ERROR";
									document.getElementById("emailNuevoAutorizado").classList.add("invisible");
									document.getElementById("emailError").innerHTML = "ERROR: El usuario indicado ya está suscrito a otro club. Por favor, indica un nuevo email.";
									document.getElementById("emailError").classList.remove("invisible");

									setTimeout(function(){
										document.getElementById("emailNuevoAutorizado").classList.remove("invisible");
										document.getElementById("emailError").classList.add("invisible");
										document.getElementById("botonNuevoAutorizado").innerHTML = "Autorizar Nuevo";
										document.getElementById("emailNuevoAutorizado").value = "";
									},5000);
									break;
								case 1:
									editarAutorizados(limite,deporte); // Recargar página
									break;
							}
						},
						timeout: 10000,
						error: function() {
							document.getElementById("botonNuevoAutorizado").innerHTML = "ERROR";
							document.getElementById("emailNuevoAutorizado").classList.add("invisible");
							document.getElementById("emailError").innerHTML = "ERROR al enviar la solicitud. Por favor, vuelve a intentarlo más tarde.";
							document.getElementById("emailError").classList.remove("invisible");

							setTimeout(function(){
								document.getElementById("emailNuevoAutorizado").classList.remove("invisible");
								document.getElementById("emailError").classList.add("invisible");
								document.getElementById("botonNuevoAutorizado").innerHTML = "Autorizar Nuevo";
								document.getElementById("emailNuevoAutorizado").value = "";
								editarAutorizados(limite,deporte); // Recargar página
							},3000);
						}
					});
				}else{
					document.getElementById("botonNuevoAutorizado").innerHTML = "ERROR";
					document.getElementById("emailNuevoAutorizado").classList.add("invisible");
					document.getElementById("emailError").innerHTML = "Formato de email incorrecto. Por favor, vuelve a intentarlo.";
					document.getElementById("emailError").classList.remove("invisible");

					setTimeout(function(){
						document.getElementById("emailNuevoAutorizado").classList.remove("invisible");
						document.getElementById("emailError").classList.add("invisible");
						document.getElementById("botonNuevoAutorizado").innerHTML = "Autorizar Nuevo";
						document.getElementById("emailNuevoAutorizado").value = "";
						editarAutorizados(limite,deporte); // Recargar página
					},3000);
				}

			};
				function alertaEliminar(email,autorizacion,limite,deporte) {
					codigo = "";
					codigo += "				<div>¿Confirmas que deseas eliminar a este usuario?</div>";
					codigo += "				<div id='botonCancelarEliminar' class='w20 h70 centradoXY botonSuscrip1' onclick=\"cancelarEliminarAutorizado()\" ontouchstart=\"inicioPulsacion('botonCancelarEliminar')\" ontouchend=\"finPulsacion('botonCancelarEliminar')\">Cancelar</div>";
					codigo += "				<div id='botonAceptarEliminar' class='w20 h70 centradoXY botonSuscrip2' onclick=\"eliminarAutorizado('"+email+"','"+autorizacion+"',"+limite+","+deporte+")\" ontouchstart=\"inicioPulsacion('botonAceptarEliminar')\" ontouchend=\"finPulsacion('botonAceptarEliminar')\">Eliminar</div>";
					codigo += "	</div>";

					document.getElementById("cajaEliminarAutorizado").innerHTML = codigo;
					document.getElementById("cajaEliminarAutorizado").style.background = "var(--color-pro)";
					document.getElementById("cajaNuevoAutorizado").classList.add("invisible");
					document.getElementById("cajaEliminarAutorizado").classList.remove("invisible");
				};
					function cancelarEliminarAutorizado() {
						document.getElementById("cajaEliminarAutorizado").classList.add("invisible");
						document.getElementById("cajaNuevoAutorizado").classList.remove("invisible");
					};
					function darBajaAutorizado(email,autorizacion,limite,deporte) {
						document.getElementById("loaderAjustes").classList.add("loader");
						$.ajax({
							url: "php/darBajaAutorizado.php",
							type: 'POST',
							data: {
								email: email,
								autorizacion: autorizacion,
								deporte: deporte
							},
							success: function(res){
								document.getElementById("loaderAjustes").classList.remove("loader");
								editarAutorizados(limite,deporte); // Recargar página
							},
							timeout: 10000,
							error: function() { darBajaAutorizado(email,autorizacion,limite,deporte); }
						});
					};
					function eliminarAutorizado(email,autorizacion,limite,deporte) {
						document.getElementById("loaderAjustes").classList.add("loader");
						$.ajax({
							url: "php/eliminarAutorizado.php",
							type: 'POST',
							data: {
								email: email,
								autorizacion: autorizacion
							},
							success: function(res){
								document.getElementById("loaderAjustes").classList.remove("loader");
								editarAutorizados(limite,deporte); // Recargar página
							},
							timeout: 10000,
							error: function() { eliminarAutorizado(email,autorizacion,limite,deporte); }
						});
					};
		function coloresOriginales() {
			document.getElementById("color1").value = '#c52bb4';
			document.getElementById("color2").value = '#a557d8';
			document.getElementById("colorFondo").value = '#222222';
			document.getElementById("colorTexto").value = '#f5f5f5';
		};
			function guardarColores(id) {
				document.getElementById("loaderAjustes").classList.add("loader");
				$.ajax({
					url: "php/guardarColores.php",
					type: 'POST',
					data: {
						club: id,
						color1: document.getElementById("color1").value,
						color2: document.getElementById("color2").value,
						colorFondo: document.getElementById("colorFondo").value,
						colorTexto: document.getElementById("colorTexto").value
					},
					success: function(res){
						document.getElementById("loaderAjustes").classList.remove("loader");
						var js= JSON.parse(res);

						//Cambiar la combinación de colores en pantalla
						document.getElementById("cajaSuscripcion").style.background = js.Colores[2];
						
						var idCajaSuscripcion = document.getElementById("cajaSuscripcion");
						var label = idCajaSuscripcion.getElementsByTagName("label");
						for (var i = 0; i < label.length; i++) {	label[i].style.color = js.Colores[3];	}
						var label = idCajaSuscripcion.getElementsByClassName("label");
						for (var i = 0; i < label.length; i++) {	label[i].style.color = js.Colores[3];	}
						
						var cajaconBordes = document.getElementsByClassName("cajaconBordes");
						for (var i = 0; i < cajaconBordes.length; i++) {	cajaconBordes[i].style.borderColor = js.Colores[0];	}

						var botonSuscript2 = document.getElementsByClassName("botonSuscript2");
						for (var i = 0; i < botonSuscript2.length; i++) {	botonSuscript2[i].style.borderColor = js.Colores[1];	}

						var botonSuscript1 = document.getElementsByClassName("botonSuscript1");
						for (var i = 0; i < botonSuscript1.length; i++) {	botonSuscript1[i].style.borderColor = js.Colores[2];	}

						// Guardar en localStorage
						const labelColor = "Color"+localStorage.getItem("DeporteFav");
						sessionStorage.setItem(labelColor,JSON.stringify(Array(js.Colores[0],js.Colores[1],js.Colores[2],js.Colores[3])));
					},
					timeout: 10000,
					error: function() { guardarColores(id); }
				});
			};
		function pedirAyuda(opcion) {
			var labelCuadro = "cuadroAyuda"+opcion;
			document.getElementById(labelCuadro).classList.add("invisible");
			var labelCuadroAyuda = "cuadroAyudaEnviar"+opcion;
			document.getElementById(labelCuadroAyuda).classList.remove("invisible");

			var label = "botonSuscriptContacto"+opcion;
			document.getElementById(label).classList.add("invisible");
			var labelCancelar = "botonSuscriptCancelarAyuda"+opcion;
			document.getElementById(labelCancelar).classList.remove("invisible");
			var labelEnviar = "botonSuscriptEnviarAyuda"+opcion;
			document.getElementById(labelEnviar).classList.remove("invisible");
		};
			function cancelarAyuda(opcion) {
				var labelCuadro = "cuadroAyuda"+opcion;
				document.getElementById(labelCuadro).classList.remove("invisible");
				var labelCuadroAyuda = "cuadroAyudaEnviar"+opcion;
				document.getElementById(labelCuadroAyuda).classList.add("invisible");

				var label = "botonSuscriptContacto"+opcion;
				document.getElementById(label).classList.remove("invisible");
				var labelCancelar = "botonSuscriptCancelarAyuda"+opcion;
				document.getElementById(labelCancelar).classList.add("invisible");
				var labelEnviar = "botonSuscriptEnviarAyuda"+opcion;
				document.getElementById(labelEnviar).classList.add("invisible");
			};
			function enviarAyuda(opcion) {
				var labelCancelar = "botonSuscriptCancelarAyuda"+opcion;
				document.getElementById(labelCancelar).classList.add("invisible");
				var labelEnviar = "botonSuscriptEnviarAyuda"+opcion;
				document.getElementById(labelEnviar).innerHTML = "...";
				switch(sessionStorage.getItem("Deporte")) {
					case "1":
						var labelTipo = "EstadoBM";
						break;
					case "2":
						var labelTipo = "EstadoBL";
						break;
					case "3":
						var labelTipo = "EstadoFS";
						break;
				}
				$.ajax({
					url: "php/enviarConsulta.php",
					type: 'POST',
					data: {
						tipo: leerDatosUsuario(labelTipo),
						mensaje: document.getElementById("inputAyudaEnviar").value
					},
					success: function() {
						var labelEnviar = "cuadroAyudaEnviar"+opcion;
						document.getElementById(labelEnviar).classList.add("invisible");
						var labelRespuesta = "cuadroAyudaRespuesta"+opcion;
						document.getElementById(labelRespuesta).classList.remove("invisible");
						var labelSuscript = "botonSuscriptEnviarAyuda"+opcion;
						document.getElementById(labelSuscript).classList.add("invisible");
						document.getElementById(labelSuscript).innerHTML = "Enviar";
					},
					timeout: 10000,
					error: function() { enviarAyuda(); }
				});
			};
		
		function suscripcion(tipo, deporte) {
			document.getElementById("noSuscripcion").classList.add("invisible");
			document.getElementById("compraSuscripcion").classList.remove("invisible");

			// Eliminar sessionStorage antiguo
			sessionStorage.setItem("SuscriptAutorizados","0");
			sessionStorage.setItem("SuscriptFacturacion","0");
			sessionStorage.removeItem("SuscriptId");
			sessionStorage.removeItem("SuscripTipo");
			sessionStorage.removeItem("SuscripUsuarios");
			sessionStorage.removeItem("SuscriptUsuario");
			sessionStorage.removeItem("texto");
			sessionStorage.removeItem("textoInfo");
			sessionStorage.setItem("SuscriptDeporte",deporte);

			let codigo = "",
			    textoInfo = "",
			    numero = "",
			    texto = "";
			if (tipo === 6) {
				let textoSuperior = "		<h1>Solicitud de <span class='color1'>"+nombreSuscripcion(tipo)+"</span></h1>";
				textoSuperior += "			<p class='w90'>Te damos la bienvenida al proceso de solicitud de la <span class='color1'>"+nombreSuscripcion(tipo)+"</span>. Un proceso muy sencillo y casi automático. A continuación te dejamos un listado de preguntas y respuestas para que puedas conocer perfectamente el proceso.</p>";
				sessionStorage.setItem('textoSuperiorPaso1',textoSuperior);

				let texto = " 			<details class='w90'>";
				texto += "					<summary class='pulsable'><h2><img src='img/Menu/anterior.png' alt='flecha' style='transform: rotate(-90deg); width:10px'>¿Para qué sirve obtener la Beca Pro?</h2></summary>";
				texto += "					<p>Gracias a nuestra Beca, puedes disfrutar de todas las funciones <span class='textoPro'>Pro</span> de forma totalmente GRATUITA.</p>";
				texto += "				</details>";
				texto += " 				<details class='w90'>";
				texto += "					<summary class='pulsable'><h2><img src='img/Menu/anterior.png' alt='flecha' style='transform: rotate(-90deg); width:10px'>¿Cuál es el objetivo de la Beca Pro?</h2></summary>";
				texto += "					<p>Queremos que nuestras herramientas profesionales ayuden al crecimiento del deporte base y amateur, lo que facilitará obtener unos mejores profesionales en el futuro.</p>";
				texto += "				</details>";
				texto += "	 			<details class='w90'>";
				texto += "					<summary class='pulsable'><h2><img src='img/Menu/anterior.png' alt='flecha' style='transform: rotate(-90deg); width:10px'>¿Quién puede obtener la Beca Pro?</h2></summary>";
				texto += "					<p>Cualquier Club que no tenga a ninguno de sus equipos senior (masculino o femenino) militando en una de las 3 primeras categorias nacionales.</p>";
				texto += "				</details>";
				texto += " 				<details class='w90'>";
				texto += "					<summary class='pulsable'><h2><img src='img/Menu/anterior.png' alt='flecha' style='transform: rotate(-90deg); width:10px'>¿Cuánto tiempo dura la Beca Pro?</h2></summary>";
				texto += "					<p>Hasta el final de la presente temporada.</p><p>Al final de la misma, debes volver a solicitar la renovación para justificar que sigues cumpliendo los requisitos.</p>";
				texto += "				</details>";
				sessionStorage.setItem('textoPaso1',texto);

				codigo += "	<div class='w90 h90 centradoXY'>";
				codigo += "		<div id='loaderSuscripcion'></div>";
				codigo += "		<div id='suscripcionPaso1' class='w100 h100 centradoXY flexWrap'>";
				codigo += 				textoSuperior;
				codigo += "			<div class='w90 h70 overflowY spaceAroundXY flexWrap'>";
				codigo += 				texto;
				codigo += "			</div>";
				codigo += "			<button class='w15 h5 botonAtras' onclick=\"pasarPasoCompra(1,0)\">Cancelar</button>";
				codigo += "			<button class='w15 h5 botonAdelante' onclick=\"sessionStorage.setItem('SuscripTipo',"+tipo+");pasarPasoCompra(1,2,"+tipo+","+deporte+")\">Continuar</button>";
				codigo += "		</div>";

				codigo += "		<div id='suscripcionPaso2' class='w100 h100 centradoXY flexWrap invisible'>";
				codigo += "		</div>";

				codigo += "		<div id='suscripcionPaso3' class='w100 h100 centradoXY flexWrap invisible'>";
				codigo += "		</div>";
				codigo += "	</div>";
				codigo += "	<div class='w30 h10 spaceAroundXY'>";
				codigo += "		<div id='indicador1' class='indicadorPasos pasoActual'></div>";
				codigo += "		<div id='indicador2' class='indicadorPasos'></div>";
				codigo += "		<div id='indicador3' class='indicadorPasos'></div>";
				codigo += "	</div>";
				document.getElementById("compraSuscripcion").innerHTML = codigo;
			}else if (tipo === 5) {
				let textoInfo = "";
				codigo += "	<div class='w90 h90 centradoXY'>";
				codigo += "		<div id='loaderSuscripcion'></div>";
				codigo += "		<div id='suscripcionPaso1' class='w100 h100 centradoXY flexWrap'>";
				codigo += "			<h1>Proceso de suscripción a <span style='color:var(--color-pro)'>"+nombreSuscripcion(tipo)+"</span> de "+valorDeporte(deporte)+"</h1>";
				codigo += "			<div class='w90 h70 spaceAroundXY flexWrap'>";
				codigo += "				<div class='w40 h90 centradoXY flexWrap overflowY' style='padding:1%'>";
				codigo += "					<p style='margin-bottom:5%'>Este tipo de suscripción te proporciona acceso a multitud de datos y herramientas adaptadas a tus necesidades como jugador.</p><br>";
				codigo += "					<p style='margin-bottom:5%'>No importa si eres jugador profesional, perteneces a categorías inferiores o utilizas la app para jugar con tus amigos. <strong class='color1'>BigDT</strong> siempre se adapta a tus necesidades.</p><br>";
				codigo += "					<p style='margin-bottom:5%'>Este tipo de suscripción es totalmente gratuita para ti. Sin embargo, las funciones que puedes usar dependen del tipo de suscripción que tenga tu Club.</p><br>";
				codigo += "				</div>";
				codigo += "				<div class='w40 h90 centradoXY flexWrap cuadroUsuarios Pro"+tipo+"'>";
				codigo += "					<h1 class='w100'>Usuarios</h1>";
				codigo += "					<h1 class='w25 centradoXY' style='background: var(--color-texto);color: var(--color-pro);aspect-ratio: 1 / 1;border-radius: 50%;'>1</h1>";
				codigo += "					<h1 class='w100'>GRATIS</h1><br>";
				codigo += "				</div>";
				codigo += "			</div>";
				codigo += "			<button class='w20 h10 botonAtras' onclick=\"pasarPasoCompra(1,0)\">Cancelar</button>";
				codigo += "			<button class='w20 h10 botonAdelante' onclick=\"sessionStorage.setItem('SuscripTipo',"+tipo+");pasarPasoCompra(1,2,"+tipo+","+deporte+")\">Continuar</button>";
				codigo += "		</div>";

				codigo += "		<div id='suscripcionPaso2' class='w100 h100 centradoXY flexWrap invisible'>";
				codigo += "		</div>";

				codigo += "		<div id='suscripcionPaso3' class='w100 h100 centradoXY flexWrap invisible'>";
				codigo += "		</div>";
				codigo += "	</div>";
				codigo += "	<div class='w30 h10 spaceAroundXY'>";
				codigo += "		<div id='indicador1' class='indicadorPasos pasoActual'></div>";
				codigo += "		<div id='indicador2' class='indicadorPasos'></div>";
				codigo += "		<div id='indicador3' class='indicadorPasos'></div>";
				codigo += "	</div>";
				document.getElementById("compraSuscripcion").innerHTML = codigo;
			}else if (tipo === 4) {
				let textoInfo = "";
				codigo += "	<div class='w90 h90 centradoXY'>";
				codigo += "		<div id='loaderSuscripcion'></div>";
				codigo += "		<div id='suscripcionPaso1' class='w100 h100 centradoXY flexWrap'>";
				codigo += "			<h1>Proceso de suscripción a <span style='color:var(--color-pro)'>"+nombreSuscripcion(tipo)+"</span> de "+valorDeporte(deporte)+"</h1>";
				codigo += "			<div class='w90 h70 spaceAroundXY flexWrap'>";
				codigo += "				<div class='w40 h90 centradoXY flexWrap overflowY' style='padding:1%'>";
				codigo += "					<p style='margin-bottom:5%'>Este tipo de suscripción te proporciona acceso a multitud de datos y herramientas adaptadas a tus necesidades como miembro del staff técnico (entrenadores, ayudantes, preparadores físicos, asistencia sanitaria...).</p><br>";
				codigo += "					<p style='margin-bottom:5%'>No importa si entrenas a un equipo profesional o a uno de categorías inferiores. <strong class='color1'>BigDT</strong> siempre se adapta a tus necesidades.</p><br>";
				codigo += "					<p style='margin-bottom:5%'>Este tipo de suscripción es totalmente gratuita para ti. Sin embargo, las funciones que puedes usar dependen del tipo de suscripción que tenga tu Club.</p><br>";
				codigo += "					<p style='margin-bottom:5%'>IMPORTANTE: Necesitas que tu Club te autorice dentro de su suscripción para acceder a las <strong class='textoPro'>funciones Pro</strong>.</p><br>";
				codigo += "				</div>";
				codigo += "				<div class='w40 h90 centradoXY flexWrap cuadroUsuarios Pro"+tipo+"'>";
				codigo += "					<h1 class='w100'>Usuarios</h1>";
				codigo += "					<h1 class='w25 centradoXY' style='background: var(--color-texto);color: var(--color-pro);aspect-ratio: 1 / 1;border-radius: 50%;'>1</h1>";
				codigo += "					<h1 class='w100'>GRATIS</h1><br>";
				codigo += "				</div>";
				codigo += "			</div>";
				codigo += "			<button class='w20 h10 botonAtras' onclick=\"pasarPasoCompra(1,0)\">Cancelar</button>";
				codigo += "			<button class='w20 h10 botonAdelante' onclick=\"sessionStorage.setItem('SuscripTipo',"+tipo+");pasarPasoCompra(1,2,"+tipo+","+deporte+")\">Continuar</button>";
				codigo += "		</div>";

				codigo += "		<div id='suscripcionPaso2' class='w100 h100 centradoXY flexWrap invisible'>";
				codigo += "		</div>";

				codigo += "		<div id='suscripcionPaso3' class='w100 h100 centradoXY flexWrap invisible'>";
				codigo += "		</div>";
				codigo += "	</div>";
				codigo += "	<div class='w30 h10 spaceAroundXY'>";
				codigo += "		<div id='indicador1' class='indicadorPasos pasoActual'></div>";
				codigo += "		<div id='indicador2' class='indicadorPasos'></div>";
				codigo += "		<div id='indicador3' class='indicadorPasos'></div>";
				codigo += "	</div>";
				document.getElementById("compraSuscripcion").innerHTML = codigo;
			}else if(tipo <= 3 && tipo > 0) {
				document.getElementById("loaderAjustes").classList.add("loader");
				$.ajax({
					url: "php/listadoPrecios.php",
					type: 'POST',
					data: {
						deporte: deporte,
						opcion: 1
					},
					success: function(res){
						document.getElementById("loaderAjustes").classList.remove("loader");
						let js = JSON.parse(res);

						switch(tipo) {
							case 0:
								textoInfo = "Esta suscripción te da acceso a un completo paquete de estadísticas y herramientas adaptadas al uso normal de un Club amateur.<br><br>¿Esta opción se queda corta para tus necesidades? Prueba las versiones <strong class='textoPro'>Pro</strong> con acceso a estadísticas y herramientas profesionales mejor adaptadas a tus exigencias.";
								numero = js[0][0].Usuarios;
								
								texto = "<p class='w90'>Este tipo de suscripción está pensada para iniciarse en el uso de <strong class='color1'>BigDT</strong>.<br><br>¿Por qué aceptar apps con pruebas de tiempo limitado cuando aquí podrás estar para siempre?</p>";
								texto += "<h1 style='padding: 1% 5%;font-size: 1.9em;background: var(--color-texto);background:var(--color-pro);border-radius: 10px;'>GRATIS</h1>";
								break;
							case 1:
								textoInfo = "Esta suscripción te da acceso ilimitado a todas las estadísticas y herramientas Pro de la aplicación.";
								numero = js[0][1].Usuarios;
								
								texto = " <p class='w90'>Este tipo de suscripción está pensada para llevar la gestión de <strong>uno o dos equipos principales</strong>.</p>";
								texto += "<p class='w90 centradoXY flexWrap' style='font-size: .9em;'>";
								texto += "	<strong class='w100 centradoXY textoNegro'>Opción A: "+js[0][1].Precio+nombreMoneda(js[0][1].Unidad)+"/"+textoPeriodicidad(js[0][1].Periodicidad)+"</strong><br><strong class='textoNegro'>Opción B: "+js[0][2].Precio+nombreMoneda(js[0][2].Unidad)+"/"+textoPeriodicidad(js[0][2].Periodicidad)+"</strong>";
								texto += "</p>";
								texto += "<h1 style='padding: 1% 5%;font-size: 1.9em;background: var(--color-texto);background:var(--color-pro);border-radius: 10px;'>GRATIS*</h1>";
								texto += "<h1 class='w90' style='font-size: .9em;'>*Por tiempo limitado</h1>";
								break;
							case 2:
								textoInfo = "Esta suscripción te da acceso ilimitado a todas las estadísticas y herramientas Pro de la aplicación.";
								numero = js[0][3].Usuarios;
								
								texto = " <p class='w90'>Este tipo de suscripción es idónea para gestionar todas las <strong>secciones de un club amateur o semi amateur</strong>.</p>"
								texto += "<p class='w90 centradoXY flexWrap' style='font-size: .9em;'>";
								texto += "	<strong class='w100 centradoXY textoNegro'>Opción A: "+js[0][3].Precio+nombreMoneda(js[0][3].Unidad)+"/"+textoPeriodicidad(js[0][3].Periodicidad)+"</strong><br><strong class='textoNegro'>Opción B: "+js[0][4].Precio+nombreMoneda(js[0][4].Unidad)+"/"+textoPeriodicidad(js[0][4].Periodicidad)+"</strong>";
								texto += "</p>";
								texto += "<h1 style='padding: 1% 5%;font-size: 1.9em;background: var(--color-texto);background:var(--color-pro);border-radius: 10px;'>GRATIS*</h1>";
								texto += "<h1 class='w90' style='font-size: .9em;'>*Por tiempo limitado</h1>";
								break;
							case 3:
								textoInfo = "Esta suscripción te da acceso ilimitado a todas las estadísticas y herramientas Pro de la aplicación.";
								numero = js[0][5].Usuarios;
								
								texto = " <p class='w90'>Este tipo de suscripción está pensada para grandes clubes que disponen de <strong>numerosos equipos de cantera</strong>.</p>";
								texto += "<p class='w90 centradoXY flexWrap' style='font-size: .9em;'>";
								texto += "	<strong class='w100 centradoXY textoNegro'>Opción A: "+js[0][5].Precio+nombreMoneda(js[0][5].Unidad)+"/"+textoPeriodicidad(js[0][5].Periodicidad)+"</strong><br><strong class='textoNegro'>Opción B: "+js[0][6].Precio+nombreMoneda(js[0][6].Unidad)+"/"+textoPeriodicidad(js[0][6].Periodicidad)+"</strong>";
								texto += "</p>";
								texto += "<h1 style='padding: 1% 5%;font-size: 1.9em;background: var(--color-texto);background:var(--color-pro);border-radius: 10px;'>GRATIS*</h1>";
								texto += "<h1 class='w90' style='font-size: .9em;'>*Por tiempo limitado</h1>";
								break;
						}
						sessionStorage.setItem("SuscripUsuarios", numero);
						sessionStorage.setItem("textoInfo", textoInfo);
						sessionStorage.setItem("texto", texto);

						codigo += "	<div class='w90 h90 centradoXY'>";
						codigo += "		<div id='loaderSuscripcion'></div>";
						codigo += "		<div id='suscripcionPaso1' class='w100 h100 centradoXY flexWrap'>";
						codigo += "			<h1>Proceso de suscripción a <span style='color:var(--color-pro)'>"+nombreSuscripcion(tipo)+"</span> de "+valorDeporte(deporte)+"</h1>";
						codigo += "			<div class='w90 h70 spaceAroundXY flexWrap'>";
						codigo += "				<div class='w40 h90 centradoXY flexWrap overflowY' style='padding:1%'>";
						codigo += "					<p style='margin-bottom:5%'>"+sessionStorage.getItem("textoInfo")+"</p><br>";
						codigo += "					<p style='margin-bottom:5%'>RECUERDA: Tendrás disponibles todas las modalidades de suscripción de forma TOTALMENTE GRATUITA hasta que la aplicación sea completada.</p><br>";
						codigo += "					<p style='background: var(--color-pro);border-radius: 15px;padding: 2%;text-align: center;font-size: 1.4em;margin-bottom:5%;'>Aprovecha para disfrutar de todas las ventajas Pro sin ningún tipo de límites</p>";
						codigo += "				</div>";
						codigo += "				<div class='w40 h90 centradoXY flexWrap cuadroUsuarios Pro"+tipo+"'>";
						codigo += "					<h1 class='w100'>Usuarios</h1>";
						codigo += "					<h1 class='w25 centradoXY' style='background: var(--color-texto);color: var(--color-pro);aspect-ratio: 1 / 1;border-radius: 50%;'>"+numero+"</h1>";
						codigo += 					sessionStorage.getItem("texto");
						codigo += "				</div>";
						codigo += "			</div>";
						codigo += "			<button class='w20 h10 botonAtras' onclick=\"pasarPasoCompra(1,0)\">Cancelar</button>";
						codigo += "			<button class='w20 h10 botonAdelante' onclick=\"sessionStorage.setItem('SuscripTipo',"+tipo+");pasarPasoCompra(1,2,"+tipo+","+deporte+")\">Continuar</button>";
						codigo += "		</div>";

						codigo += "		<div id='suscripcionPaso2' class='w100 h100 centradoXY flexWrap invisible'>";
						codigo += "		</div>";

						codigo += "		<div id='suscripcionPaso3' class='w100 h100 centradoXY flexWrap invisible'>";
						codigo += "		</div>";

						codigo += "		<div id='suscripcionPaso4' class='w100 h100 centradoXY flexWrap invisible'>";
						codigo += "		</div>";

						codigo += "		<div id='suscripcionPaso5' class='w100 h100 centradoXY flexWrap invisible'>";
						codigo += "		</div>";

						codigo += "		<div id='suscripcionPaso6' class='w100 h100 centradoXY flexWrap invisible'>";
						codigo += "		</div>";
						codigo += "	</div>";
						codigo += "	<div class='w30 h10 spaceAroundXY'>";
						codigo += "		<div id='indicador1' class='indicadorPasos pasoActual'></div>";
						codigo += "		<div id='indicador2' class='indicadorPasos'></div>";
						codigo += "		<div id='indicador3' class='indicadorPasos'></div>";
						codigo += "		<div id='indicador4' class='indicadorPasos'></div>";
						codigo += "		<div id='indicador5' class='indicadorPasos'></div>";
						codigo += "		<div id='indicador6' class='indicadorPasos'></div>";
						codigo += "	</div>";
						document.getElementById("compraSuscripcion").innerHTML = codigo;
					},
					timeout: 10000,
					error: function(){ suscripcion(tipo, deporte); }
				});
			}else if(tipo == 0) {
				let textoInfo = "";
				codigo += "	<div class='w90 h90 centradoXY'>";
				codigo += "		<div id='loaderSuscripcion'></div>";
				codigo += "		<div id='suscripcionPaso1' class='w100 h100 centradoXY flexWrap'>";
				codigo += "			<h1>Proceso de suscripción a <span style='color:var(--color-pro)'>"+nombreSuscripcion(7)+"</span> de "+valorDeporte(deporte)+"</h1>";
				codigo += "			<div class='w90 h70 spaceAroundXY flexWrap'>";
				codigo += "				<div class='w40 h90 centradoXY flexWrap overflowY' style='padding:1%'>";
				codigo += "					<p style='margin-bottom:5%'>Este tipo de suscripción te proporciona acceso a multitud de datos y herramientas adaptadas a tus <strong class='textoPro'>necesidades no profesionales</strong>.</p><br>";
				codigo += "					<p style='margin-bottom:5%'>Podrás <strong class='color1'>crear y editar tu propio Club</strong>, así como los <strong class='color1'>equipos</strong> y los <strong class='color1'>jugadores</strong> que pertenecen al mismo.</p><br>";
				codigo += "					<p style='margin-bottom:5%'>Tu equipo podrá participar en competiciones contra otros equipos creados por usuarios.</p><br>";
				codigo += "					<p style='margin-bottom:5%'>Lleva a un nuevo nivel los partidos entre amigos, las escuelas deportivas, competiciones entre empresas,...</p><br>";
				codigo += "					<p style='margin-bottom:5%'>IMPORTANTE: Para acceder a las <strong class='textoPro'>funciones Pro</strong> necesitas tener una suscripción. Consulta si puedes acceder a una <strong class='textoPro'>Beca Pro</strong>.</p><br>";
				codigo += "				</div>";
				codigo += "				<div class='w40 h90 centradoXY flexWrap cuadroUsuarios Pro"+tipo+"'>";
				codigo += "					<h1 class='w100'>Usuarios</h1>";
				codigo += "					<h1 class='w25 centradoXY' style='background: var(--color-texto);color: var(--color-pro);aspect-ratio: 1 / 1;border-radius: 50%;'>1</h1>";
				codigo += "					<h1 class='w100'>GRATIS</h1><br>";
				codigo += "				</div>";
				codigo += "			</div>";
				codigo += "			<button class='w20 h10 botonAtras' onclick=\"pasarPasoCompra(1,0)\">Cancelar</button>";
				codigo += "			<button class='w20 h10 botonAdelante' onclick=\"sessionStorage.setItem('SuscripTipo',"+tipo+");pasarPasoCompra(1,2,"+tipo+","+deporte+")\">Continuar</button>";
				codigo += "		</div>";

				codigo += "		<div id='suscripcionPaso2' class='w100 h100 centradoXY flexWrap invisible'>";
				codigo += "		</div>";

				codigo += "	</div>";
				codigo += "	<div class='w30 h10 spaceAroundXY'>";
				codigo += "		<div id='indicador1' class='indicadorPasos pasoActual'></div>";
				codigo += "		<div id='indicador2' class='indicadorPasos'></div>";
				codigo += "	</div>";
				document.getElementById("compraSuscripcion").innerHTML = codigo;
			}
		};
			function pasarPasoCompra(origen,destino,tipo,deporte) {
				if (destino == 0) {
					let labelOrigen = "compraSuscripcion",
					    labelDestino = "noSuscripcion";
					document.getElementById(labelOrigen).classList.add("invisible");
					document.getElementById(labelDestino).classList.remove("invisible");
				}else {
					// Cambiar indicadores del paso
					let labelIndicadorOrigen = "indicador"+origen,
					    labelIndicadorDestino = "indicador"+destino;
					document.getElementById(labelIndicadorOrigen).classList.remove("pasoActual");
					document.getElementById(labelIndicadorDestino).classList.add("pasoActual");

					// Cambiar pagina
					let labelOrigen = "suscripcionPaso"+origen,
					    labelDestino = "suscripcionPaso"+destino;
					document.getElementById(labelOrigen).classList.add("invisible");
					document.getElementById(labelDestino).classList.remove("invisible");

					// Crear contenido
					let arrayPasos = tipo < 3 ? tipo == 0 ? ["1","2"] : ["1","2","3","4","5","6"] : ["1","2","3"];
					for (var i = 0; i < arrayPasos.length; i++) {
						label = "suscripcionPaso"+arrayPasos[i];
						document.getElementById(label).classList.add("invisible");
					}

					let codigo = "";
					if (tipo === 6) {
						switch(destino) {
							case 1:
								document.getElementById("suscripcionPaso1").classList.remove("invisible");

								codigo += 				sessionStorage.getItem("textoSuperiorPaso1");
								codigo += "			<div class='w90 h70 spaceAroundXY flexWrap'>";
								codigo += 				sessionStorage.getItem("textoPaso1");
								codigo += "			</div>";
								codigo += "			<button class='w15 h5 botonAtras' onclick=\"pasarPasoCompra(1,0)\">Cancelar</button>";
								codigo += "			<button class='w15 h5 botonAdelante' onclick=\"sessionStorage.setItem('SuscripTipo',"+tipo+");pasarPasoCompra(1,2,"+tipo+","+deporte+")\">Continuar</button>";

								document.getElementById("suscripcionPaso1").innerHTML = codigo;
								break;
							case 2:
								document.getElementById("suscripcionPaso2").classList.remove("invisible");
								document.getElementById("loaderSuscripcion").classList.add("loader");
								$.ajax({
									url: "php/listaClubesNacionales.php",
									type: 'POST',
									success: function(res){
										document.getElementById("loaderSuscripcion").classList.remove("loader");
										let js= JSON.parse(res);
										sessionStorage.setItem("listaClubes",res);

										codigo += "	<h1>Proceso para solicitar una <span style='color:var(--color-pro)'>"+nombreSuscripcion(tipo)+"</span></h1>";
										codigo += "	<div class='w90 h70 spaceAroundXY flexWrap'>";
										codigo += "		<div class='w95 h20 spaceAroundXY flexWrap'>";
										codigo += "			<input id='inputListaClubes' type='text' class='w30' placeholder='Buscar nombre del Club...' autofocus/>";
										codigo += "			<ul id='inputListaClubes_list' class='autocompletadores pulsable'></ul>";
										codigo += "			<div id='cuadroDatosClub' class='w60 h90 spaceAroundXY'>";
										codigo += "				<div class='w15 escudoImg'></div><label class='w80'>Selecciona el nombre de tu Club</label>";
										codigo += "			</div>";
										codigo += "		</div>";
										codigo += "		<div id='cuadroResultadoMasculino' class='w95 h20 spaceAroundXY' style='border: 3px solid var(--color-corporativo-rosa);border-radius: 20px;'></div>";
										codigo += "		<div id='cuadroResultadoFemenino' class='w95 h20 spaceAroundXY' style='border: 3px solid var(--color-corporativo-rosa);border-radius: 20px;'></div>";
										codigo += "		<p id='mensajeResultadoClub' class='w95 h20'></p>";
										codigo += "	</div>";
										codigo += "	<button class='w15 h5 botonAtras' onclick=\"pasarPasoCompra(2,1,"+tipo+","+deporte+")\">Volver</button>";
										codigo += "	<button id='botonConfirmarPaso2Beca' class='w15 h5 botonAdelante noOperativo' onclick=\"pasarPasoCompra(2,3,"+tipo+","+deporte+")\">Continuar</button>";

										document.getElementById("suscripcionPaso2").innerHTML = codigo;

										// Crear datos para listado de jugadores
										let inputListaClubes_list = js[0].map(club => {
										  return {value: club.ID_Club, label: club.Nombre};
										});

										autocomplete(document.querySelector("#inputListaClubes"), document.querySelector("#inputListaClubes_list"), inputListaClubes_list, "inputListaClubes");
									},
									timeout: 10000,
									error: function(){ pasarPasoCompra(origen,destino,tipo,deporte); }
								});
								break;
							case 3:
								break;
						}
					}else if (tipo === 5) {
						switch(destino) {
						case 1:
							document.getElementById("suscripcionPaso1").classList.remove("invisible");

							codigo += "			<h1>Proceso de suscripción a <span style='color:var(--color-pro)'>"+nombreSuscripcion(tipo)+"</span> de "+valorDeporte(deporte)+"</h1>";
							codigo += "			<div class='w90 h70 spaceAroundXY flexWrap'>";
							codigo += "				<div class='w40 h90 centradoXY flexWrap overflowY' style='padding:1%'>";
							codigo += "					<p style='margin-bottom:5%'>Este tipo de suscripción te proporciona acceso a multitud de datos y herramientas adaptadas a tus necesidades como jugador.</p><br>";
							codigo += "					<p style='margin-bottom:5%'>No importa si eres jugador profesional, perteneces a categorías inferiores o utilizas la app para jugar con tus amigos. <strong class='color1'>BigDT</strong> siempre se adapta a tus necesidades.</p><br>";
							codigo += "					<p style='margin-bottom:5%'>Este tipo de suscripción es totalmente gratuita para ti. Sin embargo, las funciones que puedes usar dependen del tipo de suscripción que tenga tu Club.</p><br>";
							codigo += "				</div>";
							codigo += "				<div class='w40 h90 centradoXY flexWrap cuadroUsuarios Pro"+tipo+"'>";
							codigo += "					<h1 class='w100'>Usuarios</h1>";
							codigo += "					<h1 class='w25 centradoXY' style='background: var(--color-texto);color: var(--color-pro);aspect-ratio: 1 / 1;border-radius: 50%;'>1</h1>";
							codigo += "					<h1 class='w100'>GRATIS</h1><br>";
							codigo += "				</div>";
							codigo += "			</div>";
							codigo += "			<button class='w20 h10 botonAtras' onclick=\"pasarPasoCompra(1,0)\">Cancelar</button>";
							codigo += "			<button class='w20 h10 botonAdelante' onclick=\"sessionStorage.setItem('SuscripTipo',"+tipo+");pasarPasoCompra(1,2,"+tipo+","+deporte+")\">Continuar</button>";

							document.getElementById("suscripcionPaso1").innerHTML = codigo;
							break;
						case 2:
							document.getElementById("suscripcionPaso2").classList.remove("invisible");
							document.getElementById("loaderSuscripcion").classList.add("loader");
							$.ajax({
								url: "php/listaTotalJugadores.php",
								type: 'POST',
								success: function(res){
									document.getElementById("loaderSuscripcion").classList.remove("loader");
									let js= JSON.parse(res);
									sessionStorage.setItem("listaJugadores",JSON.stringify(js));

									codigo += "	<h1>Proceso de suscripción a <span style='color:var(--color-pro)'>"+nombreSuscripcion(tipo)+"</span> de "+valorDeporte(deporte)+"</h1>";
									codigo += "	<div class='w90 h70 spaceAroundXY flexWrap'>";
									codigo += "		<div class='w90 h20 spaceAroundXY flexWrap'>";
									codigo += "			<input id='inputListaJugadores' class='w30' type='text' placeholder='Busca tu nombre...' autofocus/>";
									codigo += "			<ul id='inputListaJugadores_list' class='autocompletadores pulsable'></ul>";
									codigo += "			<div id='botonNuevoJugador' class='w45 h90 centradoXY' onclick=\"nuevoElemento('Equipo')\">";
									codigo += "				<label class='w80'>Si no te encuentras en el listado, puedes Crear tu propia ficha personal desde el Menú Edición</label>";
									codigo += "				<img class='h90 w10' src='img/Menu/boton_salir.png' alt='Nuevo' style='transform: rotate(45deg)'>";
									codigo += "			</div>";
									codigo += "		</div>";
									codigo += "		<div id='cuadroFichaJugador' class='w30 h70 centradoXY'></div>";
									codigo += "	</div>";
									codigo += "	<button class='w15 h5 botonAtras' onclick=\"pasarPasoCompra(2,1,"+tipo+","+deporte+")\">Volver</button>";
									codigo += "	<button id='botonConfirmarPaso2Jugador' class='w15 h5 botonAdelante noOperativo' onclick=\"pasarPasoCompra(2,3,"+tipo+","+deporte+")\">Continuar</button>";

									document.getElementById("suscripcionPaso2").innerHTML = codigo;

									// Crear datos para listado de jugadores
									let inputListaJugadores_list = js.map(jugador => {
									  return {value: jugador.ID_Jugador, label: jugador.NombreCompleto + " (" + jugador.Edad + ")"};
									});

									autocomplete(document.querySelector("#inputListaJugadores"), document.querySelector("#inputListaJugadores_list"), inputListaJugadores_list, "inputListaJugadores");
								},
								timeout: 10000,
								error: function(){ pasarPasoCompra(origen,destino,tipo,deporte); }
							});
							break;
						case 3:
							document.getElementById("suscripcionPaso3").classList.remove("invisible");
							document.getElementById("loaderSuscripcion").classList.add("loader");
							$.ajax({
								url: "php/datosSuscripcionClub.php",
								type: 'POST',
								data: {
									idJugador: sessionStorage.getItem("SuscriptId")
								},
								success: function(res){
									document.getElementById("loaderSuscripcion").classList.remove("loader");
									let js= JSON.parse(res);

									codigo += "	<h1>Proceso de suscripción a <span style='color:var(--color-pro)'>"+nombreSuscripcion(tipo)+"</span> de "+valorDeporte(deporte)+"</h1>";
									codigo += "	<div class='w90 h70 spaceAroundXY flexWrap'>";
									if (parseInt(js[0].Suscripcion) >= 1) {
										codigo += "		<h1 class='w100 centradoXY'>ENHORABUENA Tu club tiene una suscripción <span class='textoPro'>Pro</span></h1>";
										codigo += "		<h2 class='w100'>Esto significa que podrás hacer todo esto:</h2>";
										codigo += "		<ul>";
										codigo += "			<li>· Accede a nuestras exclusivas <span class='textoPro'>Herramientas Pro</span>.</li>";
										codigo += "			<li>· Gestiona tus propias estadísticas para mejorar tu rendimiento.</li>";
										codigo += "			<li>· Accede al chat privado de tu equipo.</li>";
										codigo += "			<li>· Visualiza estadísticas avanzadas en la previa de los partidos.</li>";
										codigo += "			<li>· Obtén informes detallados sobre tu participación en los partidos.</li>";
										codigo += "			<li>· Disfruta de todas las opciones gratuitas (gestión de fichas, introducción de datos...).</li>";
										codigo += "		</ul>";
									}else{
										codigo += "		<h1 class='w100 centradoXY'>Tu club tiene la suscripción básica</h1>";
										codigo += "		<h2 class='w100'>Esto significa que podrás hacer todo esto:</h2>";
										codigo += "		<ul>";
										codigo += "			<li>· Crear tu propio club NO FEDERADO.</li>";
										codigo += "			<li>· Crear distintas secciones y equipos dentro de tu club.</li>";
										codigo += "			<li>· Crear tu propia ficha y añade a tus amigos.</li>";
										codigo += "			<li>· Utiliza tu equipo para hacer partidos y competiciones contra otros equipos NO FEDERADOS.</li>";
										codigo += "			<li>· Compite con tus amigos por conseguir el trofeo <strong class='color1'>BestDT</strong></li>";
										codigo += "			<li>· Consulta datos actuales e históricos de todas las categorías FEDERADAS.</li>";
										codigo += "		</ul>";
									}
									codigo += "	</div>";
									codigo += "	<button class='w15 h5 botonAtras' onclick=\"pasarPasoCompra(3,2,"+tipo+","+deporte+")\">Volver</button>";
									codigo += "	<button class='w15 h5 botonAdelante' onclick=\"guardarCompra()\">Finalizar</button>";

									document.getElementById("suscripcionPaso3").innerHTML = codigo;
								}
							});
							break;
						}
					}else if (tipo === 4) {
						switch(destino) {
						case 1:
							document.getElementById("suscripcionPaso1").classList.remove("invisible");

							codigo += "			<h1>Proceso de suscripción a <span style='color:var(--color-pro)'>"+nombreSuscripcion(tipo)+"</span> de "+valorDeporte(deporte)+"</h1>";
							codigo += "			<div class='w90 h70 spaceAroundXY flexWrap'>";
							codigo += "				<div class='w40 h90 centradoXY flexWrap overflowY' style='padding:1%'>";
							codigo += "					<p style='margin-bottom:5%'>Este tipo de suscripción te proporciona acceso a multitud de datos y herramientas adaptadas a tus necesidades como miembro del staff técnico (entrenadores, ayudantes, preparadores físicos, asistencia sanitaria...).</p><br>";
							codigo += "					<p style='margin-bottom:5%'>No importa si entrenas a un equipo profesional o a uno de categorías inferiores. <strong class='color1'>BigDT</strong> siempre se adapta a tus necesidades.</p><br>";
							codigo += "					<p style='margin-bottom:5%'>Este tipo de suscripción es totalmente gratuita para ti. Sin embargo, las funciones que puedes usar dependen del tipo de suscripción que tenga tu Club.</p><br>";
							codigo += "					<p style='margin-bottom:5%'>IMPORTANTE: Necesitas que tu Club te autorice dentro de su suscripción para acceder a las <strong class='textoPro'>funciones Pro</strong>.</p><br>";
							codigo += "				</div>";
							codigo += "				<div class='w40 h90 centradoXY flexWrap cuadroUsuarios Pro"+tipo+"'>";
							codigo += "					<h1 class='w100'>Usuarios</h1>";
							codigo += "					<h1 class='w25 centradoXY' style='background: var(--color-texto);color: var(--color-pro);aspect-ratio: 1 / 1;border-radius: 50%;'>1</h1>";
							codigo += "					<h1 class='w100'>GRATIS</h1><br>";
							codigo += "				</div>";
							codigo += "			</div>";
							codigo += "			<button class='w20 h10 botonAtras' onclick=\"pasarPasoCompra(1,0)\">Cancelar</button>";
							codigo += "			<button class='w20 h10 botonAdelante' onclick=\"sessionStorage.setItem('SuscripTipo',"+tipo+");pasarPasoCompra(1,2,"+tipo+","+deporte+")\">Continuar</button>";

							document.getElementById("suscripcionPaso1").innerHTML = codigo;
							break;
						case 2:
							document.getElementById("suscripcionPaso2").classList.remove("invisible");
							document.getElementById("loaderSuscripcion").classList.add("loader");
							$.ajax({
								url: "php/listaTotalEntrenadores.php",
								type: 'POST',
								success: function(res){
									document.getElementById("loaderSuscripcion").classList.remove("loader");
									let js= JSON.parse(res);
									sessionStorage.setItem("listaEntrenadores",res);

									codigo += "	<h1>Proceso de suscripción a <span style='color:var(--color-pro)'>"+nombreSuscripcion(tipo)+"</span> de "+valorDeporte(deporte)+"</h1>";
									codigo += "	<div class='w90 h70 spaceAroundXY flexWrap'>";
									codigo += "		<div class='w90 h20 spaceAroundXY flexWrap'>";
									codigo += "			<input id='inputListaTecnicos' type='text' class='w40' placeholder='Busca tu nombre...' autofocus/>";
									codigo += "			<ul id='inputListaTecnicos_list' class='autocompletadores pulsable'></ul>";
									codigo += "			<div id='botonNuevoTecnico' class='w45 h90 centradoXY' onclick=\"nuevoElemento('Equipo')\">";
									codigo += "				<label class='w80'>Si no te encuentras en el listado, puedes Crear tu propia ficha personal desde el Menú Edición</label>";
									codigo += "				<img class='h90 w10' src='img/Menu/boton_salir.png' alt='Nuevo' style='transform: rotate(45deg)'>";
									codigo += "			</div>";
									codigo += "		</div>";
									codigo += "		<div id='cuadroFichaTecnico' class='w30 h70 centradoXY'></div>";
									codigo += "	</div>";
									codigo += "	<button class='w15 h5 botonAtras' onclick=\"pasarPasoCompra(2,1,"+tipo+","+deporte+")\">Volver</button>";
									codigo += "	<button id='botonConfirmarPaso2Tecnico' class='w15 h5 botonAdelante noOperativo' onclick=\"pasarPasoCompra(2,3,"+tipo+","+deporte+")\">Continuar</button>";

									document.getElementById("suscripcionPaso2").innerHTML = codigo;

									// Crear datos para listado de jugadores
									let inputListaTecnicos_list = js.map(tecnico => {
									  return {value: tecnico.ID_tecnico, label: tecnico.Nombre + " (" + textoTecnicos(tecnico.Puesto) + ")"};
									});

									autocomplete(document.querySelector("#inputListaTecnicos"), document.querySelector("#inputListaTecnicos_list"), inputListaTecnicos_list, "inputListaTecnicos");
								},
								timeout: 10000,
								error: function(){ pasarPasoCompra(origen,destino,tipo,deporte); }
							});
							break;
						case 3:
							document.getElementById("suscripcionPaso3").classList.remove("invisible");
							document.getElementById("loaderSuscripcion").classList.add("loader");
							$.ajax({
								url: "php/datosSuscripcionClub.php",
								type: 'POST',
								data: {
									idJugador: sessionStorage.getItem("SuscriptId")
								},
								success: function(res){
									document.getElementById("loaderSuscripcion").classList.remove("loader");
									let js= JSON.parse(res);

									codigo += "	<h1>Proceso de suscripción a <span style='color:var(--color-pro)'>"+nombreSuscripcion(tipo)+"</span> de "+valorDeporte(deporte)+"</h1>";
									codigo += "	<div class='w90 h70 spaceAroundXY flexWrap'>";
									if (parseInt(js[0].Suscripcion) >= 1) {
										codigo += "		<h1 class='w100 centradoXY'>ENHORABUENA Tu club tiene una suscripción <span class='textoPro'>Pro</span></h1>";
										codigo += "		<h2 class='w100'>Esto significa que podrás hacer todo esto:</h2>";
										codigo += "		<ul>";
										codigo += "			<li>· Accede a nuestras exclusivas <span class='textoPro'>Herramientas Pro</span>.</li>";
										codigo += "			<li>· Gestión avanzada de los entrenamientos diarios.</li>";
										codigo += "			<li>· Herramientas profesionales para todos los miembros del staff técnico.</li>";
										codigo += "			<li>· Visualiza estadísticas avanzadas en la previa de los partidos.</li>";
										codigo += "			<li>· Accede a estadísticas avanzadas en directo durante los partidos.</li>";
										codigo += "			<li>· Disfruta de todas las opciones gratuitas (gestión de fichas, introducción de datos...).</li>";
										codigo += "		</ul>";
									}else{
										codigo += "		<h1 class='w100 centradoXY'>Tu club tiene la suscripción básica</h1>";
										codigo += "		<h2 class='w100'>Esto significa que podrás hacer todo esto:</h2>";
										codigo += "		<ul>";
										codigo += "			<li>· Ver y editar la ficha de tu equipo.</li>";
										codigo += "			<li>· Ver y editar la plantilla de tu equipo y gestionar los fichajes.</li>";
										codigo += "			<li>· Introducir datos de tus partidos en directo o en diferido.</li>";
										codigo += "			<li>· Visualizar numerosas estadísticas de tus jugadores y equipo.</li>";
										codigo += "			<li>· Haz un seguimiento de calendarios y competiciones de todos los equipos y secciones del club.</li>";
										codigo += "			<li>· Consulta datos actuales e históricos de todas las categorías FEDERADAS.</li>";
										codigo += "		</ul>";
									}
									codigo += "	</div>";
									codigo += "	<button class='w15 h5 botonAtras' onclick=\"pasarPasoCompra(3,2,"+tipo+","+deporte+")\">Volver</button>";
									codigo += "	<button class='w15 h5 botonAdelante' onclick=\"guardarCompra()\">Finalizar</button>";

									document.getElementById("suscripcionPaso3").innerHTML = codigo;
								}
							});
							break;
						}
					}else if (tipo <= 3 && tipo > 0){
						switch(destino) {
							case 1:
								document.getElementById("suscripcionPaso1").classList.remove("invisible");
								codigo += "			<h1>Proceso de suscripción a <span style='color:var(--color-pro)'>"+nombreSuscripcion(tipo)+"</span> de "+valorDeporte(deporte)+"</h1>";
								codigo += "			<div class='w90 h70 spaceAroundXY flexWrap'>";
								codigo += "				<div class='w40 h90 centradoXY flexWrap overflowY' style='padding:1%'>";
								codigo += "					<p style='margin-bottom:5%'>"+sessionStorage.getItem("textoInfo")+"</p><br>";
								codigo += "					<p style='margin-bottom:5%'>RECUERDA: Tendrás disponibles todas las modalidades de suscripción de forma TOTALMENTE GRATUITA hasta que la aplicación sea completada.</p><br>";
								codigo += "					<p style='background: var(--color-pro);border-radius: 15px;padding: 2%;text-align: center;font-size: 1.4em;margin-bottom:5%;'>Aprovecha para disfrutar de todas las ventajas Pro sin ningún tipo de límites</p>";
								codigo += "				</div>";
								codigo += "				<div class='w40 h90 centradoXY flexWrap cuadroUsuarios Pro"+tipo+"'>";
								codigo += "					<h1 class='w100'>Usuarios</h1>";
								codigo += "					<h1 class='w25 centradoXY' style='background: var(--color-texto);color: var(--color-pro);aspect-ratio: 1 / 1;border-radius: 50%;'>"+sessionStorage.getItem("SuscripUsuarios")+"</h1>";
								codigo += 					sessionStorage.getItem("texto");
								codigo += "				</div>";
								codigo += "			</div>";
								codigo += "			<button class='w20 h10 botonAtras' onclick=\"pasarPasoCompra(1,0)\">Cancelar</button>";
								codigo += "			<button class='w20 h10 botonAdelante' onclick=\"sessionStorage.setItem('SuscripTipo',"+tipo+");pasarPasoCompra(1,2,"+tipo+","+deporte+")\">Continuar</button>";
								document.getElementById("suscripcionPaso1").innerHTML = codigo;
								break;
							case 2:
								document.getElementById("suscripcionPaso2").classList.remove("invisible");
								document.getElementById("loaderSuscripcion").classList.add("loader");
								$.ajax({
									url: "php/listaClubesNacionales.php",
									type: 'POST',
									success: function(res){
										document.getElementById("loaderSuscripcion").classList.remove("loader");
										var js= JSON.parse(res);
										sessionStorage.setItem("listaClubes",res);

										codigo += "		<h1>Proceso de suscripción a <span style='color:var(--color-pro)'>"+nombreSuscripcion(tipo)+"</span> de "+valorDeporte(deporte)+"</h1>";
										codigo += "		<div class='w90 h70 centradoXY flexWrap'>";
										codigo += "			<h2 class='w100'>Selección de club</h2>";
										codigo += "			<div class='w50 h80 centradoXY flexWrap'>";
										codigo += "				<input id='seleccionClubes' type='text' class='w80' placeholder='Buscar nombre del Club...' autofocus/>";
										codigo += "				<ul id='seleccionClubes_list' class='autocompletadores pulsable'></ul>";
										codigo += "				<div id='mensajeErrorClub' class='w80 h50 centradoXY flexWrap invisible'>";
										codigo += "					<p>El club seleccionado ya ha sido suscrito por otro usuario. Si considera que debe ejercer su derecho a suscribirse al mismo, envíenos un email explicando el caso a <strong>serviciotecnico@bigdt.es</strong></p>";
										codigo += "				</div>";
										codigo += "			</div>";
										codigo += "			<div id='mostradorClub' class='w50 h80 centradoXY flexWrap'>";
										codigo += "			</div>";
										codigo += "		</div>";

										codigo += "		<button class='w20 h10 botonAtras' onclick=\"pasarPasoCompra(2,1,"+tipo+","+deporte+")\">Volver</button>";
										codigo += "		<button id='botonSiguiente2' class='w20 h10 botonAdelante noOperativo' onclick=\"sessionStorage.removeItem('listaClubes');pasarPasoCompra(2,3,"+tipo+","+deporte+")\">Continuar</button>";
										document.getElementById("suscripcionPaso2").innerHTML = codigo;

										const atras = sessionStorage.getItem("SuscriptId") ? mostrarClub(sessionStorage.getItem("SuscriptId")-1) : "";
										const atras2 = sessionStorage.getItem("SuscriptId") ? document.getElementById("selectClubes").selectedIndex = sessionStorage.getItem("SuscriptId") : "";

										// Crear datos para listado de jugadores
										let seleccionClubes_list = js[0].map(club => {
										  return {value: club.ID_Club, label: club.Nombre};
										});

										autocomplete(document.querySelector("#seleccionClubes"), document.querySelector("#seleccionClubes_list"), seleccionClubes_list, "seleccionClubes");
									},
									timeout: 10000,
									error: function() { pasarPasoCompra(origen,destino,tipo,deporte); }
								});
								break;
							case 3:
								document.getElementById("suscripcionPaso3").classList.remove("invisible");
								codigo += "				<h1>Proceso de suscripción a <span style='color:var(--color-pro)'>"+nombreSuscripcion(tipo)+"</span> de "+valorDeporte(deporte)+"</h1>";
								codigo += "				<div class='w90 h70 centradoXY flexWrap'>";
								codigo += "					<h2>Selección de usuarios autorizados</h2>";
								codigo += "					<div id='cuadroSuscriptUsuarios' class='w90 h60 centradoXY flexWrap'>";
								var numero = sessionStorage.getItem("SuscripUsuarios");
								for (var i = 1; i <= numero; i++) {
									const valor = "";
									if (sessionStorage.getItem("SuscriptAutorizados") && sessionStorage.getItem("SuscriptAutorizados") !== "0") {
										const array = JSON.parse(sessionStorage.getItem("SuscriptAutorizados"));
										if (array[i] && array[i] !== "") {	valor = " value='"+array[i]+"'";	}
									}
									codigo += "						<input id='usuarioSuscript"+i+"' class='w45 h10 inputClub' type='email' placeholder='Usuario autorizado "+i+"'"+valor+">";
								}
								codigo += "					</div>";
								codigo += "					<p class='w90'>Ahora puedes indicar los <strong>emails</strong> de los usuarios que deseas autorizar en esta suscripción. No es necesario rellenarlos ahora mismo. Recuerda que siempre podrás modificar los usuarios autorizados.</p>";
								codigo += "					<p class='w90'>Aquel usuario que no esté todavía dado de alta en BigDT recibirá un email con las instrucciones para hacerlo, mientras que los usuarios que ya estén de alta quedarán autorizados de forma automática.</p>";
								codigo += "				</div>";
								codigo += "				<button class='w20 h10 botonAtras' onclick=\"pasarPasoCompra(3,2,"+tipo+","+deporte+")\">Volver</button>";
								codigo += "				<button class='w20 h10 botonAdelante' onclick=\"guardarSuscriptUsuarios("+numero+");pasarPasoCompra(3,4,"+tipo+","+deporte+")\">Continuar</button>";
								document.getElementById("suscripcionPaso3").innerHTML = codigo;
								document.getElementById("usuarioSuscript1").value = leerDatosUsuario("Usuario");
								document.getElementById("usuarioSuscript1").readOnly = true;
								break;
							case 4:
								document.getElementById("suscripcionPaso4").classList.remove("invisible");
								document.getElementById("loaderSuscripcion").classList.add("loader");
								$.ajax({
									url: "php/listadosComunidades.php",
									type: 'POST',
									success: function(res){
										document.getElementById("loaderSuscripcion").classList.remove("loader");
										var js= JSON.parse(res);

										codigo += "				<h1>Proceso de suscripción a <span style='color:var(--color-pro)'>"+nombreSuscripcion(tipo)+"</span> de "+valorDeporte(deporte)+"</h1>";
										codigo += "				<div class='w90 h70 centradoXY flexWrap'>";
										codigo += "					<h2>Datos de facturación</h2>";
										codigo += "					<form id='datosFacturacion' class='w90 h80 centradoXY flexWrap'>";
										codigo += "						<label class='w15' for='facturacionCIF'>CIF:</label>";
										codigo += "						<input class='w80' id='facturacionCIF' type='text' maxlength='9' placeholder='A00000000'>";
										codigo += "						<label class='w15' for='facturacionNombre'>Nombre:</label>";
										codigo += "						<input class='w80' id='facturacionNombre' type='text' maxlength='50'>";
										codigo += "						<label class='w15' for='facturacionDireccion'>Dirección:</label>";
										codigo += "						<input class='w80' id='facturacionDireccion' type='text' maxlength='70'>";

										codigo += "						<label class='w15' for='facturacionComunidad'>Localidad:</label>";
										codigo += "						<select name='comunidad' id='facturacionComunidad' onchange=\"mostrarListado('Provincia',this.value,'suscripcion')\" required>";
										codigo += "							<option>Seleccionar...</option>";
										for (var i = 0; i < js[0].length; i++) {
											codigo += "						<option value='"+js[0][i].Comunidad+"'>"+js[0][i].Comunidad+"</option>";
										}
										codigo += "						</select>";
										codigo += "						<select name='provincia' id='facturacionProvincia' onchange=\"mostrarListado('Localidad',this.value,'suscripcion')\" required>";
										codigo += "							<option>Espera...</option>";
										codigo += "						</select>";
										codigo += "						<select class='w30' name='localidad' id='facturacionLocalidad' required>";
										codigo += "							<option>Espera...</option>";
										codigo += "						</select>";
										codigo += "						<label class='w15' for='facturacionCP'>CP:</label>";
										codigo += "						<input class='w80' id='facturacionCP' type='text' maxlength='5'>";
										codigo += "						<label class='w15' for='facturacionEmail'>Email:</label>";
										codigo += "						<input class='w80' id='facturacionEmail' type='email' maxlength='50'>";
										codigo += "					</form>";
										codigo += "				</div>";
										//////////////////// METER LA COMPROBACIÓN DE DATOS
										codigo += "				<button class='w20 h10 botonAtras' onclick=\"pasarPasoCompra(4,3,"+tipo+","+deporte+")\">Volver</button>";
										codigo += "				<button class='w20 h10 botonAdelante' onclick=\"guardarSuscriptFacturacion();pasarPasoCompra(4,5,"+tipo+","+deporte+")\">Siguiente</button>";
										document.getElementById("suscripcionPaso4").innerHTML = codigo;

										if (sessionStorage.getItem("SuscriptFacturacion") !== "0") {
											const arrayNombres = Array("facturacionCIF","facturacionNombre","facturacionDireccion","facturacionComunidad","facturacionProvincia","facturacionLocalidad","facturacionCP","facturacionEmail","facturacionComunidad","facturacionProvincia","facturacionLocalidad");
											var arrayDatos = JSON.parse(sessionStorage.getItem("SuscriptFacturacion"));
											for (var i = 0; i < arrayNombres.length - 3; i++) {
												if (arrayDatos[i] !== "") { document.getElementById(arrayNombres[i]).value = arrayDatos[i]; }
											}
											mostrarListado('Provincia',arrayDatos[3],'suscripcion');
											mostrarListado('Localidad',arrayDatos[4],'suscripcion');
											for (var k = arrayNombres.length - 3; k < arrayNombres.length; k++) {
												if (arrayDatos[k] !== "") {
													//console.log("Antes: ",document.getElementById(arrayNombres[k]).selectedIndex);
													document.getElementById(arrayNombres[k]).selectedIndex = arrayDatos[k];
													//console.log("Despues: ",arrayNombres[k],arrayDatos[k],document.getElementById(arrayNombres[k]).selectedIndex);
													///////////// BUG: No publica el valor del index en el select de pantalla
												}
											}
										}
									},
									timeout: 10000,
									error: function() { pasarPasoCompra(origen,destino,tipo,deporte); }
								});
								break;
							case 5: //METER AQUÍ LA PASARELA DE PAGO
								document.getElementById("suscripcionPaso5").classList.remove("invisible");
								codigo += "				<h1>Proceso de suscripción a <span style='color:var(--color-pro)'>"+nombreSuscripcion(tipo)+"</span> de "+valorDeporte(deporte)+"</h1>";
								codigo += "				<div class='w90 h70 centradoXY flexWrap'>";
								codigo += "					<h2>Pasarela de Compra</h2>";
								codigo += "					<p class='w90'>Al ser una suscripción gratuita, no es necesario realizar este paso.</p>";
								codigo += "					<p class='w90'>Por favor, haz clic en <strong>Continuar</strong></p>";
								codigo += "				</div>";
								codigo += "				<button class='w20 h10 botonAtras' onclick=\"pasarPasoCompra(5,4,"+tipo+","+deporte+")\">Volver</button>";
								codigo += "				<button class='w20 h10 botonAdelante' onclick=\"pasarPasoCompra(5,6,"+tipo+","+deporte+")\">Continuar</button>";
								document.getElementById("suscripcionPaso5").innerHTML = codigo;
								break;
							case 6:
								document.getElementById("suscripcionPaso6").classList.remove("invisible");
								codigo += "				<h1>Proceso de suscripción a <span style='color:var(--color-pro)'>"+nombreSuscripcion(tipo)+"</span> de "+valorDeporte(deporte)+"</h1>";
								codigo += "				<div class='w90 h70 centradoXY flexWrap'>";
								codigo += "					<h2>Finalización del proceso</h2>";
								codigo += "					<p class='w90'>Enhorabuena, ya has rellenado todos los datos necesarios.</p>";
								codigo += "					<p class='w90'>Tras presionar el botón <strong>Finalizar</strong> tendrás que volver a introducir tus credenciales y ya podrás disfrutar de la aplicación mejor diseñada para ayudar a subir el nivel de profesionalización de tu Club a niveles insospechados.</p>";
								codigo += "				</div>";
								codigo += "				<button class='w20 h10 botonAtras' onclick=\"pasarPasoCompra(6,5,"+tipo+","+deporte+")\">Volver</button>";
								codigo += "				<button class='w20 h10 botonAdelante' onclick=\"guardarCompra()\">Finalizar</button>";
								document.getElementById("suscripcionPaso6").innerHTML = codigo;
								break;
						}
					}else if (tipo == 0) {
						switch(destino) {
						case 1:
							document.getElementById("suscripcionPaso1").classList.remove("invisible");

							codigo += "			<h1>Proceso de suscripción a <span style='color:var(--color-pro)'>"+nombreSuscripcion(7)+"</span> de "+valorDeporte(deporte)+"</h1>";
							codigo += "			<div class='w90 h70 spaceAroundXY flexWrap'>";
							codigo += "				<div class='w40 h90 centradoXY flexWrap overflowY' style='padding:1%'>";
							codigo += "					<p style='margin-bottom:5%'>Este tipo de suscripción te proporciona acceso a multitud de datos y herramientas adaptadas a tus <strong class='textoPro'>necesidades no profesionales</strong>.</p><br>";
							codigo += "					<p style='margin-bottom:5%'>Podrás <strong class='color1'>crear y editar tu propio Club</strong>, así como los <strong class='color1'>equipos</strong> y los <strong class='color1'>jugadores</strong> que pertenecen al mismo.</p><br>";
							codigo += "					<p style='margin-bottom:5%'>Tu equipo podrá participar en competiciones contra otros equipos creados por usuarios.</p><br>";
							codigo += "					<p style='margin-bottom:5%'>Lleva a un nuevo nivel los partidos entre amigos, las escuelas deportivas, competiciones entre empresas,...</p><br>";
							codigo += "					<p style='margin-bottom:5%'>IMPORTANTE: Para acceder a las <strong class='textoPro'>funciones Pro</strong> necesitas tener una suscripción. Consulta si puedes acceder a una <strong class='textoPro'>Beca Pro</strong>.</p><br>";
							codigo += "				</div>";
							codigo += "				<div class='w40 h90 centradoXY flexWrap cuadroUsuarios Pro"+tipo+"'>";
							codigo += "					<h1 class='w100'>Usuarios</h1>";
							codigo += "					<h1 class='w25 centradoXY' style='background: var(--color-texto);color: var(--color-pro);aspect-ratio: 1 / 1;border-radius: 50%;'>1</h1>";
							codigo += "					<h1 class='w100'>GRATIS</h1><br>";
							codigo += "				</div>";
							codigo += "			</div>";
							codigo += "			<button class='w20 h10 botonAtras' onclick=\"pasarPasoCompra(1,0)\">Cancelar</button>";
							codigo += "			<button class='w20 h10 botonAdelante' onclick=\"sessionStorage.setItem('SuscripTipo',"+tipo+");pasarPasoCompra(1,2,"+tipo+","+deporte+")\">Continuar</button>";

							document.getElementById("suscripcionPaso1").innerHTML = codigo;
							break;
						case 2:
							document.getElementById("suscripcionPaso2").classList.remove("invisible");

							codigo += "	<h1>Proceso de suscripción a <span style='color:var(--color-pro)'>"+nombreSuscripcion(7)+"</span> de "+valorDeporte(deporte)+"</h1>";
							codigo += "	<div class='w90 h70 spaceAroundXY flexWrap'>";
							codigo += "		<h1 class='w100 centradoXY'>Vas a confirmar la suscripción básica</h1>";
							codigo += "		<h2 class='w100'>Esto significa que tendrás acceso a realizar todo esto:</h2>";
							codigo += "		<ul>";
							codigo += "			<li>· Crear tu propio club NO FEDERADO.</li>";
							codigo += "			<li>· Crear distintas secciones y equipos dentro de tu club.</li>";
							codigo += "			<li>· Crear tu propia ficha y añade a tus amigos.</li>";
							codigo += "			<li>· Utiliza tu equipo para hacer partidos y competiciones contra otros equipos NO FEDERADOS.</li>";
							codigo += "			<li>· Compite con tus amigos por conseguir el trofeo <strong class='color1'>BestDT</strong></li>";
							codigo += "			<li>· Consulta datos actuales e históricos de todas las categorías FEDERADAS.</li>";
							codigo += "		</ul>";
							codigo += "	</div>";
							codigo += "	<button class='w15 h5 botonAtras' onclick=\"pasarPasoCompra(2,1,"+tipo+","+deporte+")\">Volver</button>";
							codigo += "	<button class='w15 h5 botonAdelante' onclick=\"sessionStorage.setItem('SuscriptId', '0'); guardarCompra()\">Finalizar</button>";

							document.getElementById("suscripcionPaso2").innerHTML = codigo;
							break;
						}
					}
				}
			};
				function mostrarDatosClub(id, deporte) {
					let jsListaClubes = JSON.parse(sessionStorage.getItem("listaClubes"));
					id = parseInt(id) - 1;

					if (jsListaClubes[0][id]) {
						let arrayDatos = jsListaClubes[0][id];
						codigo = "";
						codigo += "		<img class='w15 h95 escudoImg' src='img/Clubes/Clubes/"+arrayDatos.Escudo+"' alt='escudo'>";
						codigo += "		<label class='w80'>"+arrayDatos.Nombre+"</label>";
						document.getElementById("cuadroDatosClub").innerHTML = codigo;
						
						document.getElementById("inputListaClubes").value = arrayDatos.Nombre;
						
						document.getElementById("loaderSuscripcion").classList.add("loader");
						$.ajax({
							url: "php/pruebaBecaPro.php",
							type: 'POST',
							data: {
								club: arrayDatos.ID_Club,
								deporte: deporte
							},
							success: function(res){
								document.getElementById("loaderSuscripcion").classList.remove("loader");
								let js = JSON.parse(res);

								// Cuadro Masculino
								codigoM = " 	<div class='w10 centradoXY'>";
								let imgM = js[0][0].Escudo_Masculino == null ? "invisible" : "";
								codigoM += "		<img class='w80 "+imgM+"' src='img/Clubes/"+textoDeportes(deporte)+"/Equipos/"+js[0][0].Escudo_Masculino+"' alt='Img'>";
								codigoM += "	</div>";
								let nombreM = js[0][0].Nombre_Masculino == null ? "Sin datos de Equipo Senior Masculino para esta Temporada" : js[0][0].Nombre_Masculino;
								codigoM += "	<label class='w50'>"+nombreM+"</label>";
								let competicionM = js[0][0].Competicion_Masculino == null ? "" : js[0][0].Competicion_Masculino;
								codigoM += "	<label class='w30'>"+competicionM+"</label>";
								document.getElementById("cuadroResultadoMasculino").innerHTML = codigoM;
								if (js[0][0].Nivel_Masculino !== null) {
									let colorM = js[0][0].Nivel_Masculino > 3 ? "var(--color-acierto)" : "var(--color-error)";
									document.getElementById("cuadroResultadoMasculino").style.borderColor = colorM;
								}else{
									document.getElementById("cuadroResultadoMasculino").style.borderColor = "var(--color-corporativo-rosa)";
								}

								// Cuadro Femenino
								codigoF = " 	<div class='w10 centradoXY'>";
								let imgF = js[0][0].Escudo_Femenino == null ? "invisible" : "";
								codigoF += "		<img class='w80 "+imgF+"' src='img/Clubes/"+textoDeportes(deporte)+"/Equipos/"+js[0][0].Escudo_Femenino+"' alt='Img'>";
								codigoF += "	</div>";
								let nombreF = js[0][0].Nombre_Femenino == null ? "Sin datos de Equipo Senior Femenino para esta Temporada" : js[0][0].Nombre_Femenino;
								codigoF += "	<label class='w50'>"+nombreF+"</label>";
								let competicionF = js[0][0].Competicion_Femenino == null ? "" : js[0][0].Competicion_Femenino;
								codigoF += "	<label class='w30'>"+competicionF+"</label>";
								document.getElementById("cuadroResultadoFemenino").innerHTML = codigoF;
								if (js[0][0].Nivel_Femenino !== null) {
									let colorF = js[0][0].Nivel_Femenino > 3 ? "var(--color-acierto)" : "var(--color-error)";
									document.getElementById("cuadroResultadoFemenino").style.borderColor = colorF;
								}else{
									document.getElementById("cuadroResultadoFemenino").style.borderColor = "var(--color-corporativo-rosa)";
								}

								// Texto Resultado
								if ((js[0][0].Nivel_Masculino == null) && (js[0][0].Nivel_Femenino == null)) {
									resultado = "Vaya, actualmente no disponemos de información suficiente sobre tu Club.<br><br>Por favor, escríbemos a <a class='color1' href='mailto:serviciotecnico@bigdt.es'>serviciotecnico@bigdt.es</a> con el asunto \"Solicitud de Beca Pro\" y trataremos tu solicitud de <span class='textoPro'>Beca Pro</span> de forma personalizada.";
									colorR = "var(--color-texto)";
								}else{
									if ((js[0][0].Nivel_Masculino < 4) || (js[0][0].Nivel_Femenino < 4)) {
										resultado = "Sentimos comunicarte que, para obtener la Beca Pro, no puedes tener a ningún equipo de categoría Senior compitiendo por encima de la 2ª División Nacional.";
										colorR = "var(--color-error)";
									}else {
										resultado = "Enhorabuena, cumples las condiciones para obtener la Beca Pro";
										colorR = "var(--color-acierto)";
										document.getElementById("botonConfirmarPaso2Beca").classList.remove("noOperativo");
										sessionStorage.setItem('SuscriptClub',arrayDatos.ID_Club);
									}
								}
								document.getElementById("mensajeResultadoClub").innerHTML = resultado;
								document.getElementById("mensajeResultadoClub").style.color = colorR;
							},
							timeout: 10000,
							error: function(){ mostrarDatosClub(id, deporte); }
						});
					}
				};
				function mostrarDatosJugador(id) {
					document.getElementById("loaderSuscripcion").classList.add("loader");
					$.ajax({
						url: "php/buscarJugadorSuscripcion.php",
						type: 'POST',
						data: {
							idJugador: id
						},
						success: function(res){
							document.getElementById("loaderSuscripcion").classList.remove("loader");
							let js = JSON.parse(res);

							sessionStorage.setItem("SuscriptId", id);

							document.getElementById("inputListaJugadores").value = js.Datos[0].Nombre+" "+js.Datos[0].Apellido;

							let colorBorde = js.Whois == "0" ? "5px solid var(--color-corporativo-rosa)": "5px solid var(--color-error)";
							document.getElementById("cuadroFichaJugador").style.border = colorBorde;
							document.getElementById("cuadroFichaJugador").style.borderRadius = "20px";
							document.getElementById("cuadroFichaJugador").style.width = "auto";
							document.getElementById("cuadroFichaJugador").innerHTML = marcoJugador("G",id,js.Datos[0].Nombre,js.Datos[0].Apellido,js.Datos[0].Posicion,js.Datos[0].Dorsal,js.Datos[0].ID_Equipo,js.Datos[0].Escudo,js.Datos[0].Foto,js.Datos[0].Tipo);
							if (js.Whois == "0") {
								document.getElementById("botonConfirmarPaso2Jugador").classList.remove("noOperativo");
							}
						},
						timeout: 10000,
						error: function(){ mostrarDatosJugador(id); }
					});
				};
				function mostrarDatosTecnico(id) {
					document.getElementById("loaderSuscripcion").classList.add("loader");
					$.ajax({
						url: "php/buscarTecnicoSuscripcion.php",
						type: 'POST',
						data: {
							idTecnico: id
						},
						success: function(res){
							document.getElementById("loaderSuscripcion").classList.remove("loader");
							let js = JSON.parse(res);

							sessionStorage.setItem("SuscriptId", id);

							document.getElementById("inputListaTecnicos").value = js.Datos[0].Nombre;

							let colorBorde = js.Whois == "0" ? "5px solid var(--color-corporativo-rosa)": "5px solid var(--color-error)";
							document.getElementById("cuadroFichaTecnico").style.border = colorBorde;
							document.getElementById("cuadroFichaTecnico").style.borderRadius = "20px";
							document.getElementById("cuadroFichaTecnico").style.width = "auto";
							document.getElementById("cuadroFichaTecnico").innerHTML = marcoTecnico("G",id,js.Datos[0].Nombre,js.Datos[0].Puesto,js.Datos[0].ID_Equipo,js.Datos[0].Escudo,js.Datos[0].imagen,"1");
							if (js.Whois == "0") {
								document.getElementById("botonConfirmarPaso2Tecnico").classList.remove("noOperativo");
							}
						},
						timeout: 10000,
						error: function(){ mostrarDatosTecnico(id); }
					});
				};

				function mostrarClub(orden) {
					var js = JSON.parse(sessionStorage.getItem("listaClubes"));
					var arrayDatos = js[0][orden - 1];
					// Mostrar contenido
					codigo = "";
					codigo += "				<img class='h60 escudoImg' src='img/Clubes/Clubes/"+arrayDatos.Escudo+"' alt='escudo'>";
					codigo += "				<div class='h15 w100 centradoInlineXY flexWrap'>";
					codigo += "					<label>"+arrayDatos.Nombre+"</label>";
					codigo += "					<img class='h40 w100' src='img/Clubes/Clubes/Localidades/"+arrayDatos.Comunidad+".png' alt='comunidad'>";
					document.getElementById("mostradorClub").innerHTML = codigo;

					// Cambiar estilo
					var color = arrayDatos.Suscripcion == 0 ? "var(--color-acierto)" : "var(--color-pro)";
					document.getElementById("mostradorClub").style.borderColor = color;

					// Botón Siguiente
					var boton = arrayDatos.Suscripcion == 0 ? document.getElementById("botonSiguiente2").classList.remove("noOperativo") : document.getElementById("botonSiguiente2").classList.add("noOperativo");

					// Mensaje de error
					var error = arrayDatos.Suscripcion == 0 ? document.getElementById("botonSiguiente2").classList.remove("noOperativo") : document.getElementById("botonSiguiente2").classList.add("noOperativo");
					var error = arrayDatos.Suscripcion == 0 ? document.getElementById("mensajeErrorClub").classList.add("invisible") : document.document.getElementById("mensajeErrorClub").classList.remove("invisible");

					sessionStorage.setItem('SuscriptId',arrayDatos.ID_Club);
				};
				function guardarSuscriptUsuarios(numero) {
					let array = [],
						suma = 0;
					for (var i = 2; i < numero; i++) {
						const label = "usuarioSuscript"+i;
						if (document.getElementById(label) && document.getElementById(label).value !== "") {
							array.push(document.getElementById(label).value);
							suma ++;
						}
					}
					if (suma > 0) {
						sessionStorage.setItem("SuscriptAutorizados",array);
					}
				};
				function guardarSuscriptFacturacion() {
					const array = Array('facturacionCIF','facturacionNombre','facturacionDireccion','facturacionComunidad','facturacionProvincia','facturacionLocalidad','facturacionCP','facturacionEmail');

					var datos = [];
					for (var i = 0; i < array.length; i++) {
						dato = document.getElementById(array[i]).value+"YYY";
						datos.push(dato);
					}
					for (var i = 3; i < 6; i++) {
						dato = document.getElementById(array[i]).selectedIndex+"YYY";
						datos.push(dato);
					}
					sessionStorage.setItem("SuscriptFacturacion", JSON.stringify(datos));
				};
				function guardarCompra() {
					$.ajax({
						url: "php/guardarSuscripcion.php",
						type: 'POST',
						data: {
							deporte: sessionStorage.getItem("SuscriptDeporte"),
							tipo: sessionStorage.getItem("SuscripTipo"),
							id: sessionStorage.getItem("SuscriptId"),
							facturacion: JSON.stringify(sessionStorage.getItem("SuscriptFacturacion")),
							autorizados: JSON.stringify(sessionStorage.getItem("SuscriptAutorizados"))
						}
					}).done( function() {
							// Eliminar sessionStorage
							sessionStorage.removeItem("listaJugadores");
							sessionStorage.removeItem("SuscriptAutorizados");
							sessionStorage.removeItem("SuscriptDeporte");
							sessionStorage.removeItem("SuscriptFacturacion");
							sessionStorage.removeItem("SuscriptId");
							sessionStorage.removeItem("SuscripTipo");

							// Reiniciar para recargar nuevos datos
							cerrarSesion();
							$("#cajaAjustesUsuario").removeClass("invisible");
							$("#cajaSuscripcion").addClass("invisible");
					}).fail( function() {
							alert("Error al guardar los datos de suscripción. Por favor, vuelve a intentarlo");
					});
				};

		function whois(opcion) {
			switch(opcion) {
				case "club":
					//    EN CLUB NO DEBE PODER CAMBIARSE. AL SUSCRIBIRSE SE DEFINE WHOIS

					/*document.getElementById("loaderAjustes").classList.add("loader");
					$.ajax({
						url: "php/listaClubesPosibles.php",
						type: 'POST',
						data: {
							deporte: sessionStorage.getItem("Deporte")
						},
						success: function(res){
							document.getElementById("loaderAjustes").classList.remove("loader");
							var js= JSON.parse(res);
							sessionStorage.setItem("listaClubes",res);

							codigo = "";
							codigo += " <input id='inputListaClubesPosibles' class='w80' type='text' list='listaClubesPosibles' placeholder='Buscar nombre del Club...' onblur=\"mostrarNombreClubWhois(this.value)\" autofocus>";
							codigo += "		<datalist id='listaClubesPosibles'>";
							for (var i = 0; i < js[0].length; i++) {
								codigo += " 	<option value='"+i+"'>"+js[0][i].Nombre+"</option>";
							}
							codigo += "		</datalist>";
							document.getElementById("botonWhoisClub").innerHTML = "<div class='h100 w100 centradoXY acierto' onclick=\"seleccionarWhois('"+opcion+"')\"><img class='h80' src='img/Menu/guardar.png' alt='Guardar'></div>";
							
							document.getElementById("botonCancelarWhoisClub").classList.remove("invisible");
							document.getElementById("botonVerFichaClub").classList.add("invisible");
							document.getElementById("cuadroWhois").innerHTML = codigo;
						}
					});*/
					break;
			}
		};
			/*function mostrarNombreClubWhois(valor) {
				let jsListaClubes = JSON.parse(sessionStorage.getItem("listaClubes"));
				document.getElementById("inputListaClubesPosibles").value = jsListaClubes[0][valor]['Nombre'];
				sessionStorage.setItem("valorInputWhois",valor);
			};*/
			/*function seleccionarWhois(opcion) {
				let jsListaClubes = JSON.parse(sessionStorage.getItem("listaClubes"));
				let seleccionado = parseInt(sessionStorage.getItem("valorInputWhois"));

				let texto = "¿Confirmas que eres este Club?\n\n'"+jsListaClubes[0][seleccionado]['Nombre']+"'\n\nIMPORTANTE: Es posible que no puedas volver a cambiar esta opción";
				if (confirm(texto) == true) {
					document.getElementById("loaderAjustes").classList.add("loader");
					$.ajax({
						url: "php/guardarWhoisClub.php",
						type: 'POST',
						data: {
							club: jsListaClubes[0][seleccionado]['ID_Club'],
						},
						success: function(){
							document.getElementById("loaderAjustes").classList.remove("loader");
							// Publicar el escudo y el nombre cambiando cuadroWhois
							let codigo = "";
							codigo += "				<img class='h90' src='img/Clubes/Clubes/"+jsListaClubes[0][seleccionado]['Escudo']+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
							codigo += 				jsListaClubes[0][seleccionado]['Nombre'];
							document.getElementById("cuadroWhois").innerHTML = codigo;
							
							// Cambiar botones
							document.getElementById("botonWhoisClub").innerHTML = "<div class='w100 h100 centradoXY' onclick=\"whois('club')\">Quién Soy</div>";
							document.getElementById("botonCancelarWhoisClub").classList.add("invisible");

							codigoVerFicha = "<div onclick=\"ventanaDatos('club',"+jsListaClubes[0][seleccionado]['ID_Club']+")\">Ficha Club</div>";
							document.getElementById("botonVerFichaClub").innerHTML = codigoVerFicha;
							document.getElementById("botonVerFichaClub").classList.remove("noOperativo");
							document.getElementById("botonVerFichaClub").classList.remove("invisible");
						},
						setTimeout: 10000,
						error: function() { seleccionarWhois(opcion) }
					});
				}
			};*/

	function mostrarPaginaAyuda() {
		/*

	Este código de abajo es para mostrar el vídeo tutorial. Primero (durante 5 segundos, lo que pone en tiempoEspera) comprueba que puede mostrar el vídeo de ayuda que está en el servidor. Si, tras ese tiempo, encuentra algún problema, entonces muestra el vídeo de respaldo que hay el Youtube



	 	<h1>Mis vídeos</h1>

		  <h2>Vídeo en el servidor</h2>
		  <video id="video-servidor" controls></video>

		  <h2>Vídeo en Youtube</h2>
		  <div id="video-youtube"></div>

		  <script>
		    // Obtener el elemento de vídeo del servidor
		    var videoServidor = document.getElementById('video-servidor');
		    // Establecer la ruta del vídeo del servidor
		    videoServidor.src = 'ruta_del_video.mp4';
		    // Establecer el tiempo de espera para el vídeo del servidor (en milisegundos)
		    var tiempoEspera = 5000;

		    // Comprobar si el vídeo del servidor está disponible
		    var comprobarVideoServidor = setInterval(function() {
		      if (videoServidor.readyState === 4) {
		        // El vídeo del servidor está disponible, mostrarlo
		        videoServidor.style.display = 'block';
		        clearInterval(comprobarVideoServidor);
		      } else {
		        // El vídeo del servidor aún no está disponible, comprobar si ha pasado el tiempo de espera
		        if (tiempoEspera <= 0) {
		          // El tiempo de espera ha pasado, mostrar el vídeo de Youtube en su lugar
		          var videoYoutube = document.getElementById('video-youtube');
		          var idVideoYoutube = 'ID_DEL_VIDEO';
		          var iframe = document.createElement('iframe');
		          iframe.src = 'https://www.youtube.com/embed/' + idVideoYoutube;
		          iframe.width = '560';
		          iframe.height = '315';
		          iframe.frameborder = '0';
		          iframe.allowfullscreen = true;
		          videoYoutube.appendChild(iframe);
		          clearInterval(comprobarVideoServidor);
		        } else {
		          // El tiempo de espera no ha pasado, reducir el tiempo de espera en 100 milisegundos
		          tiempoEspera -= 100;
		        }
		      }
		    }, 100);
		  </script>*/
	};

	function abrirMenuUsuario(opcion) {
		clearTimeout(funcionRedundante);
		marcarUso(sessionStorage.getItem('Deporte'),'2','0');
		mostrarAjustesUsuario(opcion);
		$("#cajaMenuUsuario").removeClass("invisible");
		$("#cajaAjustesUsuario").addClass("apertura");
	};

	function cerrarMenuUsuario() {
		idiomaActual("menu");
		$("#cajaMenuUsuario").addClass("invisible");
		$("#cajaSuscripcion").addClass("invisible");
		$("#cajaAjustesUsuario").removeClass("invisible");
		comprobarEstadoUsuario();
	};